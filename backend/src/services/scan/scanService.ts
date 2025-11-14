import fs from 'fs/promises';
import path from 'path';
import trash from 'trash';
import { AnalyzeInput } from './scanValidation';
import { ScanResult, CleanResult, IdentifiedFile } from './scanTypes';
import { logger } from '@/utils/logger';

/**
 * @summary
 * Analyzes a directory for temporary files based on specified criteria.
 * @param options The analysis options.
 * @returns A promise that resolves to the scan result.
 */
export async function analyzeDirectory(options: AnalyzeInput): Promise<ScanResult> {
  const result: ScanResult = {
    totalFilesScanned: 0,
    totalSizeScanned: 0,
    identifiedFiles: [],
    potentialSpaceToSave: 0,
    errors: [],
  };

  const minAgeDate = new Date();
  minAgeDate.setDate(minAgeDate.getDate() - options.criteria.minAgeDays);

  async function scan(directory: string): Promise<void> {
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory() && options.includeSubdirectories) {
          await scan(fullPath);
        } else if (entry.isFile()) {
          try {
            const stats = await fs.stat(fullPath);
            result.totalFilesScanned++;
            result.totalSizeScanned += stats.size;

            const file: IdentifiedFile = {
              path: fullPath,
              name: entry.name,
              size: stats.size,
              modifiedAt: stats.mtime,
              reason: '',
            };

            let identified = false;

            // Check criteria
            if (stats.size >= options.criteria.minSizeBytes && stats.mtime <= minAgeDate) {
              // Check extensions
              if (options.criteria.extensions?.some((ext) => entry.name.endsWith(ext))) {
                identified = true;
                file.reason = 'Matched extension';
              }

              // Check patterns (simple wildcard matching)
              if (!identified && options.criteria.patterns) {
                for (const pattern of options.criteria.patterns) {
                  const regex = new RegExp(`^${pattern.replace(/\*/g, '.*')}$`);
                  if (regex.test(entry.name)) {
                    identified = true;
                    file.reason = `Matched pattern: ${pattern}`;
                    break;
                  }
                }
              }
            }

            if (identified) {
              result.identifiedFiles.push(file);
              result.potentialSpaceToSave += stats.size;
            }
          } catch (statError: any) {
            logger.warn(`Could not stat file: ${fullPath}`, statError.message);
            result.errors.push({ path: fullPath, message: 'Could not read file stats.' });
          }
        }
      }
    } catch (readError: any) {
      logger.error(`Could not read directory: ${directory}`, readError.message);
      result.errors.push({ path: directory, message: 'Could not read directory.' });
    }
  }

  await scan(options.directoryPath);
  return result;
}

/**
 * @summary
 * Cleans files by either moving them to trash or deleting them permanently.
 * @param files An array of full file paths to clean.
 * @param mode The cleaning mode: 'trash' or 'permanent'.
 * @returns A promise that resolves to the clean result.
 */
export async function cleanFiles(
  files: string[],
  mode: 'trash' | 'permanent'
): Promise<CleanResult> {
  const result: CleanResult = {
    filesRemoved: [],
    filesFailed: [],
    spaceFreed: 0,
    totalFilesRemoved: 0,
  };

  for (const file of files) {
    try {
      const stats = await fs.stat(file);
      if (mode === 'trash') {
        await trash(file);
      } else {
        await fs.rm(file);
      }
      result.filesRemoved.push(file);
      result.spaceFreed += stats.size;
      result.totalFilesRemoved++;
    } catch (error: any) {
      logger.error(`Failed to clean file: ${file}`, error.message);
      result.filesFailed.push({ path: file, message: error.message || 'Unknown error' });
    }
  }

  return result;
}

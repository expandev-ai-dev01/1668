import { executeProcedure } from '@/utils/database';
import { CreateScanHistoryDto, ScanHistoryEntry } from './historyTypes';

/**
 * @summary
 * Creates a new scan history entry in the database.
 * @param historyData The data for the new history entry.
 * @returns The created history entry.
 */
export async function createHistoryEntry(
  historyData: CreateScanHistoryDto
): Promise<ScanHistoryEntry> {
  const params = {
    directoryAnalyzed: historyData.directoryAnalyzed,
    totalFilesAnalyzed: historyData.totalFilesAnalyzed,
    totalFilesRemoved: historyData.totalFilesRemoved,
    totalSpaceFreed: historyData.totalSpaceFreed,
    criteriaUsed: JSON.stringify(historyData.criteriaUsed),
  };
  const result = await executeProcedure<ScanHistoryEntry>('functional.spScanHistoryCreate', params);
  return result[0];
}

/**
 * @summary
 * Retrieves a list of all scan history entries.
 * @returns A list of scan history entries.
 */
export async function listHistory(): Promise<ScanHistoryEntry[]> {
  const result = await executeProcedure<ScanHistoryEntry>('functional.spScanHistoryList', {});
  return result;
}

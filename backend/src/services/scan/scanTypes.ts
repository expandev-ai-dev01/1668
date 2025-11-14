export interface IdentifiedFile {
  path: string;
  name: string;
  size: number;
  modifiedAt: Date;
  reason: string;
}

export interface ScanResult {
  totalFilesScanned: number;
  totalSizeScanned: number;
  identifiedFiles: IdentifiedFile[];
  potentialSpaceToSave: number;
  errors: { path: string; message: string }[];
}

export interface CleanResult {
  filesRemoved: string[];
  filesFailed: { path: string; message: string }[];
  spaceFreed: number;
  totalFilesRemoved: number;
}

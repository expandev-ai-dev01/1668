export interface ScanHistoryEntry {
  id: number;
  operationDate: Date;
  directoryAnalyzed: string;
  totalFilesAnalyzed: number;
  totalFilesRemoved: number;
  totalSpaceFreed: number;
  criteriaUsed: string; // JSON string
}

export interface CreateScanHistoryDto {
  directoryAnalyzed: string;
  totalFilesAnalyzed: number;
  totalFilesRemoved: number;
  totalSpaceFreed: number;
  criteriaUsed: object;
}

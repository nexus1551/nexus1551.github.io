export type FileExtension = 'txt' | 'docx';

export type DocumentCategory = 
  | 'Legal & Contracts'
  | 'Technical & Code'
  | 'Project Management'
  | 'Reports & Analytics'
  | 'Creative & Notes'
  | 'HR & Onboarding'
  | 'Marketing & Content';

export type DocumentStatus = 'Draft' | 'In Review' | 'Approved' | 'Archived' | 'Final';

export interface DocumentComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  lineNumber?: number;
}

export interface DocumentVersion {
  id: string;
  versionNumber: number;
  updatedAt: string;
  updatedBy: string;
  summary: string;
  content: string;
}

export interface DocItem {
  id: string;
  title: string;
  filename: string;
  extension: FileExtension;
  content: string;
  folderId: string;
  category: DocumentCategory;
  tags: string[];
  status: DocumentStatus;
  author: string;
  sizeBytes: number;
  wordCount: number;
  characterCount: number;
  lineCount: number;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  isArchived: boolean;
  comments: DocumentComment[];
  versions: DocumentVersion[];
  headings?: string[];
  docxMetadata?: {
    fontFamily?: string;
    hasTables?: boolean;
    hasImages?: boolean;
    pageCountEstimate?: number;
  };
}

export interface Folder {
  id: string;
  name: string;
  iconName?: string;
  color?: string;
  parentId?: string | null;
}

export type ViewMode = 'explorer' | 'analytics' | 'compare' | 'batch' | 'trash';
export type LayoutMode = 'grid' | 'table' | 'cards';
export type SortOption = 'updatedAt' | 'createdAt' | 'title' | 'size' | 'wordCount';
export type SortOrder = 'asc' | 'desc';

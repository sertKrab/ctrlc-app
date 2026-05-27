export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export type StatusType = 'active' | 'inactive' | 'pending' | 'suspended' | 'deleted';

export type SortOrder = 'asc' | 'desc';

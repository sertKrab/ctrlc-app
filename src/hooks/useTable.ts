import { useState, useCallback } from 'react';
import type { SortOrder } from '@/types/common';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@/constants/pagination';

export interface TableSort {
  field: string;
  order: SortOrder;
}

export interface UseTableState {
  page: number;
  size: number;
  sort: TableSort | null;
  filters: Record<string, unknown>;
}

export interface UseTableHandlers {
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  setSort: (sort: TableSort | null) => void;
  setFilters: (filters: Record<string, unknown>) => void;
  reset: () => void;
}

export type UseTableReturn = UseTableState & UseTableHandlers;

export function useTable(initialSize = DEFAULT_PAGE_SIZE): UseTableReturn {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState<TableSort | null>(null);
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const reset = useCallback(() => {
    setPage(DEFAULT_PAGE);
    setSize(initialSize);
    setSort(null);
    setFilters({});
  }, [initialSize]);

  return { page, size, sort, filters, setPage, setSize, setSort, setFilters, reset };
}

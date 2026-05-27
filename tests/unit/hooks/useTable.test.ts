import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTable } from '../../../src/hooks/useTable';

describe('useTable', () => {
  it('has correct initial state', () => {
    const { result } = renderHook(() => useTable());
    expect(result.current.page).toBe(1);
    expect(result.current.size).toBe(20);
    expect(result.current.sort).toBeNull();
    expect(result.current.filters).toEqual({});
  });

  it('uses custom initial size', () => {
    const { result } = renderHook(() => useTable(10));
    expect(result.current.size).toBe(10);
  });

  it('setPage updates page', () => {
    const { result } = renderHook(() => useTable());
    act(() => { result.current.setPage(2); });
    expect(result.current.page).toBe(2);
  });

  it('setSize updates size', () => {
    const { result } = renderHook(() => useTable());
    act(() => { result.current.setSize(50); });
    expect(result.current.size).toBe(50);
  });

  it('setSort sets sort field and order', () => {
    const { result } = renderHook(() => useTable());
    act(() => { result.current.setSort({ field: 'name', order: 'asc' }); });
    expect(result.current.sort).toEqual({ field: 'name', order: 'asc' });
  });

  it('setSort can toggle order by calling twice', () => {
    const { result } = renderHook(() => useTable());
    act(() => { result.current.setSort({ field: 'name', order: 'asc' }); });
    act(() => { result.current.setSort({ field: 'name', order: 'desc' }); });
    expect(result.current.sort?.order).toBe('desc');
  });

  it('setSort with null clears sort', () => {
    const { result } = renderHook(() => useTable());
    act(() => { result.current.setSort({ field: 'name', order: 'asc' }); });
    act(() => { result.current.setSort(null); });
    expect(result.current.sort).toBeNull();
  });

  it('setFilters updates filters', () => {
    const { result } = renderHook(() => useTable());
    act(() => { result.current.setFilters({ status: 'active' }); });
    expect(result.current.filters).toEqual({ status: 'active' });
  });

  it('reset returns to initial state', () => {
    const { result } = renderHook(() => useTable());
    act(() => {
      result.current.setPage(5);
      result.current.setSize(50);
      result.current.setSort({ field: 'id', order: 'desc' });
      result.current.setFilters({ status: 'active' });
    });
    act(() => { result.current.reset(); });
    expect(result.current.page).toBe(1);
    expect(result.current.size).toBe(20);
    expect(result.current.sort).toBeNull();
    expect(result.current.filters).toEqual({});
  });

  it('reset restores custom initial size', () => {
    const { result } = renderHook(() => useTable(10));
    act(() => { result.current.setSize(100); });
    act(() => { result.current.reset(); });
    expect(result.current.size).toBe(10);
  });
});

import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency, formatPhone } from '../../../src/utils/format';

describe('formatDate', () => {
  it('converts CE year to Buddhist Era (2025 → 2568)', () => {
    const result = formatDate(new Date('2025-03-25'));
    expect(result).toContain('2568');
  });

  it('formats as DD/MM/YYYY พ.ศ.', () => {
    expect(formatDate(new Date('2025-03-25'))).toBe('25/03/2568');
  });

  it('accepts ISO string', () => {
    expect(formatDate('2025-01-01')).toBe('01/01/2568');
  });

  it('returns "-" for null', () => {
    expect(formatDate(null)).toBe('-');
  });

  it('returns "-" for undefined', () => {
    expect(formatDate(undefined)).toBe('-');
  });

  it('returns "-" for invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('-');
  });

  it('includes time when includeTime=true', () => {
    const d = new Date('2025-03-25T14:22:00');
    const result = formatDate(d, { includeTime: true });
    expect(result).toMatch(/\d{2}:\d{2}$/);
    expect(result).toContain('2568');
  });

  it('uses custom separator', () => {
    expect(formatDate(new Date('2025-03-25'), { separator: '-' })).toBe('25-03-2568');
  });
});

describe('formatCurrency', () => {
  it('formats positive amount with ฿ symbol', () => {
    const result = formatCurrency(1234567.89);
    expect(result).toMatch(/^฿/);
    expect(result).toContain('1,234,567');
    expect(result).toContain('.89');
  });

  it('formats 0 → "฿0.00"', () => {
    const result = formatCurrency(0);
    expect(result).toMatch(/^฿/);
    expect(result).toContain('0.00');
  });

  it('formats negative amount', () => {
    const result = formatCurrency(-500);
    expect(result).toMatch(/^฿/);
    expect(result).toContain('500');
  });

  it('returns "-" for null', () => {
    expect(formatCurrency(null)).toBe('-');
  });

  it('returns "-" for undefined', () => {
    expect(formatCurrency(undefined)).toBe('-');
  });

  it('omits symbol when showSymbol=false', () => {
    const result = formatCurrency(1000, { showSymbol: false });
    expect(result).not.toMatch(/^฿/);
  });

  it('respects decimals option', () => {
    const result = formatCurrency(1000, { decimals: 0 });
    expect(result).not.toContain('.');
  });
});

describe('formatPhone', () => {
  it('formats 10-digit number as NNN-NNN-NNNN', () => {
    expect(formatPhone('0812345678')).toBe('081-234-5678');
  });

  it('formats 9-digit number as NN-NNN-NNNN', () => {
    expect(formatPhone('021234567')).toBe('02-123-4567');
  });

  it('handles numbers with dashes already (strips and reformats)', () => {
    expect(formatPhone('081-234-5678')).toBe('081-234-5678');
  });

  it('returns original string for invalid/short input', () => {
    expect(formatPhone('12345')).toBe('12345');
  });

  it('returns "-" for null', () => {
    expect(formatPhone(null)).toBe('-');
  });

  it('returns "-" for undefined', () => {
    expect(formatPhone(undefined)).toBe('-');
  });

  it('returns "-" for empty string', () => {
    expect(formatPhone('')).toBe('-');
  });
});

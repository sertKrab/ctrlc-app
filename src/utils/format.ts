const BUDDHIST_ERA_OFFSET = 543;

export function formatDate(
  date: Date | string | null | undefined,
  options?: { includeTime?: boolean; separator?: string },
): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '-';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear() + BUDDHIST_ERA_OFFSET;
  const sep = options?.separator ?? '/';
  const datePart = `${day}${sep}${month}${sep}${year}`;

  if (options?.includeTime) {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${datePart} ${hours}:${minutes}`;
  }

  return datePart;
}

export function formatCurrency(
  amount: number | null | undefined,
  options?: { showSymbol?: boolean; decimals?: number },
): string {
  if (amount == null) return '-';
  const decimals = options?.decimals ?? 2;
  const formatted = new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  const symbol = options?.showSymbol === false ? '' : '฿';
  return `${symbol}${formatted}`;
}

export function formatNumber(
  value: number | null | undefined,
  decimals = 0,
): string {
  if (value == null) return '-';
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '-';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 9) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }
  return phone;
}

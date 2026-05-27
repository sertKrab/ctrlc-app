export function validateRequired(value: string | null | undefined): string | null {
  if (!value || value.trim().length === 0) {
    return 'กรุณากรอกข้อมูล';
  }
  return null;
}

export function validateEmail(value: string | null | undefined): string | null {
  if (!value || value.trim().length === 0) return 'กรุณากรอกอีเมล';
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(value.trim())) return 'รูปแบบอีเมลไม่ถูกต้อง';
  return null;
}

export function validatePhone(value: string | null | undefined): string | null {
  if (!value || value.trim().length === 0) return 'กรุณากรอกเบอร์โทรศัพท์';
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10 && digits.length !== 9) {
    return 'เบอร์โทรศัพท์ต้องมี 9-10 หลัก';
  }
  if (!/^0/.test(digits)) {
    return 'เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0';
  }
  return null;
}

export function validateThaiID(value: string | null | undefined): string | null {
  if (!value || value.trim().length === 0) return 'กรุณากรอกเลขบัตรประชาชน';
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 13) return 'เลขบัตรประชาชนต้องมี 13 หลัก';

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * (13 - i);
  }
  const remainder = (11 - (sum % 11)) % 10;
  if (remainder !== parseInt(digits[12])) {
    return 'เลขบัตรประชาชนไม่ถูกต้อง';
  }
  return null;
}

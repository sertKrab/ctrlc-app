import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateThaiID,
  validatePhone,
  validateRequired,
} from '../../../src/utils/validation';

describe('validateEmail', () => {
  it('returns null for valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });

  it('returns null for email with subdomain', () => {
    expect(validateEmail('admin@mail.company.co.th')).toBeNull();
  });

  it('returns error string for missing @', () => {
    expect(validateEmail('notanemail')).not.toBeNull();
  });

  it('returns error string for missing domain', () => {
    expect(validateEmail('user@')).not.toBeNull();
  });

  it('returns error string for empty string', () => {
    expect(validateEmail('')).not.toBeNull();
  });

  it('returns error string for null', () => {
    expect(validateEmail(null)).not.toBeNull();
  });

  it('returns error string for undefined', () => {
    expect(validateEmail(undefined)).not.toBeNull();
  });
});

describe('validateThaiID', () => {
  it('returns null for a valid 13-digit ID (checksum passes)', () => {
    expect(validateThaiID('1234567890121')).toBeNull();
  });

  it('returns error for 12-digit ID', () => {
    expect(validateThaiID('123456789012')).not.toBeNull();
  });

  it('returns error for ID with wrong checksum', () => {
    expect(validateThaiID('1234567890120')).not.toBeNull();
  });

  it('returns error for empty string', () => {
    expect(validateThaiID('')).not.toBeNull();
  });

  it('strips non-digits before validating (valid ID with dashes passes)', () => {
    expect(validateThaiID('1-2345-67890-12-1')).toBeNull();
  });

  it('returns error for a valid-format but wrong-checksum dashed input', () => {
    expect(validateThaiID('1-2345-67890-12-0')).not.toBeNull();
  });

  it('returns error for null', () => {
    expect(validateThaiID(null)).not.toBeNull();
  });
});

describe('validatePhone', () => {
  it('returns null for 10-digit mobile starting with 08', () => {
    expect(validatePhone('0812345678')).toBeNull();
  });

  it('returns null for 9-digit landline starting with 02', () => {
    expect(validatePhone('021234567')).toBeNull();
  });

  it('returns null for 10-digit number starting with 06', () => {
    expect(validatePhone('0612345678')).toBeNull();
  });

  it('returns error for number not starting with 0', () => {
    expect(validatePhone('1234567890')).not.toBeNull();
  });

  it('returns error for too-short number', () => {
    expect(validatePhone('12345')).not.toBeNull();
  });

  it('returns error for empty string', () => {
    expect(validatePhone('')).not.toBeNull();
  });

  it('returns error for null', () => {
    expect(validatePhone(null)).not.toBeNull();
  });
});

describe('validateRequired', () => {
  it('returns null for non-empty string', () => {
    expect(validateRequired('hello')).toBeNull();
  });

  it('returns null for string with content', () => {
    expect(validateRequired('x')).toBeNull();
  });

  it('returns error for empty string', () => {
    expect(validateRequired('')).not.toBeNull();
  });

  it('returns error for whitespace-only string', () => {
    expect(validateRequired('   ')).not.toBeNull();
  });

  it('returns error for null', () => {
    expect(validateRequired(null)).not.toBeNull();
  });

  it('returns error for undefined', () => {
    expect(validateRequired(undefined)).not.toBeNull();
  });
});

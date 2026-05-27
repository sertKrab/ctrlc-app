export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export const STATUS_LABEL: Record<StatusEnum, string> = {
  [StatusEnum.ACTIVE]: 'ใช้งาน',
  [StatusEnum.INACTIVE]: 'ไม่ใช้งาน',
  [StatusEnum.PENDING]: 'รอดำเนินการ',
  [StatusEnum.SUSPENDED]: 'ระงับ',
  [StatusEnum.DELETED]: 'ลบแล้ว',
};

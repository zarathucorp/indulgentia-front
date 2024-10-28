import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { UUID } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskUUID(uuid: string | UUID | undefined) {
  if (!uuid) return '';
  return uuid.slice(0, 8) + '-****-****-****-************'; // 앞 8자리, 뒤 4자리만 남기고 중간을 ****로 마스킹
}
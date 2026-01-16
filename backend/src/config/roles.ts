export const ROLES = ["admin", "coach", "user"] as const;
export type Role = (typeof ROLES)[number];








export enum UserTypeVariant {
  admin = 'admin',
  moderator = 'moderator',
  expert = 'expert',
  user = 'user',
}

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  type: UserTypeVariant;
  admitted: boolean;
};

export type PaginationType<T> = {
  data: T[];
  total: number;
  page: number;
}

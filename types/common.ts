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

export type ColorInfoType = {
  standard: string;
  white: string;
  mosaic: string;
  beige: string;
  violet: string;
  sapphire: string;
  angora: string;
  ebony: string;
  velvet: string;
  pearl: string;
  california: string;
  rex: string;
  lova: string;
  german: string;
  blue: string;
  fur: string;
};

export type PaginationType<T> = {
  data: T[];
  total: number;
  page: number;
};

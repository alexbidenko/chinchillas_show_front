export enum UserTypeVariant {
  admin = 'admin',
  moderator = 'moderator',
  expert = 'expert',
  user = 'user',
}

export type UserType = {
  id: number;
  login: string;
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

export type ChinchillaStatusType = {
  id: number;
  name: 'growing' | 'breeding' | 'sale' | 'sold' | 'reserved' | 'dead';
}

export type PhotoType = {
  id: number;
  name: string;
}

export type ChinchillaPriceType = {
  status_id: number;
  currency: 'RUB' | 'EUR';
  value: number;
}

export type ChinchillaType = {
  id: number;
  name: string;
  color: ColorInfoType;
  birthday: string;
  owner_id: number;
  breeder_id: number;
  breeder_name: string;
  sex: 'f' | 'm';
  weight: string;
  brothers: string;
  description: string;
  breeder: UserType;
  avatar?: PhotoType;
  photos: PhotoType[];
  statuses: ChinchillaStatusType[];
  mother: ChinchillaType;
  father: ChinchillaType;
  children: ChinchillaType[];
  relatives: ChinchillaType[];
  price_rub: ChinchillaPriceType;
  price_eur: ChinchillaPriceType;
  hidden: boolean;
  conclusion: 'disagree' | 'overvalue';
};

export type PaginationType<T> = {
  data: T[];
  total: number;
  page: number;
};

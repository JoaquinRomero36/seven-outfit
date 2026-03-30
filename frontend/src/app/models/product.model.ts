export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  size: ProductSize;
  color?: string;
  stock: number;
  imageUrl: string;
  isActive: boolean;
}

export interface CreateProduct {
  name: string;
  price: number;
  category: ProductCategory;
  size: ProductSize;
  color?: string;
  stock: number;
  imageUrl: string;
}

export enum ProductCategory {
  Pantalones = 1,
  Remeras = 2,
  Buzos = 3,
  Sueteres = 4,
  Gorras = 5,
  Camperas = 6
}

export enum ProductSize {
  S = 1,
  M = 2,
  L = 3,
  XL = 4
}

export const CategoryLabels: { [key: number]: string } = {
  1: 'Pantalones',
  2: 'Remeras',
  3: 'Buzos',
  4: 'Suéteres',
  5: 'Gorras',
  6: 'Camperas'
};

export const SizeLabels: { [key: number]: string } = {
  1: 'S',
  2: 'M',
  3: 'L',
  4: 'XL'
};

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface ICart {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
}

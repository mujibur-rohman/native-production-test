import { CategoryType } from "./category.type";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryType;
  creationAt: Date;
  updatedAt: Date;
};

export type RequestParamsGetProductDto = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type RequestBodyProductDto = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

import axiosConfig from "@/config/axios";
import { ProductType, RequestBodyProductDto, RequestParamsGetProductDto } from "@/types/product.type";

const ProductService = {
  getAll: async (params: RequestParamsGetProductDto) => {
    const response = await axiosConfig.get<ProductType[]>("/products", {
      params,
    });
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await axiosConfig.get<ProductType>(`/products/${id}`);
    return response.data;
  },
  create: async (payload: RequestBodyProductDto) => {
    const response = await axiosConfig.post<ProductType>(`/products`, payload);
    return response.data;
  },
  update: async (id: number, payload: RequestBodyProductDto) => {
    const response = await axiosConfig.put<ProductType>(`/products/${id}`, payload);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosConfig.delete<ProductType>(`/products/${id}`);
    return response.data;
  },
};

export default ProductService;

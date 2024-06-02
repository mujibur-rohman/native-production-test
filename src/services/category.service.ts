import axiosConfig from "@/config/axios";
import { CategoryType } from "@/types/category.type";

const CategoryService = {
  getAll: async () => {
    const response = await axiosConfig.get<CategoryType[]>("/categories");
    return response.data;
  },
};

export default CategoryService;

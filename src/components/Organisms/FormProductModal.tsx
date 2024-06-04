/* eslint-disable react-hooks/exhaustive-deps */
import { Input, InputNumber, Select, Spin } from "antd";
import Button from "../Atoms/Button";
import Modal from "../Moleculs/Modal";
import { Form, FormField, FormItem, FormMessage } from "../Moleculs/Form";
import { useForm } from "react-hook-form";
import productSchema from "@/schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextArea from "antd/es/input/TextArea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryService from "@/services/category.service";
import UploadImage from "../Moleculs/UploadImage";
import ProductService from "@/product.service";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { ProductType } from "@/types/product.type";
import { cleanImageUrls, generateRandomId } from "@/lib/utils";
import Title from "../Atoms/Title";

type PropsFormProductModal = {
  children: React.ReactNode;
  productId?: number;
};

// Function to render the form content
function ContentForm({ setOpenModal, product }: { setOpenModal: Dispatch<SetStateAction<boolean>>; product?: ProductType }) {
  // Fetch categories using react-query
  const { data: categories, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await CategoryService.getAll();
    },
  });

  const queryClient = useQueryClient();

  // Initialize form with react-hook-form and zod for validation
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product ? product.title : "",
      price: product ? product.price : 0,
      description: product ? product.description : "",
      categoryId: product ? product.category.id : undefined,
      images: product ? cleanImageUrls(product.images) : [],
    },
  });

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      if (product) {
        // Update existing product
        await ProductService.update(product.id, {
          categoryId: values.categoryId,
          description: values.description,
          images: values.images,
          price: values.price,
          title: values.title,
        });
        queryClient.invalidateQueries({ queryKey: ["product", product.id] });
      } else {
        // Create new product
        await ProductService.create({
          categoryId: values.categoryId,
          description: values.description,
          images: values.images,
          price: values.price,
          title: values.title,
        });
      }
      setOpenModal(false);
      toast.success("Save Product Successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      toast.error("there is an error");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <Title isCenter text={product ? "Edit Product" : "Add Product"} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <label htmlFor="title">Title</label>
              <Input status={form.formState.errors.title && "error"} placeholder="Title" id="title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <label htmlFor="price" className="block">
                Price
              </label>
              <InputNumber min={0} status={form.formState.errors.price && "error"} type="number" id="price" addonBefore="$" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <label htmlFor="description" className="block">
                Description
              </label>
              <TextArea status={form.formState.errors.description && "error"} rows={4} placeholder="Type product description..." id="description" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <label htmlFor="categoryId" className="block">
                Category
              </label>
              <Select
                onChange={(val) => {
                  form.setValue("categoryId", val);
                  form.clearErrors("categoryId");
                }}
                status={form.formState.errors.categoryId && "error"}
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                id="categoryId"
                value={form.watch("categoryId")}
                options={categories?.map((cat) => ({ label: cat.name, value: cat.id }))}
                loading={isLoadingCategory}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <label className="block">Images</label>
              <UploadImage
                onChange={(files) => {
                  form.setValue(
                    "images",
                    files
                      .filter((file) => file.response || file?.url)
                      .map((file) => {
                        if (file.response) {
                          return file.response?.location;
                        } else {
                          return file.url;
                        }
                      })
                  );
                  form.clearErrors("images");
                }}
                value={form.watch("images").map((img) => ({
                  name: generateRandomId(10),
                  uid: generateRandomId(10),
                  url: img,
                }))}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? <Spin indicator={<LoadingOutlined style={{ fontSize: 16, color: "#FFFFFF" }} spin />} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

// Main component for the product form modal
function FormProductModal({ children, productId }: PropsFormProductModal) {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch product details if productId is provided and modal is open
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    enabled: !!productId && isOpen,
    queryFn: async () => {
      return await ProductService.getOne(productId as number);
    },
  });

  return (
    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      content={
        !!productId && isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <ContentForm setOpenModal={setIsOpen} product={product} />
        )
      }
    >
      {children}
    </Modal>
  );
}

export default FormProductModal;

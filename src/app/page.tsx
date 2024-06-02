"use client";
import Title from "@/components/Atoms/Title";
import AppPadding from "@/components/Organisms/AppPadding";
import { DataTable } from "@/components/Organisms/Datatable";
import { useDebounce } from "@/hooks/useDebounce";
import useProduct from "@/hooks/useProduct";
import { LIMIT_TABLE, TOTAL_DATA } from "@/lib/constants";
import ProductService from "@/services/product.service";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Input, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormProductModal from "@/components/Organisms/FormProductModal";
import Button from "@/components/Atoms/Button";

export default function Home() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? "1";
  const pathname = usePathname();
  const { push } = useRouter();

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 300);
  const [offset, setOffset] = useState(parseInt(currentPage) * LIMIT_TABLE - LIMIT_TABLE);

  const { tableHeader } = useProduct({ currentPage: (parseInt(currentPage) - 1) * LIMIT_TABLE });

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["products", currentPage, debouncedSearch],
    queryFn: async () => {
      return await ProductService.getAll({
        limit: LIMIT_TABLE,
        offset,
        title: debouncedSearch,
      });
    },
  });

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    push(`${pathname}?${params.toString()}`);
    setOffset(page * LIMIT_TABLE - LIMIT_TABLE);
  };

  return (
    <main className="py-8">
      <AppPadding className="space-y-5">
        <Title text="Products" />
        <div className="flex justify-end gap-3">
          <Input
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              params.set("page", "1");
              setSearch(e.target.value);
              push(`${pathname}?${params.toString()}`);
              setOffset(0);
            }}
            placeholder="Search.."
            addonBefore={<SearchOutlined />}
            style={{ width: "200px" }}
          />
          <FormProductModal>
            <Button>Add Product</Button>
          </FormProductModal>
        </div>
        <DataTable refetch={refetch} isLoading={isLoading} isError={isError} isFetching={isFetching} columns={tableHeader} data={products} />
        <Pagination pageSize={LIMIT_TABLE} onChange={handlePageChange} current={parseInt(currentPage)} total={TOTAL_DATA} showSizeChanger={false} />
      </AppPadding>
    </main>
  );
}

import ActionTable from "@/components/Moleculs/ActionTable";
import ProductService from "@/services/product.service";
import { ProductType } from "@/types/product.type";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

function useProduct({ currentPage }: { currentPage: number }) {
  const queryClient = useQueryClient();

  const tableHeader: ColumnDef<ProductType>[] = [
    {
      accessorKey: "no",
      header: "No",
      cell: (props) => {
        const row = props.row.index + 1;
        return row + currentPage;
      },
    },
    {
      accessorKey: "name",
      header: "Product Title",
      cell: ({ row }) => {
        return <span className="whitespace-nowrap">{row.original.title}</span>;
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return <span className="whitespace-nowrap">${row.original.price}</span>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <ActionTable
            data={row.original}
            onConfirm={async () => {
              try {
                await ProductService.delete(row.original.id);
                toast.success("Delete Product Successfully");
                queryClient.invalidateQueries({ queryKey: ["products"] });
              } catch (error) {
                toast.error("there is an error");
                console.error(error);
              }
            }}
          />
        );
      },
    },
  ];
  return { tableHeader };
}

export default useProduct;

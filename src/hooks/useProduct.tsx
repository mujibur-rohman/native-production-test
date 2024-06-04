import Button from "@/components/Atoms/Button"; // Importing Button component
import ActionTable from "@/components/Moleculs/ActionTable"; // Importing ActionTable component
import ProductService from "@/product.service"; // Importing ProductService
import { RootState } from "@/store"; // Importing RootState from store
import { addCart, removeCart } from "@/store/cart"; // Importing addCart and removeCart actions from cart store
import { ProductType } from "@/types/product.type"; // Importing ProductType from types
import { useQueryClient } from "@tanstack/react-query"; // Importing useQueryClient hook from react-query
import { ColumnDef } from "@tanstack/react-table"; // Importing ColumnDef from react-table
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { toast } from "sonner"; // Importing toast from sonner library

// Custom hook for handling product data
function useProduct({ currentPage }: { currentPage: number }) {
  const queryClient = useQueryClient(); // Initializing queryClient from useQueryClient hook

  // Fetching cart state and dispatch function from Redux store
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  // Table header configuration
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
      accessorKey: "cart",
      header: "To Cart",
      cell: ({ row }) => {
        // Rendering Add to Cart or Remove button based on cart status
        if (cart.find((c) => c.id === row.original.id)) {
          return (
            <Button variant="outlined" onClick={() => dispatch(removeCart(row.original))}>
              Remove
            </Button>
          );
        }
        return (
          <Button variant="default" onClick={() => dispatch(addCart(row.original))}>
            Add To Cart
          </Button>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        // Rendering ActionTable component for additional actions
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

  return { tableHeader }; // Returning table header configuration
}

export default useProduct; // Exporting the useProduct hook

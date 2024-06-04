import { ProductType } from "@/types/product.type";
import Button from "../Atoms/Button";
import FormProductModal from "../Organisms/FormProductModal";
import ModalConfirm from "../Organisms/ModalConfirm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {
  onConfirm: () => Promise<void>; // Function to confirm action
  data: ProductType; // Data of the product
};

// ActionTable component definition
function ActionTable({ onConfirm, data }: Props) {
  return (
    <div className="flex gap-3">
      {/* Container for action buttons with spacing */}
      <FormProductModal productId={data.id}>
        {/* Form modal for editing product */}
        <Button variant="warning">
          {/* Button with warning variant */}
          <EditOutlined /> {/* Edit icon */}
        </Button>
      </FormProductModal>
      <ModalConfirm onConfirm={onConfirm} title="Hapus" description="Data yang dihapus akan hilang permanen, apakah yakin?">
        {/* Confirmation modal for deleting product */}
        <Button variant="error">
          {/* Button with error variant */}
          <DeleteOutlined /> {/* Delete icon */}
        </Button>
      </ModalConfirm>
    </div>
  );
}

export default ActionTable; // Exporting the ActionTable component

import { ProductType } from "@/types/product.type";
import Button from "../Atoms/Button";
import FormProductModal from "../Organisms/FormProductModal";
import ModalConfirm from "../Organisms/ModalConfirm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {
  onConfirm: () => Promise<void>;
  data: ProductType;
};

function ActionTable({ onConfirm, data }: Props) {
  return (
    <div className="flex gap-3">
      <FormProductModal productId={data.id}>
        <Button variant="warning">
          <EditOutlined />
        </Button>
      </FormProductModal>
      <ModalConfirm onConfirm={onConfirm} title="Hapus" description="Data yang dihapus akan hilang permanen, apakah yakin?">
        <Button variant="error">
          <DeleteOutlined />
        </Button>
      </ModalConfirm>
    </div>
  );
}

export default ActionTable;

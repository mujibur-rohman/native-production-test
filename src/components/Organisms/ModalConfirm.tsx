import React, { useState } from "react";
import Modal from "../Moleculs/Modal";
import Button from "../Atoms/Button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
};

function ModalConfirm({ children, description, title, onConfirm }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      content={
        <div className="space-y-3">
          <p className="text-lg font-medium">{title}</p>
          <p>{description}</p>
          <div className="flex justify-end gap-3">
            <Button onClick={() => setIsOpen(false)} variant="outlined" className="w-20">
              No
            </Button>
            <Button
              className="w-20 text-primary-foreground"
              onClick={async () => {
                setLoading(true);
                await onConfirm();
                setIsOpen(false);
                setLoading(false);
              }}
            >
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      spin
                      style={{
                        color: "#FFFFFF",
                      }}
                    />
                  }
                />
              ) : (
                "Yes"
              )}
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </Modal>
  );
}

export default ModalConfirm;

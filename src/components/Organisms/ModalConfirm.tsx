import React, { useState } from "react";
import Modal from "../Moleculs/Modal";
import Button from "../Atoms/Button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type Props = {
  children: React.ReactNode; // Children components to render inside the modal
  title: string; // Title of the modal
  description: string; // Description text inside the modal
  onConfirm: () => Promise<void>; // Function to execute on confirmation
};

// Component for a confirmation modal
function ModalConfirm({ children, description, title, onConfirm }: Props) {
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
  const [isLoading, setLoading] = useState(false); // State to control loading spinner

  return (
    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      content={
        <div className="space-y-3">
          <p className="text-lg font-medium">{title}</p> {/* Modal title */}
          <p>{description}</p> {/* Modal description */}
          <div className="flex justify-end gap-3">
            <Button onClick={() => setIsOpen(false)} variant="outlined" className="w-20">
              No
            </Button>
            {/* Button to close the modal without confirming */}
            <Button
              className="w-20 text-primary-foreground"
              onClick={async () => {
                setLoading(true); // Set loading state to true
                await onConfirm(); // Execute the confirmation function
                setIsOpen(false); // Close the modal
                setLoading(false); // Set loading state to false
              }}
            >
              {isLoading ? (
                // Show loading spinner if in loading state
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
            {/* Button to confirm the action */}
          </div>
        </div>
      }
    >
      {children} {/* Render children components inside the modal */}
    </Modal>
  );
}

export default ModalConfirm;

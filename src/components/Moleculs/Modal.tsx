import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

// Modal component definition
const Modal = ({ children, content, setOpen, open }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; children: React.ReactNode; content: React.ReactNode }) => {
  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div> {/* Element to open the modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} // Initial state for animation
            animate={{ opacity: 1 }} // Animation state
            exit={{ opacity: 0 }} // Exit state for animation
            onClick={() => setOpen(false)} // Close modal on click
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }} // Initial state for inner content animation
              animate={{ scale: 1, rotate: "0deg" }} // Animation state for inner content
              exit={{ scale: 0, rotate: "0deg" }} // Exit state for inner content
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
              className="bg-background p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              {content} {/* Modal content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;

import type { ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white relative rounded-lg shadow-lg p-6 w-[90%] md:w-1/2 max-h-[70%] min-h-[200px] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

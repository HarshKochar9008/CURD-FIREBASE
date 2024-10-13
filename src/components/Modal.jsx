import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 flex w-30 items-center p-3 justify-center z-30 backdrop-blur-sm">
          <div className="relative rounded-md z-40 w-[500px] max-w-lg max-h-[80vh] bg-pale p-4 overflow-y-auto">
            <div className="flex justify-end items-center">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer text-gray-500"
              />
            </div>
            {children}
          </div>          
        </div>
      )}  
    </>
    ,document.getElementById("modal-root")
  );
};

export default Modal;

import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" absolute top-0 grid z-30 h-screen w-screen place-items-center backdrop-blur">
          <div className="relative m-auto rounded-md z-50 min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end items-center">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl text-gray-500"
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

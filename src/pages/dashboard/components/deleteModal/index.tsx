import { FiX } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";

interface ModalProps{
    openModal:boolean;
    handleCancel:()=>void;
    handleDeleteConfirm:()=>void;
}

export function DeleteModal({openModal, handleCancel, handleDeleteConfirm}:ModalProps) {
  return (
    <section className={`fixed top-0 inset-0  items-center justify-center bg-black/60 z-50 overflow-x-hidden ${openModal ? "flex" : " hidden"}`}>
      <div className=" w-xs rounded bg-white flex flex-col items-center gap-4  p-4 ">
        <div className="w-full flex justify-end">
          <FiX
            onClick={() => handleCancel()}
            className=" text-end  text-lg text-[#2A4D4E] cursor-pointer"
          />
        </div>

        <IoWarningOutline size={40} color="#C14426" />
        <p className="font-semibold text-primary">
          ¿Deseas eliminar este producto?
        </p>
        <p className="text-xs text-[#2A4D4E]">
          esta acción no se puede deshacer
        </p>

        <div className="w-full flex justify-between ">
          <button
            onClick={() => handleCancel()}
            className="bg-[#0B2D2E] px-4 rounded text-white cursor-pointer font-semibold"
          >
            Cancelar
          </button>

          <button
            onClick={() => handleDeleteConfirm()}
            className="bg-[#C14426] px-4 rounded text-white cursor-pointer font-semibold"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </section>
  );
}

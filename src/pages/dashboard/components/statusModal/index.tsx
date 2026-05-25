import { FiX } from "react-icons/fi";
import type { Product } from "../../../../features/products/types/product";

interface StatusModalProps{
    openStatusModal:boolean;
    handleStatusCancel:()=>void;
    handleEdit:(e:React.FormEvent<HTMLFormElement>)=>void;
    shoe:Product | null;
}

export function StatusModal({openStatusModal, handleStatusCancel,handleEdit, shoe}:StatusModalProps) {

  return (
    <section
      className={`fixed top-0 inset-0  items-center justify-center bg-black/60 z-50 overflow-x-hidden ${openStatusModal ? "flex" : " hidden"}`}
    >
      <div className=" w-xs rounded bg-white flex flex-col items-center gap-4  p-4 ">
        <div className="w-full flex justify-end font-medium text-[#0B2D2E] ">
          <FiX
            onClick={() => handleStatusCancel()}
            className=" text-end  text-lg text-[#2A4D4E] cursor-pointer"
          />
        </div>

        <form
          onSubmit={handleEdit}
          className=" w-full flex flex-col gap-4 text-[#0B2D2E] "
        >
          <fieldset className="font-medium text-center">
            Modificar Estado
          </fieldset>
          <p className="text-xs font-semibold">MODELO: {shoe?.modelo}</p>

          <label className="flex gap-2">
            <input type="radio" name="estado" value="Novedades" />
            Nuevo
          </label>

          <label className="flex gap-2">
            <input type="radio" name="estado" value="Pocas unidades" />
            Pocas unidades
          </label>

          <label className="flex gap-2">
            <input type="radio" name="estado" value="Agotado" />
            Agotado
          </label>

          <button
            type="submit"
            className="bg-[#C14426] px-4 rounded text-white cursor-pointer font-semibold"
          >
            actualizar
          </button>
        </form>
      </div>
    </section>
  );
}

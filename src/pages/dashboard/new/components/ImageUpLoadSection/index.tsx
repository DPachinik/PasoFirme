
import { ImagePreview } from "../ImagePreview";
import type { ChangeEvent } from "react";
import type { ImageProps } from "../../types/image";
import { UploadSimpleIcon } from "@phosphor-icons/react";

interface PropsImageSection{
    handleFile:(e:ChangeEvent<HTMLInputElement>)=>void;
    handleDeleteImage:(image:ImageProps)=>void;
    shoeImages:ImageProps[];
}

export function ImageUpLoadSection({handleFile, handleDeleteImage, shoeImages}:PropsImageSection) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-4xl  md:mx-auto px-1 md:px-10  border border-white  rounded-lg  py-10 bg-gray-800 ">
      <p className="text-white font-semibold text-lg">Fotos</p>
      <button className="relative w-full h-30  rounded-lg flex items-center justify-center border border-dashed border-white hover:bg-gray-600 transition-all duration-200">
        <UploadSimpleIcon
          size={30}
          color="#ffff"
          className="absolute cursor-pointer "
        />
        <input
          type="file"
          accept="image/*"
          className="opacity-0 cursor-pointer"
          onChange={handleFile}
        />
      </button>

      <div className="grid grid-cols-4 w-full gap-2">
        {[0, 1, 2, 3].map((index) => (
          <ImagePreview
            key={index}
            image={shoeImages[index]}
            onDelete={() => handleDeleteImage(shoeImages[index])}
          />
        ))}
      </div>
    </div>
  );
}

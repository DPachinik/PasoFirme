import { FiUpload } from "react-icons/fi";
import { ImagePreview } from "../ImagePreview";
import type { ChangeEvent } from "react";
import type { ImageProps } from "../../types/image";

interface PropsImageSection{
    handleFile:(e:ChangeEvent<HTMLInputElement>)=>void;
    handleDeleteImage:(image:ImageProps)=>void;
    shoeImages:ImageProps[];
}

export function ImageUpLoadSection({handleFile, handleDeleteImage, shoeImages}:PropsImageSection) {
  return (
    <div className="flex gap-2 w-full max-w-4xl  md:mx-auto px-1 md:px-10  rounded-t-lg pt-4 ">
      <button className="w-25 h-30  rounded-lg flex items-center justify-center bg-white">
        <FiUpload
          size={30}
          color="#2A4D4E"
          className="absolute cursor-pointer"
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

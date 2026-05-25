import { DashboardHeader } from "../../../components/panelheader";
import { useContext } from 'react';
import { AuthContext } from '../../../features/auth/authContext'
import { useShoes } from "./hook/useShoes";
import { ImageUpLoadSection } from "./components/ImageUpLoadSection";
import { Form } from "./components/form";

export function New(){

    const {uid} = useContext(AuthContext);
    const {handleFile,shoeImages,handleDeleteImage,registerProduct} = useShoes();

    return(
        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] gap-1 h-100dvh"> 
                <div className="w-full">
                    <DashboardHeader />
                </div>            
                
                <div className="flex flex-col my-4 ">
                    
                    <div className="w-full border border-[#2A4D4E] border-b-0 md:rounded-t-lg max-w-4xl mx-auto py-1 pl-4  text-white">
                        <h2 className="text-xs font-medium  text-secondary">REGISTRAR NUEVO PRODUCTO</h2>
                    </div>

                    <div className="w-full max-w-4xl  flex flex-col mx-auto border border-[#2A4D4E] md:rounded-b-lg">
                        <ImageUpLoadSection handleFile={(e)=>handleFile({e, uid})} handleDeleteImage={(image)=>handleDeleteImage({image, uid})} shoeImages={shoeImages} />
                        <Form onSubmit={(data)=>registerProduct(shoeImages,data,uid)}/>
                    </div>
                </div>
        </div>
    )

}
import { DashboardHeader } from "../../../components/panelheader";
import { useContext } from 'react';
import { AuthContext } from '../../../features/auth/authContext'
import { useShoes } from "./hook/useShoes";
import { ImageUpLoadSection } from "./components/ImageUpLoadSection";
import { Form } from "./components/form";

export default function New(){

    const {uid} = useContext(AuthContext);
    const {handleFile,shoeImages,handleDeleteImage,registerProduct} = useShoes();

    return(
        <div className="  h-full bg-primary"> 
                <div className="w-full">
                    <DashboardHeader />
                </div>            
                
                <div className="flex flex-col  md:ml-64">
                    
                    <div className="w-full max-w-4xl mx-auto pt-8  mb-4 text-white">
                        <h2 className="text-lg font-medium  text-white"> NUEVO PRODUCTO</h2>
                    </div>

                    <div className="w-full max-w-4xl  flex flex-col mx-auto  md:rounded-b-lg">
                        <ImageUpLoadSection handleFile={(e)=>handleFile({e, uid})} handleDeleteImage={(image)=>handleDeleteImage({image, uid})} shoeImages={shoeImages} />
                        <Form onSubmit={(data)=>registerProduct(shoeImages,data,uid)}/>
                    </div>
                </div>
        </div>
    )

}
import { Input } from "../../../components/input";
import {  z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const containerStyle = "flex flex-col gap-1 w-full"
const labelStyle = "text-xs font-medium  text-secondary"

const schema = z.object({
    modelo:z.string().trim().nonempty('campo obligatorio'),
    calceMin:z.string().trim().nonempty('campo obligatorio'),
    calceMax:z.string().trim().optional(),
    descripcionCorta:z.string().trim().nonempty('campo obligatorio'),
    descripcion:z.string().trim().nonempty('campo obligatorio'),
    color:z.string().nonempty('campo obligatorio'),
    precio:z.string().trim().nonempty('campo obligatorio'),
    estado:z.enum(['Pocas unidades', 'Agotado', 'Novedades']),
})

export type FormData = z.infer<typeof schema>

interface OnSubmitProps{
  onSubmit:(data:FormData)=> Promise<boolean |undefined | string>
}
export function Form({onSubmit}:OnSubmitProps) {

      const{ register, handleSubmit, formState:{errors} , reset }=useForm<FormData>({
        resolver:zodResolver(schema),
        mode:'onChange'
    })

  return (
    <form
       onSubmit={handleSubmit(async (data) => {
    const success = await onSubmit(data);

    if (success) {
      reset();
    }
  })}
      className="flex flex-col gap-2 mx-auto  my-4 w-full max-w-3xl "
    >
      <div className=" p-2 rounded-lg flex flex-col gap-4 w-full ">
        <div className={containerStyle}>
          <label className={labelStyle}>MODELO</label>
          <Input
            type="text"
            name="modelo"
            placeholder="Zapato punta fina"
            register={register}
            error={errors.modelo?.message}
          />
        </div>

        <div className="flex gap-2">
          <div className={containerStyle}>
            <label className={labelStyle}>CALCE MÍN</label>
            <select
              id="min"
              required
              {...register("calceMin")}
              name="calceMin"
              className=" outline-none rounded-sm h-7 text-primary bg-white"
            >
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
            </select>
          </div>
          <div className={containerStyle}>
            <label className={labelStyle}>CALCE MÁX</label>
            <select
              id="min"
              {...register("calceMax")}
              name="calceMax"
              className=" outline-none text-primary bg-white rounded-sm h-7"
            >
              <option></option>
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
            </select>
          </div>

          <div className={containerStyle}>
            <label className={labelStyle}>PRECIO</label>
            <Input
              type="text"
              name="precio"
              placeholder="250.000"
              register={register}
              error={errors.precio?.message}
            />
          </div>
        </div>
      </div>

      <div className=" w-full px-2 rounded-lg flex flex-col gap-1 py-2">
        <p className={labelStyle}>DESCRIPCIÓN CORTA </p>
        <textarea
          className=" w-full max-w-3xl text-xs bg-white h-10 outline-none px-2 pt-2 rounded"
          id="descriptionCorta"
          {...register("descripcionCorta")}
          placeholder="Zapato punta fina elegante, estilo italiano de cuero vacuno... "
        />
      </div>

      <div className=" w-full px-2 rounded-lg flex flex-col gap-1 py-2">
        <p className={labelStyle}>DESCRIPCIÓN</p>
        <textarea
          className=" w-full max-w-3xl text-xs bg-white h-24 outline-none px-2 pt-2 rounded"
          id="descripcion"
          {...register("descripcion")}
          placeholder="Zapato casual para hombre, Diseño X, estilo Y de cuero vacuno... "
        />
      </div>

      <div className="flex gap-4 md:gap-12 items-center">
        <div className=" p-2 rounded-lg">
          <p className={labelStyle}>ESTADO DEL PRODUCTO</p>
          <div className="flex gap-4  w-fit p-2 rounded-lg mt-1  text-xs text-primary bg-white">
            <label className="text-center flex items-center gap-2 ">
              <p>Pocas unidades</p>
              <input
                type="radio"
                value="Pocas unidades"
                {...register("estado")}
                name="estado"
              />
            </label>
            <label className="text-center flex items-center gap-2">
              <p>Agotado</p>
              <input
                type="radio"
                value="Agotado"
                {...register("estado")}
                name="estado"
                className="cursor-pointer"
              />
            </label>
            <label className="text-center flex items-center gap-2">
              <p>Novedades</p>
              <input
                type="radio"
                value="Novedades"
                {...register("estado")}
                name="estado"
                className="cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="">
          <label className={labelStyle}>COLOR</label>
          <Input
            type="color"
            name="color"
            register={register}
            error={errors.color?.message}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white rounded-sm h-6 font-semibold  bg-secondary-rel cursor-pointer"
      >
        Registrar
      </button>
    </form>
  );
}

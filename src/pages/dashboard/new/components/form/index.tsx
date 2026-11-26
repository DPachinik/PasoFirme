import { Input } from "../../../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectorTalla } from "./components/selectorTalla";
import { SelectorMarcas } from "./components/selectorMarcas";
import { SelectorColores } from "./components/selectorColores"

const containerStyle =
  "flex flex-col gap-1 w-full max-w-4xl md:mx-auto px-1 md:px-10";
const labelStyle = "text-white font-semibold text-lg";


const schema = z.object({
  modelo: z.string().trim().nonempty("campo obligatorio"),
  talles: z.array(z.string()).optional(),
  marcas: z.array(z.string()).optional(),
  colores: z.array(z.string()).optional(),
  calceMin: z.string().trim().optional(),
  calceMax: z.string().trim().optional(),
  descripcion: z.string().trim().nonempty("campo obligatorio"),
  precio: z.string().trim().nonempty("campo obligatorio"),
  popular: z.string().trim().optional(),
  estado: z.enum(["Pocas unidades", "Agotado", "Novedades"]),
  categoria: z.enum(["clásicos", "accesorios", "deportivos"]),
});

export type FormData = z.infer<typeof schema>;

interface OnSubmitProps {
  onSubmit: (data: FormData) => Promise<boolean | undefined | string>;
}

export function Form({ onSubmit }: OnSubmitProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      talles: [],
      marcas: [],
      colores: [],
    },
  });



  return (
    <form
      className="flex flex-col gap-2 mx-auto my-4 w-full"
      onSubmit={handleSubmit(async (data) => {
        const success = await onSubmit(data);

        if (success) {
          reset({ talles: [], marcas: [], colores: []});
        }
      })}
    >
      <div className="p-2 rounded-lg flex flex-col gap-4 w-full border border-white bg-gray-800">
        <p className={labelStyle}>Datos básicos</p>
        <div className={containerStyle}>
          <p className={labelStyle}>Nombre</p>
          <Input
            type="text"
            name="modelo"
            placeholder="Zapato punta fina"
            register={register}
            error={errors.modelo?.message}
          />
        </div>

        <div className={containerStyle}>
          <p className={labelStyle}>Categoría</p>
          <div className="flex gap-4 w-full justify-between h-9 px-4 rounded text-sm md:text-base text-primary bg-white">
            <label className="text-center flex items-center gap-2">
              <p>Clásicos</p>
              <input
                type="radio"
                value="clásicos"
                {...register("categoria")}
                name="categoria"
                className="bg-red-600"
              />
            </label>
            <label className="text-center flex items-center gap-2">
              <p>Accesorios</p>
              <input
                type="radio"
                value="accesorios"
                {...register("categoria")}
                name="categoria"
                className="cursor-pointer"
              />
            </label>
            <label className="text-center flex items-center gap-2">
              <p>Deportivos</p>
              <input
                type="radio"
                value="deportivos"
                {...register("categoria")}
                name="categoria"
                className="cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className={containerStyle}>
          <p className={labelStyle}>Descripción</p>
          <textarea
            className="w-full max-w-4xl text-xs bg-white h-24 outline-none px-2 pt-2 rounded md:text-base"
            id="descripcion"
            {...register("descripcion")}
            placeholder="Zapato casual para hombre, Diseño X, estilo Y de cuero vacuno... "
          />
        </div>

        <div className="flex">
          <div className={containerStyle}>
            <label className={labelStyle}>Precio</label>
            <Input
              type="text"
              name="precio"
              placeholder="250.000"
              register={register}
              error={errors.precio?.message}
            />
          </div>
          <div className={containerStyle}>
            <p className={labelStyle}>Destacado</p>
            <select
              id="popular"
              required
              {...register("popular")}
              name="popular"
              className="outline-none rounded-sm h-7 text-primary bg-white"
            >
              <option></option>
              <option>Popular</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-2 rounded-lg flex flex-col gap-4 w-full border border-white bg-gray-800 mt-2">
        <p className={labelStyle}>Variantes</p>
        <SelectorTalla
          watch={watch}
          setValue={setValue}
          error={errors.talles?.message}
        />

        <SelectorMarcas
          watch={watch}
          setValue={setValue}
          error={errors.marcas?.message}
        />

        <div className="flex gap-2">
          <div className={containerStyle}>
            <p className={labelStyle}>Calce Mínimo</p>
            <select
              id="min"
              required
              {...register("calceMin")}
              name="calceMin"
              className="outline-none rounded-sm h-7 text-primary bg-white"
            >
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
              <option>45</option>
            </select>
          </div>
          <div className={containerStyle}>
            <label className={labelStyle}>Calce Máximo</label>
            <select
              id="min"
              {...register("calceMax")}
              name="calceMax"
              className="outline-none text-primary bg-white rounded-sm h-7"
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
              <option>45</option>
            </select>
          </div>
        </div>

        <div className={containerStyle}>
          <label className={labelStyle}>Color</label>
          <Input
            type="color"
            name="colores"
            register={register}
            error={errors.colores?.message}
          />
          <SelectorColores
          watch={watch}
          setValue={setValue}
          error={errors.colores?.message}
          />
        </div>

        <div className={containerStyle}>
          <div className="p-2 rounded-lg">
            <p className={labelStyle}>Estado / Disponibilidad</p>
            <div className="flex gap-4 w-full justify-between h-9 px-4 rounded text-sm md:text-base text-primary bg-white">
              <label className="text-center flex items-center gap-2">
                <p>Pocas unidades</p>
                <input
                  type="radio"
                  value="Pocas unidades"
                  {...register("estado")}
                  name="estado"
                  className="cursor-pointer"
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
        </div>
      </div>

      <div className="flex justify-end rounded py-4 gap-4 px-4">
        <button
          type="button"
          onClick={() => reset({ talles: [], marcas: [] })}
          className="w-auto px-4 h-9 rounded-sm bg-gray-800 border border-white hover:scale-105 hover:bg-amber-700 transition-all duration-200 text-white text-sm md:text-base font-semibold cursor-pointer flex items-center justify-center gap-4"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="w-auto px-4 max-w-lg h-9 font-semibold rounded-sm border border-white hover:scale-105 bg-blue-700 transition-all duration-200 hover:bg-blue-600 shadow-white text-white text-sm md:text-base cursor-pointer flex items-center justify-center gap-4"
        >
          Crear Producto
        </button>
      </div>
    </form>
  );
}
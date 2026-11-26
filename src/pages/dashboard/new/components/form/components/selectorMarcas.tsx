import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { FormData } from "../index";

const MARCAS = [
  "New Balance",
  "Adidas",
  "Nike",
  "Puma",
  "Under",
  "Lotto",
  "Olympikus",
  "Skechers",
  "361",
  "Acsis",
  "Reebok",
  "Kappa",
] as const;

interface SelectorMarcasProps {
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  error?: string;
}

export function SelectorMarcas({ watch, setValue, error }: SelectorMarcasProps) {
  const marcasSeleccionadas = watch("marcas") ?? [];

  const toggleMarca = (marca: string) => {
    const existe = marcasSeleccionadas.includes(marca);
    const actualizadas = existe
      ? marcasSeleccionadas.filter((item) => item !== marca)
      : [...marcasSeleccionadas, marca];

    setValue("marcas", actualizadas, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-4xl md:mx-auto px-1 md:px-10">
      <p className="text-white font-semibold text-lg">Marcas</p>
      <div
        role="group"
        aria-label="Marcas"
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        {MARCAS.map((marca) => {
          const seleccionada = marcasSeleccionadas.includes(marca);

          return (
            <button
              key={marca}
              type="button"
              aria-pressed={seleccionada}
              onClick={() => toggleMarca(marca)}
              className={`h-10 px-4 rounded-full text-sm font-bold tracking-wide transition-all cursor-pointer border ${
                seleccionada
                  ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                  : "bg-[#0d1524] border-[#1e2d45] text-white hover:border-slate-400"
              }`}
            >
              {marca}
            </button>
          );
        })}
      </div>
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
}
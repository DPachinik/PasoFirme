import { type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { type FormData } from "../index";

const TALLES = ["P", "M", "G", "XG", "XXG", "XXXG", "XXXXG"] as const;

interface SelectorTallaProps {
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  error?: string;
}

export function SelectorTalla({ watch, setValue, error }: SelectorTallaProps) {
  const tallesSeleccionados = watch("talles") ?? [];

  const toggleTalle = (talle: string) => {
    const existe = tallesSeleccionados.includes(talle);
    const actualizados = existe
      ? tallesSeleccionados.filter((item) => item !== talle)
      : [...tallesSeleccionados, talle];

    setValue("talles", actualizados, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-4xl md:mx-auto px-1 md:px-10">
      <p className="text-white font-semibold text-lg">Talles</p>
      <div
        role="group"
        aria-label="Talles"
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        {TALLES.map((talle) => {
          const seleccionado = tallesSeleccionados.includes(talle);

          return (
            <button
              key={talle}
              type="button"
              aria-pressed={seleccionado}
              onClick={() => toggleTalle(talle)}
              className={`h-10 min-w-[3.25rem] px-4 rounded-full text-sm font-bold tracking-wider transition-all cursor-pointer border ${
                seleccionado
                  ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                  : "bg-[#0d1524] border-[#1e2d45] text-white hover:border-slate-400"
              }`}
            >
              {talle}
            </button>
          );
        })}
      </div>
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
}
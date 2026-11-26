import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { FormData } from "../index";

export const COLORES = [
  { nombre: "Negro", hex: "#111111" },
  { nombre: "Blanco", hex: "#FFFFFF" },
  { nombre: "Gris", hex: "#9CA3AF" },
  { nombre: "Azul marino", hex: "#1E3A8A" },
  { nombre: "Celeste", hex: "#7DD3FC" },
  { nombre: "Rojo", hex: "#EF4444" },
  { nombre: "Rosa", hex: "#F9A8D4" },
  { nombre: "Verde", hex: "#16A34A" },
  { nombre: "Beige", hex: "#E7D5B8" },
  { nombre: "Marrón", hex: "#7C4D34" },
  { nombre: "Amarillo", hex: "#FACC15" },
  { nombre: "Lila", hex: "#C4B5FD" },
] as const;

interface SelectorColoresProps {
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
  error?: string;
}

export function SelectorColores({ watch, setValue, error }: SelectorColoresProps) {
  const coloresSeleccionados = watch("colores") ?? [];

  const toggleColor = (color: string) => {
    const existe = coloresSeleccionados.includes(color);
    const actualizados = existe
      ? coloresSeleccionados.filter((item) => item !== color)
      : [...coloresSeleccionados, color];

    setValue("colores", actualizados, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-4xl md:mx-auto px-1 ">
      <p className="text-white font-semibold text-lg">Colores</p>
      <div
        role="group"
        aria-label="Colores"
        className="flex flex-wrap items-center gap-3 pt-1"
      >
        {COLORES.map(({ nombre, hex }) => {
          const seleccionado = coloresSeleccionados.includes(nombre);

          return (
            <button
              key={nombre}
              type="button"
              aria-pressed={seleccionado}
              onClick={() => toggleColor(nombre)}
              className={`h-10 px-4 rounded-full text-sm font-bold tracking-wide transition-all cursor-pointer border flex items-center gap-2.5 ${
                seleccionado
                  ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                  : "bg-[#0d1524] border-[#1e2d45] text-white hover:border-slate-400"
              }`}
            >
              <span
                aria-hidden="true"
                className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/25"
                style={{ backgroundColor: hex }}
              />
              <span>{nombre}</span>
            </button>
          );
        })}
      </div>
      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
}

import type { IconBaseProps } from "react-icons/lib";
import type { FC } from "react";

interface DetailsProps {
  icon: FC<IconBaseProps>;
  textTop: string;
  textBottom: string;
}

export default function Details({
  icon: Icon,
  textBottom,
  textTop,
}: DetailsProps) {
  return (
    <div className="flex gap-2 items-center my-4  ">
      <div className='flex gap-2 items-center'>
        <Icon className="text-secondary text-[26px] sm:text-2xl md:text-3xl" />
        <div>
          <p className="text-white font-bebas  text-[8px] lg:text-[12px]">
            {textTop}
          </p>

          <p className="text-white font-bebas text-[8px] lg:text-[12px]">
            {textBottom}
          </p>
        </div>

      </div>
    </div>
  );
}

import type { FC } from "react";
import type { IconBaseProps } from "react-icons/lib";
import {DiamondsFourIcon,RectangleDashedIcon, FlagIcon, ShieldCheckIcon, TruckIcon, GlobeSimpleIcon} from '@phosphor-icons/react'
import zapato from '/clasico.png';
import sport from '/sport.png';
import accesorio from '/accesorio.png';

interface HeroTypes {

    category:string;
    collection:string;
    title: string;
    subTitle:string;
    description:string;
    subDescription:string;
    icons: IconTypes[];
    image:string;
}

export type IconTypes ={
    icon: FC<IconBaseProps>;
    iconTextTop: string;
    iconTextBottom: string;
}

export const HeroData: HeroTypes[] =[
    {   
        category:'clasicos',
        collection:'NUEVA COLECCIÓN 2026',
        title:'DISEÑADOS PARA',
        subTitle:'DESTACAR',
        description:'Calzado masculino en cuero premium 100% nacional,',
        subDescription:' equilibrio perfecto entre estilo, comodidad y durabilidad.',
        icons: [
            {
                icon:DiamondsFourIcon,
                iconTextTop:'CUERO',
                iconTextBottom:'PREMIUN '
            },
            {
                icon:RectangleDashedIcon,
                iconTextTop:'COSTURA',
                iconTextBottom:'ITALIANA'
            },
            {
                icon:FlagIcon,
                iconTextTop:'PRODUCTO',
                iconTextBottom:'NACIONAL'
            }
        ],
        image:zapato,
    },
    {
        category:'accesorios',
        collection:'ACCESORIOS DEPORTIVOS',
        title:'EQUIPÁ TU',
        subTitle:'MEJOR VERSIÓN',
        description:'Gorras,mochilas,medias y más. Accesorios',
        subDescription:' pensados para acompañarte en cada entrenamiento y tu día a día.',
        icons: [
            {
                icon:ShieldCheckIcon,
                iconTextTop:'CALIDAD',
                iconTextBottom:'GARANTIZADA'
            },
            {
                icon:GlobeSimpleIcon,
                iconTextTop:'MARCAS',
                iconTextBottom:'PREMIUN'
            },
            {
                icon:TruckIcon,
                iconTextTop:'ENVÍOS A',
                iconTextBottom:'TODO EL PAÍS'
            }
        ],
        image:accesorio,
    },
    {
        category:'deportivos',
        collection:'CALZADOS DEPORTIVOS',
        title:'ENERGÍA EN',
        subTitle:'CADA PASO',
        description:'Marcas internacionales que aseguran comodidad,',
        subDescription:'tracción y estilo. Ideales para entrenar o simplemente moverte mejor.',
        icons: [
            {
                icon:DiamondsFourIcon,
                iconTextTop:'MATERIAL',
                iconTextBottom:'RESISTENTE'
            },
            {
                icon:GlobeSimpleIcon,
                iconTextTop:'MARCAS',
                iconTextBottom:'PREMIUN'
            },
            {
                icon:FlagIcon,
                iconTextTop:'ENVÍOS A',
                iconTextBottom:'TODO EL PAÍS'
            }
        ],
        image:sport,
    }
]
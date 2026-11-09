
import kepi from '../../public/kepi.png'
import sport from '../../public/deportivo.png'
import zapato from '../../public/zapato.png'

interface BannerProps{
    oferta:string;
    image:string;
}

export const banerContent:BannerProps[] = [
    {
        oferta:'20%',
        image:sport,
    },
    {
        oferta:'40%',
        image:zapato,
    },
    {
        oferta:'20%',
        image:kepi,
    },

]
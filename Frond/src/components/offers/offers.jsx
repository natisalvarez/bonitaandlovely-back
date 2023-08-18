import style from './offers.module.css'
import image from './retrato-hermosa-mujer-pinceles-maquillaje-cerca-rostro-atractivo-girll-adulta-posando-sobre-espacio-blanco.jpg'
import { useNavigate } from 'react-router-dom';

export default function Offers() {
    const navigate = useNavigate()
    const click = ()=>{
        navigate('/Offers')
    }
    return (
        <div className={style.offers}>
            <div><h1>Descubre las <span style={{color: '#6A036A'}}>OFERTAS </span>que tenemos para ti</h1></div>
            <div className={style.rigth}><img src={image}  className={style.img} alt="" /><button onClick={click}>CLICK AQUÍ</button></div>
        </div>
    )
  
}
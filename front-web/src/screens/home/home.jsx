import React from 'react'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import ambienteTrabalho from './../../assets/images/ambiente-de-trabalho-1.png'
import Footer from './../../components/footer/footer'
import { Colors } from './../../services/constants'

export default function Home(){

    return (
        <div>
            <Header 
                home={true}
                callback={(type) => console.log(type)}
            />
            <FilmFrame 
                styleProps={{ bgColorRgba: Colors.red.rgb + ", 0.6", height: "70vh", width: "30%" }}
                srcImg={ambienteTrabalho}
            >
            </FilmFrame>
            <Footer />
        </div>
    )
}
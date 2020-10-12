import React from 'react'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import ambienteTrabalho from './../../assets/images/ambiente-de-trabalho-1.png'
import { Colors } from './../../util/constants'
import Footer from './../../components/footer/footer'

export default function Home(){

    return (
        <div>
            <Header />
            {/* <FilmFrame 
                styleProps={{ bgColorRgba: Colors.red.rgb + ", 0.6", height: "20vh", width: "100%" }}
                srcImg={ambienteTrabalho}
            >
            </FilmFrame> */}
            <Footer />
        </div>
    )
}
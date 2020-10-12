import React from 'react'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import ambienteTrabalho from './../../assets/images/ambiente-de-trabalho-1.png'
import Footer from './../../components/footer/footer'
import { Colors } from './../../util/constants'

export default function Home(){

    return (
        <div>
            <Header
                logged={true}
                typeUser={"administrator"}
                srcImgUser={"https://image.flaticon.com/icons/png/512/25/25634.png"}
            />
            <FilmFrame 
                styleProps={{ bgColorRgba: Colors.red.rgb + ", 0.6", height: "80vh", width: "30%" }}
                srcImg={ambienteTrabalho}
            >
            </FilmFrame>
            <Footer />
        </div>
    )
}
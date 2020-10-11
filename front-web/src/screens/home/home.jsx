import React from 'react'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import ambienteTrabalho from './../../assets/images/ambiente-de-trabalho-1.png'
import { Colors } from './../../util/constants'

export default function Home(){

    return (
        <div>
            <Header />
            <FilmFrame 
                styleProps={{ bgColorRgba: Colors.red.rgb + ", 0.6", width: "35%", height: "100%" }}
                srcImg={ambienteTrabalho}
                type={"left"}
            >
                <h1>Children doido</h1>
            </FilmFrame>
        </div>
    )
}
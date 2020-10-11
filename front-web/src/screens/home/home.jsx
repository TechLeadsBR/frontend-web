import React from 'react'
import Header from './../../components/header/header'

export default function Home(){

    return (
        <div>
            <Header />

            <h3>-----Width: {window.screen.width}</h3>
            <h3>-----Height: {window.screen.height}</h3>
        </div>
    )
}
import React , {useState} from 'react'
import Header from '../../components/header/header'
import Grafic from '../../components/Grafic/Grafic'

export default function InicalAdm(){

    const [dataGrafic, setDataGrafic] = useState({})

    const getInformationsGrafic = async () => {
        try {
            const request = await requestAPI("get", "/")

            if (request.status === 200) {
                setDataGrafic(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const childGraficInformations = () => {
        const { aluno, empresa, vagas, inscricoes } = dataGrafic

    }

    return(
        <div>
            <Header typeHeader="administrador"/>
            <Grafic/>

        </div>
    )
}
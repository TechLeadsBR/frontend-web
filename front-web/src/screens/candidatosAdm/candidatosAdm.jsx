import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import stylesCss from './candidatosAdm.module.css'

const columnsTable =["ID", "Nome", "Sobrenome", "Idade", "Genero"]

const dataTable = [
    {
        id: 1,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    },
    {
        id: 1,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    },
    {
        id: 1,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    }
]

export default function CandidatosAdm(){
    return (
        <div>
            <Header 
                typeHeader={"administrator"}
            />
            <div className={stylesCss.content}>
                <Table 
                    title={"Candidatos Cadastrados"}
                    columnsTable={columnsTable}
                    dataTable={dataTable}
                />
            </div>
            <Footer />
        </div>
    )
}
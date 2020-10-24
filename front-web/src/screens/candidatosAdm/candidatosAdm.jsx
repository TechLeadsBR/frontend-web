import React from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import stylesCss from './candidatosAdm.module.css'

const columnsTable =["ID", "Nome", "Sobrenome", "Idade", "Genero"]

const mockedData = [
    {
        id: 1,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    },
    {
        id: 2,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    },
    {
        id: 3,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    },
    {
        id: 4,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    },
    {
        id: 5,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino'
    }
]

export default function CandidatosAdm(){
    return (
        <div className={stylesCss.root}>
            <Header 
                typeHeader={"administrator"}
            />
            <div className={stylesCss.content}>
                <Table 
                    title={"Candidatos Cadastrados"}
                    columnsTable={columnsTable}
                    dataTable={mockedData}
                    action={true}
                />
                <Table 
                    title={"Ex-alunos"}
                    columnsTable={columnsTable}
                    dataTable={mockedData}
                    action={true}
                />
            </div>
            <Footer />
        </div>
    )
}
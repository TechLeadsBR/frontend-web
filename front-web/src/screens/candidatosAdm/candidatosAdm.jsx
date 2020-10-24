import React, { useState } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import stylesCss from './candidatosAdm.module.css'

const columnsTable = ["ID", "Nome", "Sobrenome", "Idade", "Genero"]

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

export default function CandidatosAdm() {

    const [showModal, setShowModal] = useState(false)
    const [dataForChanges, setDataForChanges] = useState({})

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
                    callbackAction={value => setShowModal(value)}
                    rowSelected={(row) => console.log(row)}
                />
                <Table
                    title={"Ex-alunos"}
                    columnsTable={columnsTable}
                    dataTable={mockedData}
                    callbackAction={value => setShowModal(value)}
                    action={true}
                    rowSelected={(data) => setDataForChanges(data)}
                />
            </div>
            {
                showModal && (
                    <div className={stylesCss.modalEditData}>
                        <Modal styleProps={{ width: "50%" }}>
                            <h2>Editar: {dataForChanges.nome}</h2>
                        </Modal>
                    </div>
                )
            }
            <Footer />
        </div>
    )
}
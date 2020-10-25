import React, { useState } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import stylesCss from './candidatosAdm.module.css'

const columnsTable = ["ID", "Nome", "Sobrenome", "Idade", "Genero",
    "OutraColuna", "OutraColuna", "OutraColuna", "OutraColuna", "doido", "sdfds"]

const mockedData = [
    {
        id: 1,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino',
        colunaTeste: "123",
        colunaTeste1: "123",
        colunaTeste2: "123",
        colunaTeste3: "123",
        colunaTeste4: "123",
        colunaTeste5: "123"
    },
    {
        id: 2,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino',
        colunaTeste: "123",
        colunaTeste7: "123",
        colunaTeste2: "123",
        colunaTeste3: "123",
        colunaTeste4: "123",
        colunaTeste5: "123"
    },
    {
        id: 3,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino',
        colunaTeste: "123",
        colunaTeste5: "123",
        colunaTeste6: "123",
        colunaTeste7: "123",
        colunaTeste4: "123",
        colunaTeste1: "123"
    },
    {
        id: 4,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino',
        colunaTeste: "123",
        colunaTeste2: "123",
        colunaTest3: "123",
        colunaTeste4: "123",
        colunaTeste47: "123",
        colunaTeste5: "123"
    },
    {
        id: 5,
        nome: 'Carlos',
        sobrenome: 'Morette',
        idade: 18,
        genero: 'Masculino',
        colunaTeste: "123",
        colunaTeste1: "123",
        colunaTeste2: "123",
        colunaTeste3: "123",
        colunaTeste4: "123",
        colunaTeste5: "123"
    }
]

export default function CandidatosAdm() {

    const [showModal, setShowModal] = useState(false)
    const [dataForChanges, setDataForChanges] = useState({})

    const contentModal = (
        <div className={stylesCss.contentModalEditData}>
            <p onClick={() => setShowModal(false)}>X</p>
            <h2>Editar: {dataForChanges.nome}</h2>
            <form>
                
            </form>
        </div>
    )

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
            {showModal && (
                <div className={stylesCss.modalEditData} onClick={() => setShowModal(false)}>
                    <Modal styleProps={{ width: "50%" }}>
                        {contentModal}
                    </Modal>
                </div>
            )}
            <Footer />
        </div>
    )
}
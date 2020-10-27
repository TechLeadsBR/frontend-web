import React, { useState, useEffect } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import stylesCss from './candidatosAdm.module.css'
import { requestAPI } from './../../services/api'
import { formatData } from './../../services/functions'
import { Colors } from '../../services/constants/constants'

const columnsTable = ["ID", "Nome", "Email", "RG",
    "Data Nascimento", "Telefone", "Genero"]

export default function CandidatosAdm() {

    // Decisão de visualização do modal
    const [showModal, setShowModal] = useState(false)

    // Array de candidatos
    const [dataCandidatosArray, setCandidatosArray] = useState([])

    // Linha selecionada que a tabela retorna para fazer as alterações
    const [rowSelectedForChanges, setRowSelectedForChanges] = useState({})

    // Dados alterados
    const [changedData, setChangedData] = useState({
        email: null,
        telefone: null
    })

    useEffect(() => {
        getCandidatesInDataBase()
    }, [])

    const createObjectForDataTable = (data) => {
        //commitar back, modificado metodo de listar aluno
        const candidates = data.map(item => {
            return {
                idAluno: item.idAluno,
                Nome: item.nome,
                email: item.email,
                RG: item.rg,
                dataNascimento: formatData(item.dataNascimento),
                telefone: item.telefone,
                genero: item.genero
            }
        })

        setCandidatosArray(candidates)
    }

    //#region Request API
    const getCandidatesInDataBase = async () => {
        const request = await requestAPI("get", "/aluno")
        if (request) {
            createObjectForDataTable(request.data)
        }
    }

    const changeCandidateData = async () => {
        try {
            const request = await requestAPI(`put`, `/aluno/${rowSelectedForChanges.idAluno}`, changedData)
            if(request.status === 200) {
                console.log("Deu bom")
            }
        } catch (error) {
            console.log(error)
        }
    }
    //#endregion

    const contentModalForChanges = (
        <div className={stylesCss.modalEditData}>
            <Modal styleProps={{ width: "50%" }}>
                <div className={stylesCss.contentModalEditData}>
                    <p onClick={() => setShowModal(false)}>X</p>
                    <h2>Editar: {rowSelectedForChanges.Nome}</h2>
                    <form>
                        <Input
                            labelText={"Email"}
                            name={"emailCandidate"}
                            type={"email"}
                            onChange={(event) => setChangedData({ ...changedData, email: event.target.value })}
                            currentValue={changedData.email}
                        />
                        <Input
                            labelText={"Telefone"}
                            name={"Telefone"}
                            type={"number"}
                            onChange={(event) => setChangedData({ ...changedData, telefone: event.target.value })}
                            currentValue={rowSelectedForChanges.telefone}
                        />
                        <Button
                            bgColor={Colors.red.hexadecimal}
                            textColor={Colors.white.hexadecimal}
                            text={"Alterar dados do usuario"}
                            onClick={() => changeCandidateData()}
                        />
                    </form>
                </div>
            </Modal>
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
                    dataTable={dataCandidatosArray}
                    action={true}
                    callbackAction={value => setShowModal(value)}
                    rowSelected={(row) => {
                        setRowSelectedForChanges(row)
                        setChangedData({ ...changedData, email: row.email })
                    }}
                />
                <Table
                    title={"Ex-alunos"}
                    columnsTable={columnsTable}
                    dataTable={mockedData}
                    callbackAction={value => setShowModal(value)}
                    action={true}
                />
            </div>
            {showModal && contentModalForChanges}
            <Footer />
        </div>
    )
}
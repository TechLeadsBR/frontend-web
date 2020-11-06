import React, { useState, useEffect } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import ReactToast from './../../components/reactToast/reactToast'
import stylesCss from './candidatosAdm.module.css'
import { requestAPI } from './../../services/api'
import { formatData, functionAfterTime } from './../../services/functions'
import { Colors } from '../../services/constants/constants'
import LoadingPage from './../../components/loadingPage/loadingPage'

const columnsTable = ["ID", "Nome", "Email", "RG",
    "Data Nascimento", "Telefone", "Genero"]

export default function CandidatosAdm() {

    // Decisão de visualização do modal
    const [showModal, setShowModal] = useState(false)

    // Array de candidatos
    const [dataCandidatosArray, setCandidatosArray] = useState([])

    // Linha selecionada que a tabela retorna para fazer as alterações
    const [rowSelectedForChanges, setRowSelectedForChanges] = useState({})

    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })

    // Dados alterados
    const [changeData, setChangeData] = useState({
        email: null,
        telefone: null,
        idAluno: null
    })

    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

    const toastAfterRequest = (text, status) => {
        setToastProps({ visible: true, text, status })
        functionAfterTime(3000, () => setToastProps({ visible: false, text: null, status: null }))
    }

    const createObjectForDataTable = (data) => {
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
            const request = await requestAPI(`put`, `/aluno/${rowSelectedForChanges.idAluno}`, changeData)
            if (request.status === 200) {
                setToastProps({ status: "success", text: "Candidato  alterado com sucesso", visible: true })
                setShowModal(false)
            } else {
                setToastProps({ status: "error", text: "Ocorreu um erro ao atualizar", visible: true })
            }
        } catch (error) {
            console.log(error)
        }

        setToastProps({ status: null, text: null, visible: false })

    }

    const deleteCandidate = async () => {
        try {
            const request = await requestAPI("delete", `/aluno/${changeData.idAluno}`)
            if (request.status === 200) {
                toastAfterRequest("Usuário deletado com sucuesso!", "success")
                functionAfterTime(1500, () => setShowModal(false))
            }

        } catch(error) {
            toastAfterRequest("Impossível excluir registro dependendente", "error")
        }
    }
    //#endregion

    useEffect(() => {
        let monted = true
        
        if(monted && dataCandidatosArray.length === 0) getCandidatesInDataBase()

        return () => monted = false
    })

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
                            onChange={(event) => setChangeData({ ...changeData, email: event.target.value })}
                            currentValue={changeData.email}
                        />
                        <Input
                            labelText={"Telefone"}
                            name={"Telefone"}
                            type={"number"}
                            onChange={(event) => setChangeData({ ...changeData, telefone: event.target.value })}
                            currentValue={changeData.telefone}
                        />
                        <Button
                            bgColor={Colors.red.hexadecimal}
                            textColor={Colors.white.hexadecimal}
                            text={"Alterar dados do usuario"}
                            onClick={() => changeCandidateData()}
                        />
                        <Button 
                            bgColor={Colors.matteBlack.hexadecimal}
                            textColor={Colors.white.hexadecimal}
                            text={`Excluir usuário ${changeData.idAluno}`}
                            onClick={() => deleteCandidate()}
                        />
                    </form>
                </div>
            </Modal>
        </div>
    )

    return (
        <div className={stylesCss.root}
            onLoad={() => functionAfterTime(2000, () => setShowLoadingIcon(false))}>
            <LoadingPage visible={showLoadingIcon} />
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
                        setChangeData({ email: row.email, telefone: row.telefone, idAluno: row.idAluno })
                    }}
                />
            </div>
            {showModal && contentModalForChanges}
            <ReactToast
                status={toastProps.status}
                textToast={toastProps.text}
                visible={toastProps.visible}
            />
            <Footer />
        </div>
    )
}
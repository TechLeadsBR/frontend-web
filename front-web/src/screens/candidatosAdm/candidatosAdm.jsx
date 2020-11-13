import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import ReactToast from './../../components/reactToast/reactToast'
import stylesCss from './candidatosAdm.module.css'
import { formatData, functionAfterTime } from './../../services/functions'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { messageToast } from './../../services/functions'
import { studentActions } from './../../actions'

const columnsTable = ["ID", "Nome", "Email", "RG", "Data Nascimento", "Telefone", "Genero"]

export default function CandidatosAdm() {

    const [showModal, setShowModal] = useState(false)
    const [dataCandidatosArray, setCandidatosArray] = useState([])
    const [rowSelectedForChanges, setRowSelectedForChanges] = useState({})
    const [changeData, setChangeData] = useState({
        email: null,
        telefone: null,
        idAluno: null
    })

    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

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

    //#region Requests API
    const getCandidatesInDataBase = useCallback(async () => {
        studentActions.getAllStudents()
            .then((request) => createObjectForDataTable(request.data))
            .catch(() => messageToast("Ocorreu um erro ao carregar os dados", "error"))
    }, [])

    const changeCandidateData = useCallback(async () => {
        studentActions.putStudent(() => {
            messageToast("Dados do candidato alterado com sucesso", "success")
            setShowModal(false)
        }, error => {
            if (error){
                messageToast("Ocorreu um erro ao atualizar os dados do candidato", "error")
            }
        }, { data: changeData, id: rowSelectedForChanges.idAluno })
    }, [changeData, rowSelectedForChanges.idAluno])

    const deleteCandidate = useCallback(async () => {
        studentActions.deleteStudent(() => {
            messageToast("Usuário deletado com sucuesso!", "success")
            functionAfterTime(1500, () => setShowModal(false))
        }, error => {
            if (error) {
                messageToast("Impossível excluir registro no momento", "error") 
            }
        }, { id: changeData.idAluno })
    }, [changeData.idAluno])
    //#endregion

    useEffect(() => {
        getCandidatesInDataBase()
    }, [getCandidatesInDataBase])

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
                            text={"Alterar dados do usuario"}
                            onClick={() => changeCandidateData()}
                        />
                        <Button
                            bgColor={"black"}
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
            <ReactToast />
            <Footer />
        </div>
    )
}

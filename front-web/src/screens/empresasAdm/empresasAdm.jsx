import React, { useEffect, useState } from 'react'
import stylesCss from './empresasAdm.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import { requestAPI } from './../../services/api'
import ReactToast from './../../components/reactToast/reactToast'
import { Colors } from './../../services/constants/constants'
import { functionAfterTime } from './../../services/functions'

const companyColumnsTable = ["ID", "RazaoSocial", "Email", "Cnpj", "Telefone", "Telefone 2"]

export default function EmpresasAdm() {

    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })
    const [companys, setCompanys] = useState([])
    const [showModalEditCompany, setShowModalEditCompany] = useState(true)
    const [changeDataCompany, setChangeDataCompany] = useState({
        email: null, telefone: null, telefoneDois: null, razaoSocial: null, idEmpresa: null
    })

    const toastAfterRequest = (text, status) => {
        setToastProps({ visible: true, text, status })
        setToastProps({ visible: false, text: null, status: null })
    }

    const createObjectForCompanysArray = (data) => {
        const companys = data.map((company) => {
            return {
                idEmpresa: company.idEmpresa,
                razaoSocial: company.razaoSocial,
                email: company.email,
                cnpj: company.cnpj,
                telefone: company.telefone,
                telefoneDois: company.telefoneDois
            }
        })

        setCompanys(companys)
    }

    //#region Request API
    const updateCompanyData = async () => {
        try {
            const { email, telefone, telefoneDois } = changeDataCompany
            const bodyRequestPut = {
                email,
                telefone,
                telefoneDois
            }
            const request = await requestAPI("put", `/empresa/${changeDataCompany.idEmpresa}`, bodyRequestPut)
            if(request.status === 200) {
                toastAfterRequest("Empresa atualizada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalEditCompany(false))
            }
        } catch(error){
            toastAfterRequest("Erro ao atualizar empresa!", "error")
        }
    }

    const getCompanys = async () => {
        try {
            const request = await requestAPI("get", "/empresa")
            if (request.status === 200) {
                createObjectForCompanysArray(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCompany = async () => {
        try {
            const request = await requestAPI("delete", `/empresa/${changeDataCompany.idEmpresa}`)
            if(request.status === 200) {
                toastAfterRequest("Empresa deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalEditCompany(false))
            }
        } catch (error) {
            toastAfterRequest("Erro ao deletedar empresa!")
        }
    }
    //#endregion

    useEffect(() => {
        if (companys.length === 0) getCompanys()
    }, [])


    const modalForEditCompany = (
        <div className={stylesCss.modalForEditCompany}>
            <Modal styleProps={{ width: "50%" }}>
                <div className={stylesCss.contentModalForEditCompany}>
                    <p onClick={() => setShowModalEditCompany(false)}>X</p>
                    <h2>Editar: {changeDataCompany.razaoSocial}</h2>
                    <form>
                        <Input
                            labelText={"Email"}
                            name={"emailCompany"}
                            type={"email"}
                            onChange={(event) => setChangeDataCompany({
                                ...changeDataCompany,
                                email: event.target.value
                            })}
                            currentValue={changeDataCompany.email}
                        />
                        <Input
                            labelText={"Telefone"}
                            name={"telefoneCompany"}
                            type={"number"}
                            onChange={(event) => setChangeDataCompany({ 
                                ...changeDataCompany,
                                telefone: event.target.value
                            })}
                            currentValue={changeDataCompany.telefone}
                        />
                        <Input
                            labelText={"Telefone Dois"}
                            name={"telefoneDoisCompany"}
                            type={"number"}
                            onChange={(event) => setChangeDataCompany({
                                ...changeDataCompany,
                                telefoneDois: event.target.value
                            })}
                            currentValue={changeDataCompany.telefoneDois}
                        />
                        <div className={stylesCss.divButton}>
                            <Button 
                                bgColor={Colors.red.hexadecimal}
                                textColor={Colors.white.hexadecimal}
                                text={"Alterador dados da empresa"}
                                onClick={() => updateCompanyData()}
                            />
                            <Button 
                                bgColor={Colors.matteBlack.hexadecimal}
                                textColor={Colors.white.hexadecimal}
                                text={"Deletar empresa"}
                                onClick={() => deleteCompany()}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )

    return (
        <div className={stylesCss.root}>
            <Header typeHeader={"administrator"} />
            <div className={stylesCss.content}>
                <Table
                    action={true}
                    title={"Empresas cadastradas"}
                    columnsTable={companyColumnsTable}
                    dataTable={companys}
                    callbackAction={value => setShowModalEditCompany(value)}
                    rowSelected={(row) => {
                        setChangeDataCompany(row)
                    }}
                />
            </div>
            {showModalEditCompany && modalForEditCompany}
            <ReactToast 
                textToast={toastProps.text}
                status={toastProps.status}
                visible={toastProps.visible}
            />
            <Footer />
        </div>
    )
}

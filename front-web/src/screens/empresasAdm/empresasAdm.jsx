import React, { useEffect, useState } from 'react'
import stylesCss from './empresasAdm.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import { requestAPI } from './../../services/api'

const companyColumnsTable = ["ID", "RazaoSocial", "Email", "Cnpj", "Telefone", "Telefone 2"]

export default function EmpresasAdm() {

    const [companys, setCompanys] = useState([])
    const [showModalEditCompany, setShowModalEditCompany] = useState(false)
    const [changeDataCompany, setChangeDataCompany] = useState({
        email: null, telefone: null, telefoneDois: null, razaoSocial: null
    })

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
                    </form>
                </div>
            </Modal>
        </div>
    )

    return (
        <div>
            <Header typeHeader={"administrator"} />
            <div>
                <Table
                    action={true}
                    title={"Empresas cadastradas"}
                    columnsTable={companyColumnsTable}
                    dataTable={companys}
                    callbackAction={value => setShowModalEditCompany(value)}
                    rowSelected={(row) => {
                        setChangeDataCompany({
                            email: row.email,
                            telefone: row.telefone,
                            telefoneDois: row.telefoneDois,
                            razaoSocial: row.razaoSocial
                        })
                    }}
                />
            </div>
            {showModalEditCompany && modalForEditCompany}
            <Footer />
        </div>
    )
}

import React, { useState } from 'react'
import stylesCss from './table.module.css'
import iconPenAction from './../../assets/images/icons/pen.png'

export default function Table({
    columnsTable,
    dataTable,
    action = false,
    callbackAction,
    title,
    rowSelected
}) {

    const [initQuota, setInitQuota] = useState([0, 5])

    React.useEffect(() => {
        console.log(initQuota)
    }, [initQuota])

    const actionColumn = {
        element: action && <th>Ação</th>,
        imgIcon: (dataRow) => action && (
            <td>
                <img
                    className={stylesCss.iconPenActionStyle}
                    src={iconPenAction}
                    alt={"Icon pen action"}
                    onClick={() => {
                        if (callbackAction) callbackAction(true)
                        if (rowSelected) rowSelected(dataRow)
                    }}
                />
            </td>
        )
    }

    const headTable = (
        columnsTable && (
            <thead className={stylesCss}>
                <tr>
                    {actionColumn.element}
                    {columnsTable.map((column, index) => <th key={index}>{column}</th>)}
                </tr>
            </thead>
        )
    )
    
    const bodyTable = (
        dataTable && (
            <tbody className={stylesCss}>
                {dataTable.slice(initQuota[0], initQuota[1]).map((d, i) => {
                    return (
                        <tr key={i}>
                            {actionColumn.imgIcon(d)}
                            {Object.values(d).map((v, i) => <td key={i}>{v}</td>)}
                        </tr>
                    )
                })}
            </tbody>
        )
    )

    const footerTable = (
        <tfoot className={stylesCss.tFootTable}>
            <tr>
                <td onClick={() => {
                    if (initQuota[1] > 5) {
                        setInitQuota(i => {
                            return [
                                i[0],
                                i[1] - 1
                            ]
                        })
                    }
                }}>Antetior</td>
                <td onClick={() => {
                    if (dataTable.length > 5) {
                        setInitQuota(i => {
                            return [
                                i[0],
                                i[1] + 1
                            ]
                        })
                    }
                }}>Próximo</td>
            </tr>
        </tfoot>
    )

    return (
        <div className={stylesCss.root}>
            <h2>{title}</h2>
            <table className={stylesCss.table}>
                {headTable}
                {bodyTable}
                {footerTable}        
            </table>
        </div>
    )
}

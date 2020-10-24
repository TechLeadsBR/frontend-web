import React from 'react'
import stylesCss from './table.module.css'
import iconPenAction from './../../assets/images/icons/pen.png'

export default function Table({ 
    columnsTable, 
    dataTable, 
    action = false, 
    callbackAction,
    title
}) {

    const actionColumn = {
        element: action && <th>Ação</th>,
        imgIcon: (rowData) => action && <td>
            <img
                className={stylesCss.iconPenActionStyle}
                src={iconPenAction}
                alt={"Icon pen action"}
                onClick={() => {
                    if(callbackAction) callbackAction(true)
                    console.log(rowData)
                }}
            />
        </td>
    }

    const headTable = (
        columnsTable && (
            <thead className={stylesCss.theadTable}>
                <tr>
                    {actionColumn.element}
                    {columnsTable.map((column, index) => <th key={index}>{column}</th>)}
                </tr>
            </thead>
        )
    )

    const bodyTable = (
        dataTable && (
            <tbody className={stylesCss.tbodyTable}>
                {dataTable.map((d, i) => {
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

    return (
        <div className={stylesCss.root}>
            <h2>{title}</h2>
            <table className={stylesCss.table}>
                {headTable}
                {bodyTable}
            </table>
        </div>
    )
}
import React from 'react'

export default function Input(props){
    return <input placeholder={props.placeHolder}  alt={props.alt} type={props.type} onClick={props.onClick} onChange={props.onChange} />
}
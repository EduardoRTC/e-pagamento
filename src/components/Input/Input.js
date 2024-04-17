import React from 'react'
import Label from '../Label/Label'

export default function Input({ nome, tipo, onChange,desativado = false }) {
    const handleChange = (e) => {
        onChange(e);
    };
    return (
        <>
            <Label>{nome}</Label>
            <input type={tipo} name={nome} placeholder={`${nome} do funcionário`} className="form-control w-50 rounded-pill border-primary " onChange={handleChange} required={true} disabled={desativado} />
        </>

    )
}

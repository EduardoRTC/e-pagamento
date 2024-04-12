import React, { useState } from 'react';
import Label from '../Label/Label';

export default function Select({ nome, opcoes, onChange }) {
    const [valorSelecionado, setValorSelecionado] = useState('');

    const mudanca = (e) => {
        onChange(e);
    };

    const handleChange = (event) => {
        setValorSelecionado(event.target.value);
    };

    return (
        <>
            <Label>{nome}</Label>
            <select name={nome} className='form-control w-50 rounded-pill border-primary' value={valorSelecionado} onChange={handleChange}>
                <option disabled value="">Selecione uma opção</option>
                {
                    opcoes.map((opcao, index) => (
                        <option key={index} value={opcao}>{opcao}</option>
                    ))
                }
            </select>
        </>
    );
}
import React, { useState } from 'react';
import Label from '../Label/Label';

export default function Select({ nome, opcoes, onChange,desativado = false  }) {
    const [valorSelecionado, setValorSelecionado] = useState('');

    const handleChange = (event) => {
        setValorSelecionado(event.target.value);
        onChange(event);
    };

    return (
        <>
            <Label>{nome}</Label>
            <select name={nome} className='form-control w-50 rounded-pill border-primary' value={valorSelecionado} onChange={handleChange} disabled={desativado}>
                <option disabled value="">Selecione uma opção</option>
                {
                    opcoes.map((opcao, index) => (
                        <option key={index} value={opcao.value}>{opcao.label}</option>
                    ))
                }
            </select>
        </>
    );
}
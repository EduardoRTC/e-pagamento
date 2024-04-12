import React, { useEffect, useState } from 'react'
import './Form.css'
import Input from '../Input/Input'
import Select from '../Select/Select'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Form() {

    let navegar = useNavigate()

    const [funcionario, setFuncionario] = useState({
        ativo: true,
        Nome: "",
        sexo: "",
        salarioMaternidade: 0,
        cpf: "",
        Cargo: "",
        salarioBruto: 0,
        commisionado: false,
        tipoDeContrato: "",
        salarioFamilia: false,
        numeroQuotas: "",
        valeTransporte: false,
        contribuicaoSindical: false,
        jornadaTrabalho: "",
        insalubridade: "",
        adicionalPericulosidade: false,
        auxilioCreche: false,
    });

    const {
        Nome,
        sexo,
        salarioMaternidade,
        cpf,
        Cargo,
        salarioBruto,
        commisionado,
        tipoDeContrato,
        salarioFamilia,
        numeroQuotas,
        valeTransporte,
        contribuicaoSindical,
        jornadaTrabalho,
        insalubridade,
        adicionalPericulosidade,
        auxilioCreche
    } = funcionario;

    const AomudarInput = (e) => {
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
        console.log(e.target.value)
    };

    useEffect(() => {
        console.log(funcionario.Cargo);
    }, [funcionario.Cargo]);


    const Aosubmeter = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3500/api", funcionario);
        navegar("/");
    };

    return (
        <form className='form'>
            <Input nome='Nome' tipo='text' onChange={(e) => AomudarInput(e)} />
            <Select nome="Sexo" opcoes={["M", "F"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Salário maternidade" opcoes={["Sim", "Não"]} onChange={(e) => AomudarInput(e)} />
            <Input nome="CPF" tipo="number" onChange={(e) => AomudarInput(e)} />
            <Input nome="Cargo" tipo="text" onChange={(e) => AomudarInput(e)} />
            <Input nome="Salário Bruto" tipo="number" onChange={(e) => AomudarInput(e)} />
            <Select nome="Comissionado" opcoes={["Sim", "Não"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Tipo de Contrato" opcoes={['CLT', 'PJ', 'ESTAGIO']} onChange={(e) => AomudarInput(e)} />
            <Select nome="Salario Familia" opcoes={['Sim', "Não"]} onChange={(e) => AomudarInput(e)} />
            <Input nome="Numero quotas" tipo="number" onChange={(e) => AomudarInput(e)} />
            <Select nome="Vale Transporte" opcoes={['Sim', "Não"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Contribuição Sindical" opcoes={["Sim", "Não"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Jornada de Trabalho" opcoes={["Padrão", "Noturno"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Insalubridade" opcoes={["Mínimo", "Médio", "Máximo"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Adicional de Periculosidade" opcoes={["Sim", "Não"]} onChange={(e) => AomudarInput(e)} />
            <Select nome="Auxílo creche" opcoes={["Sim", "Não"]} onChange={(e) => AomudarInput(e)} />
        </form>
    )
}


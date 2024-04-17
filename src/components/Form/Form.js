import React, { useEffect, useState } from 'react'
import './Form.css'
import Input from '../Input/Input'
import Select from '../Select/Select'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Form() {

    let navegar = useNavigate()

    const [funcionario, setFuncionario] = useState({
        Ativo: true,
        nome: "",
        sexo: "",
        nasc: "",
        salarioMaternidade: false,
        cpf: "",
        cargo: "",
        salario: 0,
        comissionado: false,
        tipoContrato: "",
        numeroFilhos: 0,
        SalarioFamilia: false,
        valeTransporte: false,
        contribuicaoSindical: false,
        jornadaTrabalho: "",
        insalubridade: "",
        adicionalPericulosidade: false,
        auxilioCreche: false,
    });

    const {
        ativo,
        nome,
        sexo,
        nasc,
        salarioMaternidade,
        cpf,
        cargo,
        salario,
        comissionado,
        tipoContrato,
        numeroFilhos,
        SalarioFamilia,
        valeTransporte,
        ContribuicaoSindical,
        jornadaTrabalho,
        insalubridade,
        adicionalPericulosidade,
        auxilioCreche
    } = funcionario;

    const AomudarInput = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFuncionario({ ...funcionario, [e.target.name]: value });
        console.log(value);
    };


    useEffect(() => {
        console.log(funcionario.Cargo);
    }, [funcionario.Cargo]);


    const Aosubmeter = async (e) => {
        e.preventDefault();
        console.log(funcionario);
        await axios.post("http://localhost:3500/api", funcionario);
        navegar("/");
    };

    return (
        <form className='form' onSubmit={(e) => Aosubmeter(e)} >
            <Input nome='nome' tipo='text' onChange={(e) => AomudarInput(e)} />
            <Select nome="sexo" opcoes={[{ label: "Masculino", value: "M" }, { label: "Feminino", value: "F" }]} onChange={(e) => AomudarInput(e)} />
            <label htmlFor='nasc'>Data de nascimento</label>
            <input name="nasc" type='date' onChange={(e) => AomudarInput(e)} className="form-control w-50 rounded-pill border-primary " />
            <Select nome="salarioMaternidade" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} desativado={funcionario.sexo === "F" ? false : true} />
            <Input nome="cpf" tipo="text" onChange={(e) => AomudarInput(e)} />
            <Input nome="cargo" tipo="text" onChange={(e) => AomudarInput(e)} />
            <Input nome="salario" tipo="number" onChange={(e) => AomudarInput(e)} />
            <Select nome="comissionado" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="tipoContrato" opcoes={[{ label: "CLT", value: "CLT" }, { label: "Pessoa Jurídica", value: "PJ" }, { label: "Estágio", value: "ESTAGIO" }]} onChange={(e) => AomudarInput(e)} />
            <Input nome="numeroFilhos" tipo="number" onChange={(e) => AomudarInput(e)} />
            <Select nome="salarioFamilia" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="valeTransporte" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="contribuicaoSindical" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="jornadaTrabalho" opcoes={[{ label: "Integral", value: "TEMPO_INTEGRAL" }, { label: "Meio Periodo", value: "MEIO_PERIODO" }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="insalubridade" opcoes={[{ label: "Mínimo", value: "MINIMO" }, { label: "Médio", value: "MEDIO" }, { label: "Máximo", value: "MAXIMO" }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="adicionalPericulosidade" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} />
            <Select nome="auxilioCreche" opcoes={[{ label: "Sim", value: true }, { label: "Não", value: false }]} onChange={(e) => AomudarInput(e)} />

            <button type="submit" className="btn btn-outline-primary">
                Adicionar
            </button>
        </form>
    )

}


import React, { useEffect, useState } from 'react'
import CabecalhoAdicionar from '../components/CabecalhoAdicionar/CabecalhoAdicionar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import "./HoleritePagina.css"

export default function HoleritePagina() {
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


    const { index } = useParams();
    console.log(index);

    useEffect(() => {
        carregaFuncionario()
    }, [])

    const carregaFuncionario = async () => {
        const resultado = await axios.get(`http://localhost:3500/api/index/${index}`);
        setFuncionario(resultado.data);
    }
    function calcularfgts(salario) {
        let descontofgts;
        descontofgts = (salario * 8) / 100

        return descontofgts
    }

    function calcularINSS(salario) {
        let descontoINSS;

        if (salario <= 1751.81) {
            descontoINSS = salario * 0.08;
        } else if (salario <= 2919.72) {
            descontoINSS = salario * 0.09;
        } else if (salario <= 5839.45) {
            descontoINSS = salario * 0.11;
        } else {
            descontoINSS = 642.34;
        }

        return descontoINSS;
    }

    function calcularIRRF(salario) {
        let descontoIRRF;

        if (salario <= 1903.98) {
            descontoIRRF = 0;
        } else if (salario <= 2826.65) {
            descontoIRRF = ((salario - 1903.98) * 0.075).toFixed(2);
        } else if (salario <= 3751.05) {
            descontoIRRF = ((salario - 1903.98) * 0.15 - 142.80).toFixed(2);
        } else if (salario <= 4664.68) {
            descontoIRRF = ((salario - 1903.98) * 0.225 - 354.80).toFixed(2);
        } else {
            descontoIRRF = ((salario - 1903.98) * 0.275 - 636.13).toFixed(2);
        }

        return descontoIRRF;
    }

    function calcularDescontoVT(salario, valeTransporte) {
        if (valeTransporte) {
            const descontoMaximo = salario * 0.06;
            return descontoMaximo;
        }
        else {
            return 0
        }
    }

    function calcularDescontoValeAlimentacao(salario, percentualMaximo,) {
        let descontoMaximo = salario * 0.20;

        const deducaoIRRF = salario * 0.04;
        descontoMaximo -= deducaoIRRF;

        return descontoMaximo;
    }

    function calcularTotalDescontos(descontoINSS, descontoIRRF, descontoVT, descontoValeAlimentacao) {
        let totalDescontos = parseFloat(descontoINSS) + parseFloat(descontoIRRF) + parseFloat(descontoVT) + parseFloat(descontoValeAlimentacao);
        totalDescontos = totalDescontos.toFixed(2);
        return totalDescontos;
    }

    function calcularContribuicaoSindical() {
        if (funcionario.contribuicaoSindical) {
            const valorContribuicao = 50.00;
            return valorContribuicao;
        }
        else {
            return 0
        }
    }

    function calcularInsalubridade(insalubridade, salario) {
        let bonus = 0;
        let bonusValor = 0;
        if (insalubridade === "MINIMO") {
            bonus = 10;
        } else if (insalubridade === "MEDIO") {
            bonus = 20;
        } else if (insalubridade === "MAXIMO") {
            bonus = 40;
        }
        bonusValor = (salario * bonus) / 100
        return bonusValor
    }

    function calculaLiquido(salario) {
        let descontos = calcularTotalDescontos(calcularINSS(funcionario.salario), calcularIRRF(funcionario.salario), calcularDescontoVT(funcionario.salario), calcularDescontoValeAlimentacao(funcionario.salario))
        let liquido = salario - descontos
        liquido += calcularInsalubridade(funcionario.insalubridade, salario)
        liquido += calcularAdicionalPericulosidade(funcionario.adicionalPericulosidade)
        return liquido
    }

    function calcularAdicionalPericulosidade(salario,periculosidade) {
        const adicional = periculosidade ? 40 : 0;
        let valor = (salario * adicional ) / 100
        return valor;
    }


    return (

        <>
            <CabecalhoAdicionar />
            <div>
                <h1>Holerite</h1>
                <h2>{funcionario.nome}</h2>
                <table>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                    <tr>
                        <td>Salário Bruto</td>
                        <td>{`R$ ${funcionario.salario}`}</td>
                    </tr>
                    <tr>
                        <td>FGTS</td>
                        <td>{`R$ ${calcularfgts(funcionario.salario)}`}</td>
                    </tr>
                    <tr>
                        <td>INSS</td>
                        <td>{`R$ ${calcularINSS()}`}</td>
                    </tr>
                    <tr>
                        <td>IRRF</td>
                        <td>{`R$ ${calcularIRRF(funcionario.salario)}`}</td>
                    </tr>
                    <tr>
                        <td>Vale-Transporte</td>
                        <td>{`R$ ${calcularDescontoVT(funcionario.salario)}`}</td>
                    </tr>
                    <tr>
                        <td>Vale-Alimentação</td>
                        <td>{`R$ ${calcularDescontoValeAlimentacao(funcionario.salario)}`}</td>
                    </tr>
                    <tr>
                        <td>Contribuicao Sindical</td>
                        <td>{`R$ ${calcularContribuicaoSindical()}`}</td>
                    </tr>
                    <tr>
                        <td>Bonus insalubridade</td>
                        <td>{`R$ ${calcularInsalubridade(funcionario.insalubridade, funcionario.salario)}`}</td>
                    </tr>
                    <tr>
                        <td>Adicional periculosidade</td>
                        <td>{`R$ ${calcularAdicionalPericulosidade(funcionario.salario,funcionario.adicionalPericulosidade)}`}</td>
                    </tr>
                    <tr>
                        <td>Total de Descontos</td>
                        <td>{`R$ ${calcularTotalDescontos(calcularINSS(funcionario.salario), calcularIRRF(funcionario.salario), calcularDescontoVT(funcionario.salario), calcularDescontoValeAlimentacao(funcionario.salario), calcularContribuicaoSindical(funcionario.salario))}`}</td>
                    </tr>
                    <tr>
                        <td>Salário Líquido</td>
                        <td>{`R$ ${(calculaLiquido(funcionario.salario).toFixed(2))}`}</td>
                    </tr>
                </table>
                <Link to={"/"} className='btn btn-primary'>Voltar</Link>
            </div>
        </>
    )
}

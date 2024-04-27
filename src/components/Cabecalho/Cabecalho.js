import React from 'react'
import Botao from '../Botao/Botao'
import './Cabecalho.css'


export default function Cabecalho() {
    return (
        <header className="header">
            <p className="logo">E-pagamento</p>
            <div className="header-direita">
                <Botao >Pesquisar</Botao>
                <Botao >Adicionar</Botao>
            </div>
        </header>
    )
}

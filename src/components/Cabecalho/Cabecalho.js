import React from 'react'
import './Cabecalho.css'
import { Link } from 'react-router-dom'


export default function Cabecalho() {
    return (
        <header className="header">
            <p className="logo">E-pagamento</p>
            <div className="header-direita">
                <Link to={'/adicionafuncionario'} className='btn btn-primary'>Adicionar</Link>
            </div>
        </header>
    )
}

import React from 'react'
import CabecalhoAdicionar from '../components/CabecalhoAdicionar/CabecalhoAdicionar'
import Form from '../components/Form/Form'
import { Link } from 'react-router-dom'
import "./AdicionaFuncionario.css"

export default function AdicionaFuncionario() {
  return (
    <>
      <CabecalhoAdicionar />
      <Form />
      <Link to={'/'} className='btn btn-primary'>Cancelar</Link>

    </>
  )
}

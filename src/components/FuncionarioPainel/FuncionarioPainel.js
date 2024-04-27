import React from 'react'
import './FuncionarioPainel.css'

export default function FuncionarioPainel() {
    return (
        <div className='container'>
            <div className='py-4'>
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nome</th>
                            <th scope= 'col'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row' className='col-sm-1'>1</th>
                            <td className='Funcionario_nome'>Eduardo Rocha Toledo Carvalho</td>
                            <td className='col-md-3 .offset-md-5'>
                                <button className='btn btn-primary mx-10'>editar</button>
                                <button className='btn btn-danger mx-1'>remover</button>
                                <button className='btn btn-outline-primary mx-0,5'>Holerite</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}


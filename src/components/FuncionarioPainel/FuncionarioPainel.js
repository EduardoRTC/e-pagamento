import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function FuncionarioPainel() {


    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        carregaUsuarios();
    }, [])

    const carregaUsuarios = async () => {
        const resultado = await axios.get("http://localhost:3500/api")
        setUsuarios(resultado.data)
    }

    const desabilitaFuncionario = async (index) => {
        const resultado = await axios.put(`http://localhost:3500/api/status/${index}?novoStatus=false`);
        carregaUsuarios();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className='table border shadow'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((usuario, index) => {
                                if (usuario.ativo !== false) {
                                    return (
                                        <tr key={index}>
                                            <th scope='row' className='col-sm-1'>{usuario.index}</th>
                                            <td className='Funcionario_nome'>{usuario.nome}</td>
                                            <td className='col-md-3 .offset-md-5'>
                                                <Link className='btn btn-primary mx-10'>editar</Link>
                                                <button className='btn btn-danger mx-1' onClick={() => desabilitaFuncionario(usuario.index)}>Desabilitar</button>
                                                <button className='btn btn-outline-primary mx-0,5'>Holerite</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}


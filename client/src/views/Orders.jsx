import { useEffect, useState } from 'react'
import { isAuthorized, limpiarTodos } from '../utils/auth'
import { generarPDF } from '../utils/pdfGenerator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Orders = () => {
    const navegar = useNavigate()
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        if (!isAuthorized()) {
            navegar('/')
        }
        axios.get('/user/pedidos')
            .then(res => {
                setPedidos(res.data.pedidos)
            })
            .catch(err => {
                console.log(err)
                limpiarTodos(err.response);
            })
    }, [navegar])

    const handleAdd = (name, price) => {
        const index = pedidos.findIndex(pedido => pedido.name === name)
        const newPedidos = [...pedidos]
        newPedidos[index].cantidad += 1
        setPedidos(newPedidos)

        axios.put("/user/pedidos/add", { name, price })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRemove = (name, price) => {
        // Si la cantidad es 1, eliminar el producto
        const index = pedidos.findIndex(pedido => pedido.name === name)
        const newPedidos = [...pedidos]
        if (newPedidos[index].cantidad === 1) {
            newPedidos.splice(index, 1)
            setPedidos(newPedidos)
        } else {
            newPedidos[index].cantidad -= 1
            setPedidos(newPedidos)
        }

        axios.put("/user/pedidos/delete", { name, price })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            }
            )
    }

    const payOrder = () => {
        axios.get('/user/pedidos')
            .then(res => {
                setPedidos(res.data.pedidos)
                let user = JSON.parse(localStorage.getItem('user'))
                if (user) {
                    const data = {
                        productos: pedidos,
                        user: user
                    }
                    // Seteamos los pedidos
                    setPedidos([])
                    // Eliminamos los pedidos del usuario
                    axios.put('/user/pedidos/delete/all')
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                    // Colocar un sweet alert para preguntar si se quiere generar el pdf
                    Swal.fire({
                        title: 'Pago Exitoso',
                        text: "Se generará un PDF con los datos de su pedido",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Generar PDF'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            generarPDF(data)
                        }
                    })
                } else {
                    console.log('No hay usuario')
                }
            })
            .catch(err => {
                console.log(err)
            }
            )
    }

    return (
        <div className="container col-lg-9 col-xl-9 col-sm-10 col-xs-10">
            <div className="table-responsive-md mt-4 ">
                <table className="table table-hover table-bordered">
                    <thead className='table-warning '>
                        {/* Centrar los encabezados */}
                        <tr className='text-center'>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                        {pedidos.map((pedido, i) => (
                            <tr key={pedido.name} className='text-center'>
                                <td>{pedido.name}</td>
                                <td>{pedido.price}</td>
                                <td>{pedido.cantidad}</td>
                                <td>
                                    <button className='btn btn-success btn-sm mr-2' onClick={() => handleAdd(pedido.name, pedido.price)}>
                                        <i className='fa fa-plus'></i>
                                    </button>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleRemove(pedido.name, pedido.price)} >
                                        <i className='fa fa-minus'></i>
                                    </button>
                                </td>
                                <td>{pedido.cantidad * pedido.price}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='table-warning'>
                        <tr>
                            <td colSpan='4' className='text-right'>
                                <strong>Total</strong>
                            </td>
                            {pedidos.length > 0 ? (
                                <td className='text-center'>
                                    {pedidos
                                        .map((pedido) => pedido.cantidad * pedido.price)
                                        .reduce((a, b) => a + b)}
                                </td>
                            ) : (
                                <td className='text-center'>0</td>
                            )}
                        </tr>
                    </tfoot>
                </table>
            </div>
            {/* Si existen datos entonces ponemos un boton para pagar */}
            {pedidos.length > 0 && (
                <div className='text-center'>
                    <button className='btn btn-success' onClick={payOrder}>
                        Pagar
                    </button>
                </div>
            )}

        </div>
    )
}

export default Orders
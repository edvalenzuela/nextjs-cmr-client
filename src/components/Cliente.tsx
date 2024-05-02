import React, { FC } from 'react'
import Router from 'next/router';
import Swal from 'sweetalert2'
import { useMutation } from '@apollo/client';
import { ELIMINAR_CLIENTE, OBTENER_CLIENTES_USUARIO } from '@/gql';

import { ClienteVendedor } from '@/pages'

const Cliente:FC<ClienteVendedor> = ({id, nombre, apellido, empresa, email}) => {

  const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
    update(cache:any){
      //obtener una copia del objeto de cache
      const { obtenerClientesVendedor } = cache.readQuery({query: OBTENER_CLIENTES_USUARIO});

      //reescribir el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data:{
          obtenerClientesVendedor: obtenerClientesVendedor.filter((item:ClienteVendedor) => item.id !== id)
        }
      })
    }
  });

  const handleDeleteClient = () => {
    Swal.fire({
      title: `¿Deseas eliminar a ${nombre} ${apellido} ?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar"
    }).then(async(result) => {
      if (result.isConfirmed) {

        try {
         const { data } = await eliminarCliente({
          variables:{
            id
          }
         });
         Swal.fire({
           title: "Eliminado!",
           text: data?.eliminarCliente,
           icon: "success"
         });

        } catch (error) {
          console.log(error)
        }

      }
    });
  }

  const editClient = () => {
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2">{nombre} - {apellido}</td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          onClick={handleDeleteClient} 
          className="bg-red-800 px-2 py-4 w-full text-white rounded text-xs uppercase font-bold">
          Eliminar
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          onClick={editClient} 
          className="bg-green-800 px-2 py-4 w-full text-white rounded text-xs uppercase font-bold">
          Editar
        </button>
      </td>

    </tr>
  )
}

export default Cliente
import { FC } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import { ELIMINAR_PRODUCTO, OBTENER_PRODUCTOS } from '@/gql';
import { Productos } from '@/pages/productos';


const Producto:FC<Productos> = ({nombre, existencia, id, precio}) => {

  //mutation para eliminar productos
  const [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache:any){
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data:{
          obtenerProductos: obtenerProductos.filter((item:Productos) => item.id !== id)
        }
      })
    }
  })

  const handleDeleteProduct = () => {
    Swal.fire({
      title: `¿Deseas eliminar a ${nombre}?`,
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
          //eliminar producto de la bd
          const { data } = await eliminarProducto({
            variables:{
              id
            }
          })
          Swal.fire({
            title: "Correcto!",
            text: data?.eliminarProducto,
            icon: "success"
          });
        } catch (error) {
          console.log(error)
        }
      }
    });
  }

  const handleEditProduct = () => {
    Router.push({
      pathname: '/productos/editarproducto/[id]',
      query:{ id }
    })
  }

  return (
    <tr>
      <td className='border px-4 py-2'>{nombre}</td>
      <td className='border px-4 py-2'>{existencia} stock</td>
      <td className='border px-4 py-2'>${precio}</td>
      <td className='border px-4 py-2'>
        <button
          onClick={handleDeleteProduct} 
          className="bg-red-800 px-2 py-4 w-full text-white rounded text-xs uppercase font-bold">
          Eliminar
        </button>
      </td>
      <td className='border px-4 py-2'>
        <button
          onClick={handleEditProduct} 
          className="bg-green-800 px-2 py-4 w-full text-white rounded text-xs uppercase font-bold">
          Editar
        </button>
      </td>
    </tr>
  )
}

export default Producto
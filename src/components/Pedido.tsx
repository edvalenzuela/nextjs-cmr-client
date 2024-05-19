import { FC, useState, useEffect, ChangeEvent } from 'react'
import { useMutation } from '@apollo/client';
import { ACTUALIZAR_PEDIDO, ELIMINAR_PEDIDO, OBTENER_PEDIDOS_CACHE } from '@/gql';

import { PedidosVendedor } from '@/pages/pedidos'
import Swal from 'sweetalert2';

interface PedidoProps{
  item: PedidosVendedor;
}

const Pedido:FC<PedidoProps> = ({item}) => {
  const { id, total, cliente:{ nombre, apellido, telefono, email }, estado, pedido } = item;

  //mutation para cambiar el estado de un pedido
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
  const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
    update(cache:any){
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: OBTENER_PEDIDOS_CACHE
      });
      cache.writeQuery({
        query: OBTENER_PEDIDOS_CACHE,
        data:{
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter((pedido:any) => pedido.id !== id)
        }
      })
    }
  });
  
  const [estadoPedido, setEstadoPedido] = useState(estado);
  const [clase, setClase] = useState('');

  const clasePedido = () => {
    if(estadoPedido === 'PENDIENTE'){
      setClase('border-yellow-500')
    }else if(estadoPedido === 'COMPLETADO'){
      setClase('border-green-500')
    }else setClase('border-red-800')
  }

  useEffect(() => {
    if(estadoPedido){
      setEstadoPedido(estadoPedido)
    }
    clasePedido();
  }, [estadoPedido])

  const cambiarEstadoPedido = async (e:ChangeEvent<HTMLSelectElement>) => {
    let estado = (e.target as HTMLSelectElement).value;

    try {
      const { data } = await actualizarPedido({
        variables: {
          id,
          input:{
            estado,
            cliente: item.cliente.id
          }
        }
      });
      setEstadoPedido(data.actualizarPedido.estado);
    } catch (error) {
      console.log(error)
    }
  }

  const confirmarEliminarPedido = () => {
    Swal.fire({
      title: "¿Deseas eliminar a este pedido ?",
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
         const { data } = await eliminarPedido({
          variables:{
            eliminarPedidoId: id
          }
         });

         Swal.fire({
           title: "Eliminado!",
           text: data?.eliminarPedido,
           icon: "success"
         });

        } catch (error) {
          console.log(error)
        }

      }
    });
  }
  
  return (
    <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow`}>
      <div>
        <p className='font-bold text-gray-800'>
          Cliente: { nombre } { apellido }
        </p>
        <p className='flex items-center my-2'>{email}</p>
        <p className='flex items-center my-2'>{telefono}</p>
        <h2 className='font-bold text-gray-800 mt-5'>
          Estado Pedido:
        </h2>
        <select className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold' 
          name="" id="" value={estadoPedido} onChange={cambiarEstadoPedido}>
            <option value="COMPLETADO">Completado</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CANCELADO">Cancelado</option>
        </select>
      </div>

      <div>
        <h2 className='text-gray-800'>Resumen del pedido</h2>
        {
          pedido.map( ({nombre, cantidad}) => (
            <div key={item.id} className='mt-4'>
              <p className='text-sm text-gray-600'>Producto: {nombre}</p>
              <p className='text-sm text-gray-600'>Cantidad: {cantidad}</p>
            </div>
          ))
        }
        <p className="text-gray-800 mt-3 font-bold">Total a pagar
          <span className='font-light'>${total}</span>
        </p>
        <button className='items-center mt-4 bg-red-800 px-5 py-2 inline-flex text-white rounded leading-tight uppercase text-xs'
          onClick={confirmarEliminarPedido}
        >
          Eliminar pedido
        </button>
      </div>
    </div>
  )
}

export default Pedido
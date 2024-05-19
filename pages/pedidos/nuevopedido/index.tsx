import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"

import PedidoContext from "@/context/PedidoContext"

import { NUEVO_PEDIDO, OBTENER_PEDIDOS } from "@/gql"

import { Layout } from "@/src/components"
import { AsignarCliente, AsignarProductos, ResumenPedido, Total } from '@/src/components/pedidos'
import Swal from "sweetalert2"

const NuevoPedido = () => {
  const [mensaje, setMensaje] = useState(null);
  const { cliente, productos, total } = useContext(PedidoContext);

  const router = useRouter();

  //mutation para crear un nuevo pedido
  const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO, {
    update(cache:any, { data: { nuevoPedido }}){
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: OBTENER_PEDIDOS
      });
      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
        }
      })
    }
  });

  const validarPedido = ():string => {
    if (!productos.every(item => item?.cantidad! > 0) || total === 0 || Object.keys(cliente).length === 0) {
      return 'opacity-50 cursor-not-allowed'
    }
    return '';
  }

  const crearNuevoPedido = async() => {
    //remover lo no deseado de productos
    const pedido = productos.map(({existencia, __typename, creado, ...producto}) => producto);

    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: cliente?.id,
            total,
            pedido
          }
        }
      })
      // redireccionar y mostrar alerta
      Swal.fire({
        title: 'Correcto',
        text: `El pedido de ${cliente.nombre} se registró correctamente`,
        icon: 'success'
      })
      router.push('/pedidos');
    } catch (e:any) {
      setMensaje(e.message.replace('ApolloError:', ''))
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  }

  const mostrarMensaje = () => (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{mensaje}</p>
    </div>
  )

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button 
            type="button" 
            onClick={() => crearNuevoPedido()}
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}>
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default NuevoPedido
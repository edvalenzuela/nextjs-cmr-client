import { useContext } from "react"
import PedidoContext from "@/context/PedidoContext"

import { Layout } from "@/src/components"
import { AsignarCliente, AsignarProductos, ResumenPedido, Total } from '@/src/components/pedidos'

const NuevoPedido = () => {

  const { cliente, productos, total } = useContext(PedidoContext);

  const validarPedido = ():string => {
    let result = '';
    if (!productos.every(item => item?.cantidad! > 0) || total === 0 || Object.keys(cliente).length === 0) {
      result = 'opacity-50 cursor-not-allowed'
    }
    return  result
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button 
            type="button" 
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}>
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default NuevoPedido

import { Layout } from "@/src/components"
import AsignarCliente from '@/src/components/pedidos/AsignarCliente'
import AsignarProductos from "@/src/components/pedidos/AsignarProductos"

const NuevoPedido = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <AsignarCliente />
      <AsignarProductos />
    </Layout>
  )
}

export default NuevoPedido
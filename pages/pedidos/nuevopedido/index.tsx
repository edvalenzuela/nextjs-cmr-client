
import { Layout } from "@/src/components"
import AsignarCliente from '@/src/components/pedidos/AsignarCliente'

const NuevoPedido = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

      <AsignarCliente />
    </Layout>
  )
}

export default NuevoPedido
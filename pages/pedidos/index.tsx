import Link from 'next/link'

import Layout from '@/src/components/Layout'

const Pedidos = () => {
  return (
    <Layout>
      <h2 className="text-2xl text-gray-800 font-light">Pedidos</h2>

      <Link href={'/pedidos/nuevopedido'} className="bg-blue-800 hover:bg-gray-800 text-white hover:text-gray-200 py-2 px-5 my-3 inline-block rounded text-sm uppercase font-bold">
        Nuevo pedido
      </Link>
    </Layout>
  )
}

export default Pedidos
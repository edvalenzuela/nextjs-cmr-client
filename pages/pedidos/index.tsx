import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { OBTENER_PEDIDOS } from '@/gql/pedidos/query';

import Pedido from '@/src/components/Pedido';
import Layout from '@/src/components/Layout'
import { InitialValues } from '../nuevoCliente';

interface Pedido{
  id: string;
  cantidad: number;
  nombre: string;
}

export interface PedidosVendedor{
  id: string;
  cliente: InitialValues;
  estado: string;
  pedido: Pedido[];
  total: number;
  vendedor: string;
}

interface ObtenerPedidosVendedor{
  obtenerPedidosVendedor: PedidosVendedor[];
}

const Pedidos = () => {
  const { data, loading } = useQuery<ObtenerPedidosVendedor>(OBTENER_PEDIDOS);
  
  if(loading) return;

  return (
    <Layout>
      <h2 className="text-2xl text-gray-800 font-light">Pedidos</h2>

      <Link href={'/pedidos/nuevopedido'} className="bg-blue-800 hover:bg-gray-800 text-white hover:text-gray-200 py-2 px-5 my-3 inline-block rounded text-sm uppercase font-bold">
        Nuevo pedido
      </Link>
      {
        data?.obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
        ) : (
          data?.obtenerPedidosVendedor.map(item => (
            <Pedido key={item.id} item={item} />
          ))
        )
      }
    </Layout>
  )
}

export default Pedidos
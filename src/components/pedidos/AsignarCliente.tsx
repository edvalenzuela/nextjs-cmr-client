import { useContext, useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import PedidoContext from '@/context/PedidoContext';

import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_USUARIO } from '@/gql';
import { ObtenerClientesVendedor } from '@/pages';

const AsignarCliente = () => {
  //context de pedidos
  const { agregarCliente } = useContext(PedidoContext);

  const [cliente, setCliente] = useState([] as any);

  const { data, loading } = useQuery<ObtenerClientesVendedor>(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
    agregarCliente(cliente)
  }, [cliente])

  const seleccionarCliente = (cliente: MultiValue<{id: number; nombre: string;}>):void => {
    setCliente(cliente);
  }

  //resultados de la consulta
  if(loading) return null

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un cliente al pedido</p>
      <Select
        className='mt-3'
        options={data?.obtenerClientesVendedor}
        isMulti={false}
        onChange={(op:any) => seleccionarCliente(op)}
        getOptionValue={op => op.id}
        getOptionLabel={op => op.nombre}
        placeholder='Seleccione el cliente'
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}

export default AsignarCliente
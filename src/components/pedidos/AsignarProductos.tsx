import { useContext, useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import PedidoContext from '@/context/PedidoContext';

import { useQuery } from '@apollo/client';
import { OBTENER_PRODUCTOS } from '@/gql';
import { ObtenerProductos, Productos } from '@/pages/productos';

const AsignarProductos = () => {
  
  const [productos, setProductos] = useState([] as any);
  
  const { agregarProducto } = useContext(PedidoContext);

  const { data, loading } = useQuery<ObtenerProductos>(OBTENER_PRODUCTOS);

  useEffect(() => {
    agregarProducto(productos)
  }, [productos])
  

  const seleccionarProducto = (producto:MultiValue<Productos>) => {
    setProductos(producto);
  }

  if(loading) return;

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Seleccionar o busca los productos</p>
      <Select
        className='mt-3'
        options={data?.obtenerProductos}
        isMulti
        onChange={seleccionarProducto}
        getOptionValue={op => op.id}
        getOptionLabel={op => `${op.nombre} - ${op.existencia} Disponibles`}
        placeholder='Busque o seleccione el producto'
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}

export default AsignarProductos
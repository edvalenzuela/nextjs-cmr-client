import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { Productos } from '@/pages/productos'
import PedidoContext from '@/context/PedidoContext';

interface ProductoResumenProps{
  producto: Productos
}

const ProductosResumen:FC<ProductoResumenProps> = ({producto}) => {
  const [cantidad, setCantidad] = useState<number | undefined>(0)

  const { nombre, precio } = producto;
  const { cantidadProductos, actualizarTotal } = useContext(PedidoContext);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCantidad(Number(e.target.value));
  }

  useEffect(() => {
    actualizarCantidad();
    actualizarTotal();
  }, [cantidad])

  const actualizarCantidad = () => {
    const nuevoProducto = {
      ...producto,
      cantidad
    }
    cantidadProductos(nuevoProducto);
  }

  return (
    <div className='md:flex md:justify-between md:items-center mt-5'>
      <div className='md:w-2/4 mb-2 md:mb-0'>
        <p className='text-sm'>{nombre}</p>
        <p>${precio}</p>
      </div>
      <input type="number" placeholder='cantidad' value={cantidad} onChange={handleOnChange}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4' 
      />
    </div>
  )
}

export default ProductosResumen
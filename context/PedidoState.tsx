import { useReducer } from "react";
import PedidoContext, { InitialStateProps } from "./PedidoContext";

import PedidoReducer from "./PedidoReducer";
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS, ACTUALIZAR_TOTAL } from '../types';

import { ClienteVendedor } from "@/pages";
import { Productos } from "@/pages/productos";

const initialState:InitialStateProps = {
  cliente: {} as ClienteVendedor,
  productos: [] as Productos[],
  total: 0,
  agregarCliente: (cliente:any) => {},
  agregarProducto: (producto:any) => {},
  actualizarTotal : () => {},
  cantidadProductos : (nuevoProducto:any) => {}
}

const PedidoState = ({children}: { children: React.ReactNode }) => {

  //state de pedidos
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //Modifica el cliente
  const agregarCliente = (cliente:ClienteVendedor) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  const agregarProducto = (productosSeleccionados:any) => {
    
    let nuevoState;
    if(state.productos.length > 0){
      //tomar del segundo arreglo, una copia para asignarlo al primero
      nuevoState = productosSeleccionados.map((producto:Productos) => {
        const nuevoObjeto = state.productos.find((productoState:Productos) => productoState.id === producto.id)
        return {...producto, ...nuevoObjeto};
      })
    }else{
      nuevoState = productosSeleccionados;
    }

    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoState
    })
  }

  //modifica las cantidades de los productos
  const cantidadProductos = (nuevoProducto:Productos) => {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto
    })
  }

  const actualizarTotal = () => {
    dispatch({
      type: ACTUALIZAR_TOTAL
    })
  }

  return(
    <PedidoContext.Provider
      value={{
        ...state,
        agregarCliente,
        agregarProducto,
        actualizarTotal,
        cantidadProductos,
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState;
import { useReducer } from "react";
import PedidoContext, { InitialStateProps } from "./PedidoContext";

import PedidoReducer from "./PedidoReducer";
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from '../types';

const initialState:InitialStateProps = {
  cliente: {},
  productos: [],
  total: 0,
  agregarCliente: (cliente:any) => {},
  agregarProducto: (producto:any) => {}
}

const PedidoState = ({children}: { children: React.ReactNode }) => {

  //state de pedidos
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //Modifica el cliente
  const agregarCliente = (cliente:any) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  const agregarProducto = (producto:any) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: producto
    })
  }

  return(
    <PedidoContext.Provider
      value={{
        ...state,
        agregarCliente,
        agregarProducto
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState;
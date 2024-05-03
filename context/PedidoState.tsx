import { useReducer } from "react";
import PedidoContext, { Cliente, InitialStateProps } from "./PedidoContext";

import PedidoReducer from "./PedidoReducer";
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from '../types';

const initialState:InitialStateProps = {
  cliente: {},
  productos: [],
  total: 0,
  agregarCliente: (cliente:Cliente) => {}
}

const PedidoState = ({children}: { children: React.ReactNode }) => {

  //state de pedidos
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //Modifica el cliente
  const agregarCliente = (cliente:Cliente) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente
    })
  }

  return(
    <PedidoContext.Provider
      value={{
        ...state,
        agregarCliente
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

export default PedidoState;
import { createContext } from "react";

export interface InitialStateProps{
  cliente: {};
  productos: [];
  total: number;
  agregarCliente: (cliente:any) => void;
  agregarProducto: (producto:any) => void;
}

const PedidoContext = createContext<InitialStateProps>({} as InitialStateProps);

export default PedidoContext;
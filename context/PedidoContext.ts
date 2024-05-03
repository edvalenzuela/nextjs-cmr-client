import { createContext } from "react";

export interface Cliente{
  id: number;
  nombre: string;
}

export interface InitialStateProps{
  cliente: Object;
  productos: Array<any>;
  total: number;
  agregarCliente: (cliente:Cliente) => void;
}

const PedidoContext = createContext<InitialStateProps>({} as InitialStateProps);

export default PedidoContext;
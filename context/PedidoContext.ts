import { createContext } from "react";
import { Productos } from "@/pages/productos";

export interface InitialStateProps{
  cliente: {};
  productos: Productos[];
  total: number;
  agregarCliente: (cliente:any) => void;
  agregarProducto: (producto:any) => void;
  actualizarTotal : () => void;
  cantidadProductos: (nuevoProducto:any) => void;
}

const PedidoContext = createContext<InitialStateProps>({} as InitialStateProps);

export default PedidoContext;
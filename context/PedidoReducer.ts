import { InitialStateProps } from './PedidoContext';
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS, ACTUALIZAR_TOTAL } from './../types';

interface Action {
  type: string;
  payload?: any;
}

export default (state:InitialStateProps, action:Action) => {
  switch(action.type){
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      }
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        productos: action.payload
      }
    case CANTIDAD_PRODUCTOS:
      return{
        ...state,
        productos: state.productos.map(item => item.id === action.payload.id ? item = action.payload : item)
      }
    case ACTUALIZAR_TOTAL:
      return{
        ...state,
        total: state.productos.reduce( (nuevoTotal:number, item) => nuevoTotal+= Number(item.precio) * Number(item.cantidad), 0)
      }
    default:
      return state
  }
}
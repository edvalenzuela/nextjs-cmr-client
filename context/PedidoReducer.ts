import { InitialStateProps } from './PedidoContext';
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS } from './../types';

interface Action {
  type: string;
  payload: any;
}

export default (state:InitialStateProps, action:Action) => {
  switch(action.type){
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      }
    default:
      return state
  }
}
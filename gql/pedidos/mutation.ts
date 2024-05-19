import { gql } from "@apollo/client";

export const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput){
  nuevoPedido(input: $input) {
    id
  }
}`;

export const ACTUALIZAR_PEDIDO = gql`
mutation actualizarPedido($id: ID!, $input: PedidoInput){
  actualizarPedido(id: $id, input: $input) {
    estado
  }
}`;

export const ELIMINAR_PEDIDO = gql`
mutation eliminarPedido($eliminarPedidoId: ID!){
  eliminarPedido(id: $eliminarPedidoId)
}`;
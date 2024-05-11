import { gql } from "@apollo/client";

export const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput){
  nuevoPedido(input: $input) {
    id
  }
}
`;
import { gql } from "@apollo/client";

export const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor{
    obtenerPedidosVendedor{
      id
      pedido {
        id
        cantidad
        nombre
      }
      cliente{
        id
        nombre
        apellido
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`;

export const OBTENER_PEDIDOS_CACHE = gql`
  query obtenerPedidosVendedor{
    obtenerPedidosVendedor{
      id
    }
  }
`;
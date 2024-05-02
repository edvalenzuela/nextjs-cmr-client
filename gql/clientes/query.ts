import { gql } from "@apollo/client";

export const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

export const OBTENER_CLIENTE_USUARIO = gql`  
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      empresa 
      email
      telefono
    }
  }
`;
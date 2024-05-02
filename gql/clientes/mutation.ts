import { gql } from "@apollo/client";

export const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput){
    nuevoCliente(input: $input) {
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

export const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!){
    eliminarCliente(id: $id)
  }
`;

export const ACTUALIZA_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput){
    actualizarCliente(id:$id, input: $input){
      nombre
      email
    }
  }
`;
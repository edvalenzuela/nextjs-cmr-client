import { gql } from "@apollo/client";

export const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!){
    eliminarProducto(id: $id)
  }
`;

export const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput){
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`;

export const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput){
    actualizarProducto(id: $id, input: $input) {
        id
        nombre
        existencia
        precio
    }
  }
`;
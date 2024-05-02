import { gql } from "@apollo/client";

export const OBTENER_PRODUCTOS = gql`
  query obtenerProductos{
    obtenerProductos {
      id
      nombre
      precio
      existencia
      creado
    }
  }
`;

export const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!){
    obtenerProducto(id: $id) {
      nombre
      precio
      existencia
    }
  }
`;
import { gql } from "@apollo/client";

export const MEJORES_VENDEDORES = gql`
query mejoresVendedores{
  mejoresVendedores {
    total
    vendedor {
      nombre
      apellido
      email
    }
  }
}`;

export const MEJORES_CLIENTES = gql`
query mejoresClientes{
  mejoresClientes {
    cliente {
      nombre
      apellido
      email
      empresa
    }
    total
  }
}`;
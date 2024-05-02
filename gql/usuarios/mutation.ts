import { gql } from "@apollo/client";

export const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput){
    nuevoUsuario(input: $input){
      id
      nombre
      apellido
      email
    }
  }
`;

export const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input:AutenticarInput){
    autenticarUsuario(input: $input) {
      token
    }
  }
`;
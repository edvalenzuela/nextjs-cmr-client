import Link from "next/link";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { OBTENER_CLIENTES_USUARIO } from "@/gql";

import Cliente from "@/src/components/Cliente";
import Layout from "@/src/components/Layout";

export interface ClienteVendedor{
  id: string;
  nombre: string;
  apellido: string;
  empresa:  string;
  email:  string;
}
export interface ObtenerClientesVendedor{
  obtenerClientesVendedor: ClienteVendedor[];
}

export default function Home() {

  //consulta de Apollo
  const { data, loading } = useQuery<ObtenerClientesVendedor>(OBTENER_CLIENTES_USUARIO);
  const router = useRouter();

  if(loading) return null;
  if(!data?.obtenerClientesVendedor) return router.push('/login');

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href={'/nuevoCliente'} className="bg-blue-800 hover:bg-gray-800 text-white hover:text-gray-200 py-2 px-5 my-3 inline-block rounded text-sm uppercase font-bold w-full lg:w-auto text-center">
          Nuevo cliente
        </Link>
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Empresa</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Eliminar</th>
                <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data && data?.obtenerClientesVendedor.map((item) => (
                <Cliente key={item.id} {...item} />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}

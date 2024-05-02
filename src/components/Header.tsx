import { useRouter } from 'next/router'
import { useQuery } from "@apollo/client"
import { OBTENER_USUARIO } from "@/gql"

interface Usuario{
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

interface ObtenerUsuario{
  obtenerUsuario: Usuario;
}

const Header = () => {
  const { data, loading } = useQuery<ObtenerUsuario>(OBTENER_USUARIO);
  const router = useRouter();

  //Proteger que no accedamos a data antes de tener resultados
  if(loading) return null

  //si no hay información
  if(!data?.obtenerUsuario) return router.push('/login')
  
  const { nombre, apellido } = data!.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className='flex justify-between mb-6'>
      {
        data && (
          <p className='mr-2'>Hola: {nombre} - {apellido}</p>
        )
      }
      <button 
        onClick={() => cerrarSesion()}
        type='button' 
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-sx rounded py-1 px-2 text-white shadow-md">Cerrar sesión</button>
    </div>
  )
}

export default Header
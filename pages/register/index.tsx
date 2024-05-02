import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/src/components/Layout';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useMutation } from '@apollo/client';
import ShowError from '@/src/components/ShowError';
import { NUEVA_CUENTA } from '@/gql';
import ShowMessage from '@/src/components/ShowMessage';

interface InitialValues{
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface Usuario{
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

interface NuevoUsuario{
  nuevoUsuario: Usuario;
}

const Register = () => {

  const router = useRouter();

  //state para el mensaje
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Mutation para crear nuevos usuarios
  const [ nuevoUsuario ] = useMutation<NuevoUsuario>(NUEVA_CUENTA);

  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
    password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe ser de al menos 6 caracteres')
  })

  //Validación del formulario
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik<InitialValues>({
    initialValues,
    validationSchema,
    onSubmit:async(values) => {
      
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              ...values
            }
          }
        });
        console.log(data)
        setMensaje(`Se creo correctamente el usuario: ${data?.nuevoUsuario.nombre}`);
        setTimeout(() => {
          setMensaje(null);
          router.push('./login')
        }, 3000);
      } catch (e:any) {
        setMensaje(e.message.replace('ApolloError:', ''))
        setTimeout(() => {
          setMensaje(null)
        }, 3000);
      }
    }
  });

  return (
    <>
      <Layout>
        <h1 className='text-center text-2xl text-white'>Crear nueva cuenta</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form onSubmit={handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <div className='mb-4'>
                <label htmlFor="nombre" className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
                <input 
                  type="text" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='nombre usuario'
                />
                {
                  touched.nombre && errors.nombre && (
                    <ShowError message={errors.nombre} />
                  )
                }
              </div>
              <div className='mb-4'>
                <label htmlFor="apellido" className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
                <input 
                  type="apellido" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='apellido'
                  value={values.apellido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Apellido usuario'
                />
                {
                  touched.apellido && errors.apellido && (
                    <ShowError message={errors.apellido} />
                  )
                }
              </div>
              <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                <input 
                  type="email" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='off'
                  placeholder='Email usuario'
                />
                {
                  touched.email && errors.email && (
                    <ShowError message={errors.email} />
                  )
                }
              </div>
              <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                <input 
                  type="password" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Password usuario'
                />
                {
                  touched.password && errors.password && (
                    <ShowError message={errors.password} />
                  )
                }
              </div>
              <input type="submit" className='bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer' value='Crear cuenta'/>
              <Link href='/login' className='mt-2 text-right block font-light text-sm'>Ya tienes una cuenta?</Link>
              {
                mensaje && <ShowMessage message={mensaje} />
              }
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Register
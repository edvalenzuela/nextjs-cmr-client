import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { AUTENTICAR_USUARIO } from '@/gql';

import Layout from '@/src/components/Layout';
import ShowError from '@/src/components/ShowError';
import ShowMessage from '@/src/components/ShowMessage';

interface InitialValues{
  email: string;
  password: string;
}

interface Token{
  token: string;
}

interface AutenticarUsuario {
  autenticarUsuario: Token;
}

const Login = () => {
  //state para el mensaje
  const [mensaje, setMensaje] = useState<string | null>(null);

  //mutation para crear nuevos usuarios en apollo
  const [ autenticarUsuario ] = useMutation<AutenticarUsuario>(AUTENTICAR_USUARIO);

  const router = useRouter();

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('El email no es válido').required('El email no puede ir vacio'),
    password: Yup.string().required('El password no puede ir vacio').min(4, 'El password debe ser de al menos 4 caracteres')
  })

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik<InitialValues>({
    initialValues,
    validationSchema,
    onSubmit: async(values) => {
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              ...values
            }
          }
        });
        console.log(data)
        setMensaje(`Autenticando...`);

        const token = data?.autenticarUsuario.token;
        localStorage.setItem('token', token!);

        setTimeout(() => {
          setMensaje(null);
          router.push('/')
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
        <h1 className='text-center text-2xl text-white'>Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form onSubmit={handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                <input 
                  type="email" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  placeholder='Email usuario'
                  autoComplete='off'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  placeholder='Password usuario'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  touched.password && errors.password && (
                    <ShowError message={errors.password} />
                  )
                }
              </div>
              <input type="submit" className='bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer' value='Iniciar sesión'/>
              <Link href='/register' className='mt-2 text-right block font-light text-sm'>No tienes una cuenta?</Link>
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

export default Login
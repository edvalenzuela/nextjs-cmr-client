import { useState } from "react";
import { useFormik } from "formik"
import { useMutation } from "@apollo/client";
import * as Yup from 'yup'
import { NUEVO_CLIENTE, OBTENER_CLIENTES_USUARIO } from "@/gql";
import { useRouter } from "next/navigation";

import Layout from "@/src/components/Layout"
import ShowError from "@/src/components/ShowError";
import ShowMessage from "@/src/components/ShowMessage";

export interface InitialValues{
  __typename?: string;
  id?: string;
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
}

const NuevoCliente = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState<string | null>(null);

  const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
    update(cache:any, { data: { nuevoCliente } }){
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO});

      // Reescribimos el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data:{
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
        }
      })
    }
  })

  const initialValues = {
    nombre: '',
    apellido: '',
    empresa: '',
    email:'',
    telefono: ''
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    empresa: Yup.string().required('La empresa es obligatorio'),
    email: Yup.string().email('El email no es válido').required('El email es obligatorio')
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<InitialValues>({
    initialValues,
    validationSchema,
    onSubmit:async(values) => {
      console.log(values)

      try {
        await nuevoCliente({
          variables: {
            input:{
              ...values
            }
          }
        })

        router.push('/')
        
      } catch (e:any) {
        setMensaje(e.message.replace('ApolloError:', ''))
        setTimeout(() => {
          setMensaje(null)
        }, 3000);
      }
    }
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
            <div className='mb-4'>
              <label htmlFor="nombre" className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
              <input 
                type="text" 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='nombre'
                placeholder='nombre cliente'
                autoComplete='off'
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
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
                type="text" 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='apellido'
                placeholder='apellido cliente'
                autoComplete='off'
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                touched.apellido && errors.apellido && (
                  <ShowError message={errors.apellido} />
                )
              }
            </div>
            <div className='mb-4'>
              <label htmlFor="empresa" className='block text-gray-700 text-sm font-bold mb-2'>Empresa</label>
              <input 
                type="text" 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='empresa'
                placeholder='empresa cliente'
                autoComplete='off'
                value={values.empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                touched.empresa && errors.empresa && (
                  <ShowError message={errors.empresa} />
                )
              }
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input 
                type="email" 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                placeholder='email cliente'
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
              <label htmlFor="telefono" className='block text-gray-700 text-sm font-bold mb-2'>Telefono</label>
              <input 
                type="tel" 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='telefono'
                placeholder='telefono cliente'
                autoComplete='off'
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                touched.telefono && errors.telefono && (
                  <ShowError message={errors.telefono} />
                )
              }
            </div>
            <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer" value='Registrar cliente' />
            {
              mensaje && <ShowMessage message={mensaje} />
            }
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NuevoCliente
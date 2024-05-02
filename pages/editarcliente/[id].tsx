import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/src/components/Layout';
import { useQuery, useMutation } from '@apollo/client';
import { ACTUALIZA_CLIENTE, OBTENER_CLIENTE_USUARIO } from '@/gql';
import { Formik } from 'formik'
import * as Yup from 'yup'
import ShowError from '@/src/components/ShowError';
import Swal from 'sweetalert2';
import { InitialValues } from '../nuevoCliente';

const EditarCliente = () => {
  //Obtener el ID actual
  const router = useRouter();
  const { id } = router.query;

  // consultar para obtener el cliente
  const { data, loading } = useQuery(OBTENER_CLIENTE_USUARIO, {
    variables: {
      id
    }
  });

  // actualizar el cliente
  const [ actualizarCliente ] = useMutation(ACTUALIZA_CLIENTE);

  //Schema de validacion
  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    apellido: Yup.string().required('El apellido es obligatorio'),
    empresa: Yup.string().required('La empresa es obligatorio'),
    email: Yup.string().email('El email no es válido').required('El email es obligatorio')
  })

  if (loading) return;
  if(!data){
    return 'Acción no permitida'
  }

  // modificar el cliente en la BD
  const actualizarInformacionCliente = async (values:InitialValues) => {
    const { __typename, ...rest } = values;
    try {
      await actualizarCliente({
        variables: {
          id,
          input: {
            ...rest
          }
        }
      })
      //Mostrar alerta
      Swal.fire({
        title: "Actualizado!",
        text: `El cliente ${rest.nombre} se ha actualizó correctamente`,
        icon: "success"
      });
      //Redireccionar
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={ data?.obtenerCliente }
            onSubmit={(values) => {
              actualizarInformacionCliente(values)
            }}
          >
            {({ handleSubmit, handleBlur, handleChange, touched, errors, values }) => (
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
                    <ShowError message={errors.nombre as string} />
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
                    <ShowError message={errors.apellido as string} />
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
                    <ShowError message={errors.empresa as string} />
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
                    <ShowError message={errors.email as string} />
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
                    <ShowError message={errors.telefono as string} />
                  )
                }
                </div>
                <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" value='Editar cliente' />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default EditarCliente
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { ACTUALIZAR_PRODUCTO, OBTENER_PRODUCTO } from '@/gql';
import * as Yup from 'yup';

import { Layout, ShowError } from '@/src/components';
import { Productos } from '..';
import Swal from 'sweetalert2';

const EditarProducto = () => {

  const router = useRouter();
  const { id } = router.query;

  // consultar para obtener el producto
  const { data, loading } = useQuery(OBTENER_PRODUCTO,{
    variables:{
      id
    }
  });

  const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO)

  const validationSchema = () => Yup.object({
    nombre: Yup.string().required('El nombre del producto es obligatorio'),
    existencia: Yup.number()
    .required('Agrega la cantidad disponible')
    .positive('No se aceptan números negativos')
    .integer('La existencia deben de ser números enteros'),
    precio: Yup.number()
    .required('El precio es obligatorio')
    .positive('No se aceptan números negativos')
  })

  if(loading) return;
  if(!data){
    return 'Acción no permitida'
  }

  const actualizarInformacionProducto = async(values:Productos) => {

    const { __typename, ...rest } = values;

    try {
      await actualizarProducto({
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
      router.push('/productos')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={ data?.obtenerProducto }
            onSubmit={(values) => actualizarInformacionProducto(values)}
          >
            {({ handleSubmit, handleBlur, handleChange, touched, errors, values }) => (
            <form onSubmit={handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
              <div className='mb-4'>
                <label htmlFor="nombre" className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
                <input
                  type="text"
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='nombre'
                  placeholder='nombre producto'
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
                <label htmlFor="existencia" className='block text-gray-700 text-sm font-bold mb-2'>
                  Cantidad disponible
                </label>
                <input
                  type="number"
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='existencia'
                  placeholder='Cantidad producto'
                  autoComplete='off'
                  value={values.existencia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  touched.existencia && errors.existencia && (
                    <ShowError message={errors.existencia as string} />
                  )
                }
              </div>
              <div className='mb-4'>
                <label htmlFor="precio" className='block text-gray-700 text-sm font-bold mb-2'>Precio</label>
                <input
                  type="number"
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='precio'
                  placeholder='precio producto'
                  autoComplete='off'
                  value={values.precio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  touched.precio && errors.precio && (
                    <ShowError message={errors.precio as string} />
                  )
                }
              </div>
              <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer" value='Editar nuevo producto' />
            </form>
          )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default EditarProducto
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useRouter } from "next/navigation";
import { NUEVO_PRODUCTO, OBTENER_PRODUCTOS } from "@/gql";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

import Layout from "@/src/components/Layout"
import { ShowError } from "@/src/components"

const NuevoProducto = () => {
  //routing
  const router = useRouter();

  //mutation apollo
  const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO,{
    update(cache:any, { data: { nuevoProducto }}){
      //obtener el objeto de cache

      const { obtenerProductos } = cache.readQuery({query: OBTENER_PRODUCTOS});

      //reescribir ese objeto
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos:[...obtenerProductos, nuevoProducto]
        }
      })
    }
  })

  //formulario para nuevos productos
  const initialValues = {
    nombre: '',
    existencia: '',
    precio: ''
  }

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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit:async(values, { resetForm }) => {
      const { nombre, existencia, precio } = values;
      try {
        const { data } = await nuevoProducto({
          variables:{
            input: {
              nombre,
              existencia: parseInt(existencia),
              precio: parseInt(precio)
            }
          }
        })
        console.log(data)
        resetForm();
        //mostrar una alerta
        Swal.fire({
          title: "Creado!",
          text: `Se creó exitosamente el producto ${nombre}`,
          icon: "success"
        });
        //redireccionar hacia los productos
        router.push('/productos')
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear nuevo producto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
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
                    <ShowError message={errors.nombre} />
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
                    <ShowError message={errors.existencia} />
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
                    <ShowError message={errors.precio} />
                  )
                }
              </div>
              <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer" value='Agregar nuevo producto' />
            </form>
          </div>
      </div>
    </Layout>
  )
}

export default NuevoProducto
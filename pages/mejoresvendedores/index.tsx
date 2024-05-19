import { useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { MEJORES_VENDEDORES } from '@/gql';

import { Layout } from '@/src/components';

interface IMejoresVendedores{
  mejoresVendedores: [{
    total: string,
    vendedor: [{
      nombre: string;
      apellido: string;
      email: string;
    }]
  }]
}

const MejoresVendedores = () => {

  const { data, loading, startPolling, stopPolling } = useQuery<IMejoresVendedores>(MEJORES_VENDEDORES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling])

  if(loading) return;

  const vendedorGrafica:any = [];

  data?.mejoresVendedores.map((item, i) => {
    vendedorGrafica[i] = {
      ...item.vendedor[0],
      total: item.total
    }
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className='mt-10'
          width={600}
          height={500}
          data={vendedorGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182ce" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  )
}

export default MejoresVendedores
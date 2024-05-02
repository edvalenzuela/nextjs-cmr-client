import Link from 'next/link'
import { usePathname  } from 'next/navigation'

interface Routes{
  href: string;
  name: string;
}

const Sidebar = () => {

  const pathname = usePathname();
  
  const renderActivePath = (path: string):string => {
    return pathname === path ? 'bg-blue-800' : ''
  };

  const routes:Routes[] = [
    {
      href: '/',
      name: 'Clientes'
    },
    {
      href: '/pedidos',
      name: 'Pedidos'
    },
    {
      href: '/productos',
      name: 'Productos'
    }
  ]

  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
      <div>
        <p className='text-white text-2xl font-black'>CRM Clientes</p>
      </div>
      <nav className='mt-5 list-none'>
        {
          routes.map(({href, name}, i) => (
            <li key={i} className={`p-2 rounded-md ${renderActivePath(href)}`}>
              <Link href={href} className='text-white'>{name}</Link>
            </li>
          ))
        }
      </nav>
    </aside>
  )
}

export default Sidebar
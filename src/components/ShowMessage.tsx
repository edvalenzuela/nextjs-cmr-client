
const ShowMessage = ({message}:{message: string}) => {
  return (
    <div className='border-l-4 bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
      <p>{message}</p>
    </div>
  )
}

export default ShowMessage
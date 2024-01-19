
function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid"></div>
        </div>
    </div>
  )
}

export default Loading
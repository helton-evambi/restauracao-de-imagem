import React, { useState } from 'react'

function UploadImage() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [generatedImg, setGerenatedImg] = useState(null)

  //let mensagem = 'Sinta-se à vontade para restaurar as suas fotos!'

  const handleFileChange = (event) => {
    setSelectedFiles([])
    setGerenatedImg(null)
    setSelectedFiles(Array.from(event.target.files))
  }

  const handleUpload = async () => {
    try {
      //console.log(output)
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append('images', file)
      })

      const response = await fetch(
        'https://9a48-129-122-160-184.ngrok-free.app/api/Image/SaveFile',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        alert('Imagens enviadas com sucesso!')
        const responseReplicate = await fetch(
          `/api/replicate?image=${encodeURIComponent(data)}`
        )
        const responseReplicateData = await responseReplicate.json()
        console.log(responseReplicateData)
        setGerenatedImg(responseReplicateData)
        if (generatedImg) {
          mensagem = 'Sinta-se à vontade para restaurar as suas fotos!'
        }
        if (!responseReplicate.ok) {
          throw new Error('Failed to fetch data from server')
        }
      } else {
        throw new Error('Erro ao enviar imagens')
      }
    } catch (error) {
      console.error('Erro ao enviar imagens:', error)
      alert('Erro ao enviar imagens. Por favor, tente novamente.')
    }
  }
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-md">
        <label
          htmlFor="file-upload"
          className="block border-2 border-gray-300 border-dashed rounded-md px-6 py-8 cursor-pointer hover:bg-gray-400"
        >
          <div className="flex justify-center items-center space-x-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span>
              Arraste e solte as imagens aqui ou clique para selecionar
            </span>
          </div>
        </label>
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="w-[500px] h-[350px] my-0 mx-auto">
        {selectedFiles.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Imagem ${index + 1}`}
            className="rounded-md"
          />
        ))}
      </div>
      {generatedImg && (
        <div className="w-[500px] h-[350px] my-0 mx-auto">
          <img src={generatedImg} alt="ImagemGerada" className="rounded-md" />
        </div>
      )}
      <button
        className={`bg-blue-500 text-white px-6 py-3 rounded-md ${
          selectedFiles.length === 0 && 'opacity-50 cursor-not-allowed'
        }`}
        onClick={handleUpload}
        disabled={selectedFiles.length === 0}
      >
        Enviar
      </button>
    </div>
  )
}

export default function Upload() {
  return <UploadImage />
}

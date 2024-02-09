import Webcam from 'react-webcam'
import React, { useState, useRef, useCallback } from 'react'

function WebcamImage() {
  const webcamRef = useRef(null)
  const [img, setImg] = useState(null)
  const [generatedImg, setGerenatedImg] = useState(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImg(imageSrc)
    console.log(imageSrc)

    // Enviar a imagem para a API
    sendImageToAPI(imageSrc)
    setGerenatedImg(null)
  }, [webcamRef])

  const recapture = () => {
    setImg(null)
    setGerenatedImg(null)
  }

  const sendImageToAPI = async (imageData) => {
    try {
      // Converter a imagem base64 para Blob
      const byteCharacters = atob(imageData.split(',')[1])
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: 'image/jpeg' })

      // Criar FormData e adicionar o arquivo
      const formData = new FormData()
      formData.append('file', blob, 'webcam_capture.jpg')

      // Enviar a imagem para a API
      const response = await fetch(
        'https://9a48-129-122-160-184.ngrok-free.app/api/Image/SaveFile',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao enviar a imagem para a API')
      }

      const data = await response.json()
      console.log(data)
      alert('Imagem enviada com sucesso aguarde')
      const responseReplicate = await fetch(
        `/api/replicate?image=${encodeURIComponent(data)}`
      )
      const responseReplicateData = await responseReplicate.json()
      console.log(responseReplicateData)
      setGerenatedImg(responseReplicateData)
    } catch (error) {
      console.error('Erro ao enviar a imagem para a API:', error)
    }
  }

  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: 'user',
  }

  return (
    <div className="flex flex-col items-center">
      {img === null ? (
        <>
          <Webcam
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            audio={true}
            height={500}
            width={500}
            ref={webcamRef}
            mirrored={true}
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md my-5"
            onClick={capture}
          >
            Capturar
          </button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md my-5"
            onClick={recapture}
          >
            Recapturar
          </button>
        </>
      )}
      {generatedImg && (
        <div className="w-[500px] h-[350px] my-0 mx-auto">
          <img src={generatedImg} alt="ImagemGerada" className="rounded-md" />
        </div>
      )}
    </div>
  )
}

export default function WebcamPhoto() {
  return (
    <div className="App">
      <WebcamImage />
    </div>
  )
}

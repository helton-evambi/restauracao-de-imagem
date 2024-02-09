import Upload from '@/components/upload'
import WebcamPhoto from '@/components/webcam'
import React, { useState } from 'react'

export default function App() {
  const [webcam, setWebcam] = useState(false)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Sinta-se à vontade para restaurar as suas fotos!
      </h1>
      <div className="flex flex-col items-center space-y-4 mb-3">
        <button
          className={`bg-blue-500 text-white px-6 py-3 rounded-md my-0 mx-auto`}
          onClick={() => setWebcam(!webcam)}
        >
          {webcam ? <>Carregar Foto</> : <>Tirar Foto</>}
        </button>
        {webcam ? <WebcamPhoto /> : <Upload />}
      </div>
    </div>
  )
}

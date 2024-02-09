import Replicate from 'replicate'

export default async function handler(req, res) {
  const { image } = req.query

  // Certifique-se de que o parâmetro 'image' foi fornecido
  if (!image) {
    return res.status(400).json({ error: 'O parâmetro image é obrigatório' })
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  })

  const output = await replicate.run(
    'jingyunliang/swinir:660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a',
    {
      input: {
        image,
      },
    }
  )
  res.status(200).json(output)
}

import ImgSchema from '../model/models.js'

const getData = async (req, res) => {
  try {
    const data = await ImgSchema.find({})
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const postData = async (req, res) => {
  try {
    const data = await ImgSchema.create(req.body)
    console.log('Img Posted', data)
    res.status(201).json({ data })
  } catch (error) {
    console.log('Error creating list:', error)
    res.status(500).json({ msg: error })
  }
}

export { getData, postData }

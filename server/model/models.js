import mangoose from 'mongoose'

const ImgSchema = new mangoose.Schema({
  img: String,
})

export default mangoose.model('imgdata', ImgSchema)

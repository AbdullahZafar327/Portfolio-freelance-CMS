import mongoose from 'mongoose'

const ConnectedToDb = async() =>{
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!!).then(()=>{console.log('mongoodb connected Successfully')},(err)=>{
      console.log("something occurred while connecting to database",err)
    })
  } catch (error) {
    console.log("something went wrong")
  } 
}

export default ConnectedToDb
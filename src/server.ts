import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.database_url}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

import 'dotenv/config.js' // Usado dessa forma para o ESLint não apontar erro.
import express from 'express'

const app = express()

app.use(express.json())

app.listen(process.env.PORT, () => console.log('Server running on port 3000'))

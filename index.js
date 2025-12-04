import 'dotenv/config.js' // Usado dessa forma para o ESLint não apontar erro.
import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const results = await PostgresHelper.Query('SELECT * from users')

    res.send(JSON.stringify(results))
})

app.listen(3000, () => console.log('Server running on port 3000'))

import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/'
const dbName = 'ch2'
const client = new MongoClient(url)
const host = 'localhost'
const port = 3000

const server = createServer(async (req, res) => {
	const db = client.db(dbName)
	const users = db.collection('users')

	const usersList = await users.find().toArray()

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify(usersList))
})

server.listen(port, host, () => {
	console.log(`Server listening on http://${host}:${port}`)
})

try {
	await client.connect()
	console.log('Successfully connected to databse!')
} catch (err) {
	console.error('Error connecting to database:', err)
}

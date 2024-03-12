import Service from './service.js'

const data = {
    username: 'joao',
    password: 'minhasenhasecreta'
}
const service = new Service({
    filename: './users.ndjson'
})

await service.create(data)

const users = await service.read()
console.log('users:', users )
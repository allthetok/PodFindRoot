const express = require('express')
const cors = require('cors')
const app = express()


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}


app.use(express.json())
app.use(requestLogger)
app.use(cors(corsOptions))

let users = [
    {
        id: 10829,
        content: 'The Joe Rogan Experience'
    }
]

app.get('/api/users', (request, response) => {
    response.json(users)
})

app.post('/api/users', (request, response) => {
    const body = request.body
    
    if (!body.username) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const user = {
        username: body.username,
        password: body.password
    }

    users = users.concat(user)

    response.json(user)
})

app.post('/api/likes', (request, response) => {
    const user = request.body
    console.log(user)
    response.json(user)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

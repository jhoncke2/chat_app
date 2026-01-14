import express, { json } from 'express'
import { createUsersRouter } from './routes/users.js'
import { createChatsRouter } from './routes/chats.js' 
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({
    userController,
    chatController,
    chatMessageController
}) => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')

    app.get('/', (req, res) => {
        res.json({message: 'Bienvenido a Routes'})
    })

    app.use('/users', createUsersRouter({userController}))
    app.use('/chats', createChatsRouter({chatController, chatMessageController}))

    const PORT = process.env.PORT ?? 1234
    app.listen(PORT, () => {
        console.log(`Server listening on ${(process.env.BASE_URL ?? 'localhost://')+PORT}`)
    })
}
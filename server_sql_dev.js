import mysql from 'mysql2/promise'
import { createApp } from './src/app.js'
import { UserModel } from './src/models/user.js'
import { ChatRepository, ChatMessageRepository } from './src/repositories/repositories_export.js'
import { chatMessageSchema } from './src/schemas/chat_messages.js'
import { FileStorageService } from './src/infrastructure/file_storage_service.js'
import { ChatMessageService } from './src/services/chat_message.js'
import { UserController, ChatController, ChatMessageController } from './src/controllers/controllers_export.js'

const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'chatappdb',
    password: '',
    port: 3306
})
const userModel = new UserModel({connection})
const chatRepo = new ChatRepository({connection})
const chatMessageRepo = new ChatMessageRepository({connection})
const storage = new FileStorageService({})
const chatMessageService = new ChatMessageService({
    connection,
    chatMessageRepo,
    storage,
    chatMessageSchema
})
const userController = new UserController({ userModel })
const chatController = new ChatController({ chatRepo })
const chatMessageController = new ChatMessageController({ chatMessageService })

createApp({
    userController,
    chatController,
    chatMessageController
})
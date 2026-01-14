export class ChatUserModel {
    constructor (connection) {
        this.connection = connection
    }

    getByUserId = async (userId) => {
        const [chatsIds] = await this.connection.query(
            `SELECT chat_id 
                FROM ChatsUsers
                WHERE user_id = ?
            `,
            [userId]
        )
        return chatsIds
    }

    getByChatId = async (chatId) => {
       const [userId] = await this.connection.query(
            `SELECT BIN_TO_UUID(user_id) 
                FROM ChatsUsers
                WHERE chat_id = ?
            `,
            [chatId]
        )
        return userId
    }
}
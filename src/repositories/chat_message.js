export class ChatMessageRepository {
    constructor ({ connection }) {
        this.connection = connection
    }

    getAllByChatIdAndUserId = async ({ chatId, userId }) => {
        const [rows] = await this.connection.execute(`
            SELECT
                cm.id AS message_id,
                cm.date,
                cm.transmitter_id,
                mc.id AS content_id,
                mc.type,
                mc.text_content,
                mc.file_content,
            FROM ChatMessages cm
            JOIN MessageContents mc ON mc.chat_message_id = cm.id
            WHERE cm.chat_id = ?
            ORDER BY cm.date ASC
            `,
            [userId, userId, userId, chatId]
        );

        return rows;
    }

    insertMessage = async ({ chatId, transmitterId}) => {
        const result = await this.connection.execute(`
            INSERT INTO ChatMessages (chat_id, transmitter_id),
            VALUES (?, ?)
            `
            ,
            [chatId, transmitterId]
        )
        return result.insertId
    }

    insertMessageContent = async ({ chatMessageId, type, textContent, fileContent }) => {
        await this.connection.execute(`
            INSERT INTO MessageContents (chat_message_id, type, text_content, file_content)
            VALUES (?, ?, ?, ?)
            `
            ,
            [chatMessageId, type, textContent, fileContent]
        )
    }
}
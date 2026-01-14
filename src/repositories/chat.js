export class ChatRepository {
    constructor ({ connection }) {
        this.connection = connection
    }

    getAllByUserId = async ({ userId }) => {
        try {
            const [chats] = await this.connection.query(
                `SELECT
                    c.id AS chatId,
                    c.name AS chatName,
                    c.created_at AS createdAt,

                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'user_id', BIN_TO_UUID(u.uuid),
                            'name', u.name
                        )
                    ) AS users

                FROM Chats c
                INNER JOIN ChatsUsers cu
                    ON cu.chat_id = c.id
                INNER JOIN Users u
                    ON u.uuid = cu.user_id

                WHERE EXISTS (
                    SELECT 1
                    FROM ChatsUsers cu2
                    WHERE cu2.chat_id = c.id
                    AND cu2.user_id = UUID_TO_BIN('680f75a7-e4f5-11f0-8d51-0a002700000f')
                )

                GROUP BY
                    c.id,
                    c.name,
                    c.created_at
                ORDER BY c.id
                `,
                [userId]
            )
            return chats
        } catch (err) {
            console.log(err)
        }
        
    }
}
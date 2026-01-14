export class ChatMessageService {
    constructor ({
        connection,
        chatMessageRepo,
        storage,
        chatMessageSchema
    }) {
        this.connection = connection
        this.chatMessageRepo = chatMessageRepo
        this.storage = storage
        this.chatMessageSchema = chatMessageSchema
    }

    getAllByChatIdAndUserId = async ({ chatId, userId }) => {
        const chatMessages = await this.chatMessageRepo.getAllByChatIdAndUserId({
            chatId,
            userId
        });
        return chatMessages;
    }

    createMessage = async ({ chatId, transmitterId, type, textContent, file }) => {
        try {
            let fileContent = null

            if (file) {
                // 1. Guardar archivo
                const url = await this.storage.save(file)

                // 2. Crear metadata
                fileContent = {
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    url
                }
            }

            // 3. Validar contrato
            const result = chatMessageSchema.parse({
                chatId: chatId,
                transmitterId: transmitterId,
                type: type,
                textContent: textContent,
                fileContent
            })
            if(result.error) {
                return result
            }

            await connection.beginTransaction();

            // 4. Insertar mensaje
            const chatMessageId = await chatMessageRepo.insertMessage({
                chatId,
                transmitterId
            });

            // 5. Insertar contenido
            const contentIsText = type === 'text'
            await chatMessageRepo.insertContent({
                chatMessageId,
                type,
                textContent: contentIsText ? content : null,
                fileContent: contentIsText ? null : content
            });

            await connection.commit();
            return {
                chatMessageId,
                chatId,
                transmitterId,
                type,
                content
            };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}
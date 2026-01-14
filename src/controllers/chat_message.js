export class ChatMessageController {
    constructor ({ chatMessageService }) {
        this.chatMessageService = chatMessageService
    }

    getAllByChatIdAndUser = async (req, res) => {
        const { chatId } = req.params
        const userId = req.headers.userid
        try {
            const chatMessages = await this.chatMessageService.getAllByChatIdAndUserId({
                chatId,
                userId
            })
            res.status(200).json(chatMessages)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    create = async (req, res) => {
        const transmitterId = req.params.userId
        const body = {
            chatId: req.body.chatId,
            transmitterId: transmitterId,
            type: req.body.type,
            content: req.body.content
        }
        try {
            const result = await this.chatMessageService.createMessage(body)
            if(result.error) {
                res.status(400).json({ error: result.error })
            }
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
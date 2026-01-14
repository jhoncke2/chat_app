export class ChatController {
    constructor ({ chatRepo }) {
        this.chatRepo = chatRepo
    }

    getAllByUser = async (req, res) => {
        const userId = req.headers.userid
        try {
            const chats = await this.chatRepo.getAllByUserId({ userId })
            res.status(200).json(chats)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
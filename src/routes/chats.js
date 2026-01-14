import { Router } from "express";

export function createChatsRouter({ chatController, chatMessageController }){
    const chatRouter = Router({mergeParams: true})
    chatRouter.get('/', chatController.getAllByUser)
    chatRouter.use('/:chatId/messages', function (){
        const chatMessageRouter = Router({mergeParams: true})
        chatMessageRouter.get('/', chatMessageController.getAllByChatIdAndUser)
        chatMessageRouter.post('/', chatMessageController.create)
        return chatMessageRouter
    }())
    return chatRouter
}
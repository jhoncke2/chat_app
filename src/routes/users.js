import { Router } from "express";

export function createUsersRouter({ userController }){
    const userRouter = Router({mergeParams: true})
    userRouter.get('/:name', userController.getByName)
    return userRouter
}
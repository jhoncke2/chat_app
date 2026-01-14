export class UserController {
    constructor ({ userModel }) {
        this.userModel = userModel
    }
    
    getByName = async (req, res) => {
        const { name } = req.params
        try {
            const user = await this.userModel.getByName({ name })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', data: error })
        }
    }
}
export class UserModel {
    constructor ({ connection }) {
        this.connection = connection
    }

    getByName = async ({ name }) => {
        const [users] = await this.connection.query(
            `SELECT BIN_TO_UUID(uuid) as id
                FROM Users
                WHERE name = ?
            `,
            [name]
        )
        return users[0]
    }
}
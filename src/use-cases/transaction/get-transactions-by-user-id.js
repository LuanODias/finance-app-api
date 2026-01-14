import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionsByUserId {
    constructor(
        getTransactionsByUserIdRepository,
        PostgresGetUserByIdRepository,
    ) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository
        this.postgresGetUserByIdRepository = PostgresGetUserByIdRepository
    }
    async execute(params) {
        const user = await this.PostgresGetUserByIdRepository.execute(
            params.user_id,
        )

        if (!user) {
            throw new UserNotFoundError(params.user_id)
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.user_id)

        return transactions
    }
}

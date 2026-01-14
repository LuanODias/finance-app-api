import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionsByUserIdUseCase {
    constructor(
        getTransactionsByUserIdRepository,
        PostgresGetUserByIdRepository,
    ) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository

        this.postgresGetUserByIdRepository = PostgresGetUserByIdRepository
    }
    async execute(params) {
        const userId = params.userId || params.user_id

        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(userId)

        return transactions
    }
}

import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getUserByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.user_id)

        if (!user) {
            throw new UserNotFoundError(params.user_id)
        }
    }
}

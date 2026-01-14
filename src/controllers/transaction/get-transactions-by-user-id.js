import { UserNotFoundError } from '../../errors/user.js'
import {
    serverError,
    ok,
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionsByUserId {
    constructor(GetTransactionsByUserIdUseCase) {
        this.GetTransactionsByUserIdUseCase = GetTransactionsByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.user_id

            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.GetTransactionsByUserIdUseCase.execute({
                    user_id: userId,
                })

            return ok(transactions)
        } catch (error) {
            console.log(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }

            return serverError()
        }
    }
}

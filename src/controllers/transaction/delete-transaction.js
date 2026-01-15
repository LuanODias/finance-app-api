import { checkIfIdIsValid } from '../../validators/id-validator.js'
import { invalidIdResponse, serverError, ok } from '../../helpers/'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const idIsvalid = checkIfIdIsValid(httpRequest.params.id)

            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const transaction = await this.deleteTransactionUseCase.execute(
                httpRequest.params.id,
            )

            return ok(transaction)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}

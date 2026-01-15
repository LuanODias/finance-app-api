import {
    serverError,
    ok,
    checkIfIdIsValid,
    invalidIdResponse,
    transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const idIsvalid = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!idIsvalid) {
                return invalidIdResponse()
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                )

            if (!deletedTransaction) {
                return transactionNotFoundResponse()
            }

            return ok(deletedTransaction)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}

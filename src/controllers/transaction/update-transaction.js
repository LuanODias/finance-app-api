import { badRequest, notFound, ok, serverError } from '../helpers/index.js'
import { updateTransactionSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await updateTransactionSchema.parseAsync(params)

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                    params,
                )

            if (!updatedTransaction) {
                return notFound({ message: 'Transaction not found.' })
            }

            return ok(updatedTransaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }

            if (error instanceof Error) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}

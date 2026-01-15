import { updateUserSchema } from '../../schemas/index.js'
import {
    invalidIdResponse,
    checkIfIdIsValid,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js'
import { ZodError } from 'zod'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            await updateUserSchema.parseAsync(params)

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
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

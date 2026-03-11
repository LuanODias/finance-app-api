import { faker } from '@faker-js/faker'
import { UpdateTransactionController } from './update-transaction'
import { TransactionNotFoundError } from '../../errors/transaction'

describe('UpdateTransactionController', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
                date: faker.date.anytime(),
            }
        }
    }

    const httpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.commerce.productName(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
            date: faker.date.anytime().toISOString(),
        },
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { sut, updateTransactionUseCase }
    }

    it('should return 200 when updating transaction successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute(httpRequest)

        //assert
        expect(response.statusCode).toBe(200)
    })

    it('should return 500 when UpdateTransactionUseCase throws', async () => {
        //arrange
        const { sut, updateTransactionUseCase } = makeSut()

        jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        //act
        const response = await sut.execute(httpRequest)

        //assert
        expect(response.statusCode).toBe(500)
    })

    it('should call UpdateTransactionUseCase with correct params', async () => {
        //arrange
        const { sut, updateTransactionUseCase } = makeSut()

        const executeSpy = jest.spyOn(updateTransactionUseCase, 'execute')

        //act
        await sut.execute(httpRequest)

        //assert
        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.transactionId,
            httpRequest.body,
        )
    })

    it('should return 400 when unallowed field is provided', async () => {
        //arrange
        const { sut } = makeSut() 

        //act
        const response = await sut.execute({
            ...httpRequest.body,
            body:{
                ...httpRequest.body,
                unallowed_field: 'some_value',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when type is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...httpRequest.body,
            body: {
                ...httpRequest.body,
                type: 'invalid_type',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when amount is missing', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...httpRequest.body,
            amount: undefined,
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when amount is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...httpRequest.body,
            body: {
                ...httpRequest.body,
                amount: 'invalid_amount',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when amount is less than or equal to 0', async () => {
        //arrange 
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            ...httpRequest.body,
            body:{
                ...httpRequest.body,
                amount: 0,
            }
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 404 when UpdateTransactionUseCase throws TransactionNotFoundError', async () => {
        //arrange 
        const { sut, updateTransactionUseCase } = makeSut()

        jest.spyOn(updateTransactionUseCase,'execute').mockResolvedValueOnce(null)
            new TransactionNotFoundError(httpRequest.params.transactionId)

        //act
        const response = await sut.execute(httpRequest)

        //assert
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe('Transaction not found.')
    })
})

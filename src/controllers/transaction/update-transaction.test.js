import { faker } from '@faker-js/faker'
import { UpdateTransactionController } from './update-transaction'

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
})

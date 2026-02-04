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
})

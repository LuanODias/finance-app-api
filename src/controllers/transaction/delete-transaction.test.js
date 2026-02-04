import { DeleteTransactionController } from './delete-transaction'
import { faker } from '@faker-js/faker'

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.string.alpha(10),
                type: 'EXPENSE',
                amount: faker.number.float(),
                date: faker.date.anytime(),
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleteTransactionUseCase)

        return { sut, deleteTransactionUseCase }
    }

    it('should returning 200 when deleting a transaction successfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            params: {
                transactionId: faker.string.uuid(),
            },
        })

        //assert
        expect(response.statusCode).toBe(200)
    })
})

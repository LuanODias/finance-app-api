import { GetTransactionsByUserIdController } from './get-transactions-by-user-id'
import { faker } from '@faker-js/faker'

describe('GetTransactionsByUserIdController', () => {
    class GetTransactionsByUserIdUseCaseStub {
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
        const getTransactionsByUserIdUseCase =
            new GetTransactionsByUserIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        )

        return { sut, getTransactionsByUserIdUseCase }
    }

    it('should return 200 when finding transactions by user_id sucssesfully', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: {
                userId: faker.string.uuid(),
            },
        })

        //assert
        expect(response.statusCode).toBe(200)
    })

    it('should return 400 when missing user_id', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: { user_id: undefined },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when user_id is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: {
                user_id: 'invalid_id',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })
})

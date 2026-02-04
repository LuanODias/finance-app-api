import { UserNotFoundError } from '../helpers'
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

    it('should return 200 when finding transactions by userId sucssesfully', async () => {
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

    it('should return 400 when missing userId', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: { userId: undefined },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 400 when useId is invalid', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const response = await sut.execute({
            query: {
                userId: 'invalid_id',
            },
        })

        //assert
        expect(response.statusCode).toBe(400)
    })

    it('should return 404 when GetUserByIdUseCase throws UserNotFoundError', async () => {
        //arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut()

        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError())

        //act
        const response = await sut.execute({
            query: {
                userId: faker.string.uuid(),
            },
        })

        //assert
        expect(response.statusCode).toBe(404)
    })
})

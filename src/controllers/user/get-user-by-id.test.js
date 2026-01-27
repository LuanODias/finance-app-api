import { faker } from '@faker-js/faker'
import { GetUserByIdController } from './get-user-by-id'

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            }
        }
    }

    const makeSut = () => {
        const getUserByIdUseCaseStub = new GetUserByIdUseCaseStub()
        const sut = new GetUserByIdController(getUserByIdUseCaseStub)

        return { sut, getUserByIdUseCaseStub }
    }

    it('should return 200 if a user is found', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.execute({
            params: {
                userId: faker.string.uuid(),
            },
        })

        expect(httpResponse.statusCode).toBe(200)
    })

    it('should return 400 if an invalid id is provided', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
        })

        expect(httpResponse.statusCode).toBe(400)
    })
})

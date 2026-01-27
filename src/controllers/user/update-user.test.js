import { UpdateUserController } from './update-user'
import { faker } from '@faker-js/faker'

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)

        return { sut, updateUserUseCase }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    it('should return 200 if valid data is provided', async () => {
        //arrange
        const { sut } = makeSut()

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if invalid email is provided', async () => {
        //arrange
        const { sut } = makeSut()

        const httpRequestWithInvalidEmail = {
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                email: 'invalid_email',
            },
        }

        //act
        const result = await sut.execute(httpRequestWithInvalidEmail)

        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if invalid password is provided', async () => {
        //arrange
        const { sut } = makeSut()

        const httpRequestWithInvalidEmail = {
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        }

        //act
        const result = await sut.execute(httpRequestWithInvalidEmail)

        //assert
        expect(result.statusCode).toBe(400)
    })
})

import { EmailAlreadyInUseError } from '../helpers'
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

        const httpRequestWithInvalidPassword = {
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        }

        //act
        const result = await sut.execute(httpRequestWithInvalidPassword)

        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if invalid id is provided', async () => {
        //arrange
        const { sut } = makeSut()

        const httpRequestWithInvalidId = {
            params: {
                userId: 'invalid_id',
            },
            body: {
                ...httpRequest.body,
            },
        }

        //act
        const result = await sut.execute(httpRequestWithInvalidId)

        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an unallowed field is provided', async () => {
        //arrange
        const { sut } = makeSut()

        const httpRequestWithUnallowedField = {
            params: {
                userId: httpRequest.params.userId,
            },
            body: {
                ...httpRequest.body,
                unallowedField: 'unallowed_value',
            },
        }

        //act
        const result = await sut.execute(httpRequestWithUnallowedField)

        //assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 500 if UpdateUserUseCase throws with generic error', async () => {
        //arrange
        const { sut, updateUserUseCase } = makeSut()

        jest.spyOn(updateUserUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 400 if UpdateUserUseCase throws EmailInAlreadyUseError', async () => {
        //arrange
        const { sut, updateUserUseCase } = makeSut()

        jest.spyOn(updateUserUseCase, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(faker.internet.email()),
        )

        //act
        const result = await sut.execute(httpRequest)

        //assert
        expect(result.statusCode).toBe(400)
    })
})

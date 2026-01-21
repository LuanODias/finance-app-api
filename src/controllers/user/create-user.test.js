import { CreateUserController } from "./create-user"

describe('CreateUserController', () =>{
    class CreateUserUseCaseStub {
        execute(user){
            return user
        }
    }
    it('should return 201 when creating a user successfully', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest ={
            body: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
                password: 'password'
            }
        }

        //act
        const result = await createUserController.execute(httpRequest)
        

        //assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)
    })
})
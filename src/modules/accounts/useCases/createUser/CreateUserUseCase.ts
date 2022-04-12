import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({
        name,
        username,
        
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void>{

        const userAlreadyExists = await this.usersRepository.findByUsername(username);

        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
          name,
          username,
          
          driver_license,
          password: passwordHash,
        });
    }
}

export { CreateUserUseCase };
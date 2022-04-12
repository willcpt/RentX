import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    username: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        username: string;
    };
    token: string;
}


@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ username, password }: IRequest) {
        //Usuario existe
        const user = await this.usersRepository.findByUsername(username);

        if(!user){
            throw new AppError("Username or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        // Senha esta correta
        if(!passwordMatch){
            throw new AppError("Username or password incorrect!");
        }

        const token = sign({}, "18218139eec55d83cf82679934e5cd75",{
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                username: user.username
            }
        };

        return tokenReturn;

    }
}

export { AuthenticateUserUseCase };
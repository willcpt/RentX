import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";


interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase{
    
    
    constructor(
            @inject("CategoriesRepository")
            private categoriesRepository: ICategoriesRepository
          ) {}

    async execute({ description, name }: IRequest): Promise<void>{
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists){
            throw new Error("Category Already exists!");
            
        }

        this.categoriesRepository.create({name, description });
    }

}

export { CreateCategoryUseCase}
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification"; 
import { ICreateSpecificationDTO, ISpecificationRepository } from "./implementations/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationRepository{
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
   
    
    async create({ description, name }: ICreateSpecificationDTO) {
      const specification = this.repository.create({
        name,
        description,
      });

      await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
             name,
        });
        
        return specification;
    }


}

export { SpecificationsRepository };
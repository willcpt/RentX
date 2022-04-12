import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
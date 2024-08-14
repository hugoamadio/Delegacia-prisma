import { Router } from "express";
import ArmController from "../controllers/arm.controller";


const routes = () => {
  const router = Router();
  const controller = new ArmController();
  
  router.post("/", controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.show);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export default routes;
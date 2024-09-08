import express,{ Router } from "express"
import * as taskController from "../controllers/task.controller"
const router: Router = Router()
router.get("/", taskController.index)
router.get("/detail/:id", taskController.detail)
export const  taskRoutes: Router = router
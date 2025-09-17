import { request, response, Router } from "express";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserApplicationService } from "../../application/UserApplicationService";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// Inicialización de capas -> Adapter, Application, Controller

const userAdapter = new UserAdapter();
const userApp = new UserApplicationService(userAdapter);
const userController = new UserController(userApp);
router.post("/login",async(request,response)=>{
    await userController.login(request,response);
})


router.get("/users", authenticateToken, async (request, response) => {
    try {
        await userController.getAllUsers(request, response);
    } catch (error) {
        response.status(400).json({ Message: "Error al obtener datos" });
    }
});

router.get("/users/:id", async (request, response) => {
    try {
        await userController.getUserById(request, response);
    } catch (error) {
        response.status(400).json({ Message: "Error al obtener datos" });
    }
});


router.post("/users", async (request, response) => {
    try {
        await userController.registerUser(request, response);
    } catch (error) {
        response.status(400).json({ Message: "Error registro usuario" });
    }
});

router.put("/users/:id", async (request, response) => {
    try {
        await userController.updateUser(request, response);
    } catch (error) {
        response.status(400).json({ Message: "Error al actualizar datos" });
    }
});

router.get("/users/email/:email", async (request, response) => {
    try {
        await userController.getUserByEmail(request, response);
    } catch (error) {
        response.status(400).json({ Message: "Error al obtener usuario por email" });
    }
});

router.delete("/users/:id", async (request, response) => {
    try {
        await userController.deleteUserById(request, response);
    } catch (error) {
        response.status(400).json({ Message: "Error al eliminar usuario" });
    }
});

export default router;

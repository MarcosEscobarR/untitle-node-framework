import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Post,
  Put,
} from "../../libs/decorators";
import { UserModel } from "./models";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "./services";

@Controller("/api/user")
export class UserController {
  @Get("/")
  get() {
    return getAllUsers();
  }

  @Post("/")
  create(@Body() body: UserModel) {
    return createUser(body);
  }

  @Put("/:id")
  update(@Params("id") id: number, @Body() body: UserModel) {
    return updateUser(id, body);
  }

  @Delete("/:id")
  delete(@Params("id") id: number) {
    return deleteUser(id);
  }
}

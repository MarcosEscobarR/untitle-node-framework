import { UserModel } from "../models";

const users: UserModel[] = [
  {
    id: 1,
    name: "admin",
    email: "test@test.com",
    password: "test",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getAllUsers = () => users;

export const getUserById = (id: number) => users.find((user) => user.id === id);

export const createUser = (user: UserModel) => {
  users.push(user);
  return user;
};

export const updateUser = (id: number, user: UserModel) => {
  const index = users.findIndex((user) => user.id === id);
  users[index] = user;
  return user;
};

export const deleteUser = (id: number) => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return id;
};

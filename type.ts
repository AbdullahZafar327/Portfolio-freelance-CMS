import { IOrder, IProject, IUser } from "./lib/mongodb"

export type ProjectWithUser = IProject & {
    project_user: IUser
}

export type Order_Project_User = IOrder & {
    Order_user:IUser;
    Order_project:IProject
}
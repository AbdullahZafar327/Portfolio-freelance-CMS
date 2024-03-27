import { IProject, IUser } from "./lib/mongodb"

export type ProjectWithUser = IProject & {
    project_user: IUser
}
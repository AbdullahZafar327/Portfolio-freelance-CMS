import mongoose, { Schema, Types, model, models } from 'mongoose';

export enum Role{
  Admin="Admin",
  Guest="Guest"
}

export interface IUser {
  _id:Types.ObjectId,
  user_id: string;
  user_name: string;
  user_email: string;
  user_image: string;
  role:Role
  user_projects: { _id: Types.ObjectId }[];
}

export const UserSchema = new Schema<IUser>({
  _id:{type:Schema.Types.ObjectId,auto:true},
  user_id: String,
  user_name: String,
  user_email: String,
  user_image: String,
  role:{type:String,default:Role.Guest,enum:Object.values(Role)},
  user_projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, { timestamps: true });

const User = models?.['User'] || model<IUser>('User', UserSchema);




export enum status {
  inQueue="inQueue",
  inProgress="inProgress",
  rejected="rejected",
  completed="completed"
}

export interface IProject {
  _id:Types.ObjectId;
  project_title: string;
  project_type: string;
  project_requirements: string;
  project_description: string;
  project_status:status;
  project_progress: number;
  project_user: Types.ObjectId;
  projectFiles:string[]
  createdAt?:Date
}




const ProjectSchema = new Schema<IProject>({
  _id:{type:Schema.Types.ObjectId,auto:true},
  project_title: String,
  project_type: String,
  project_requirements: String,
  project_description: String,
  project_status:{type:String,default:status.inQueue,enum:Object.values(status)},
  project_progress: {type:Number,default:0},
  projectFiles:[{type:String}],
  project_user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Project = models?.['Project'] || model<IProject>('Project', ProjectSchema);

export {User,Project}

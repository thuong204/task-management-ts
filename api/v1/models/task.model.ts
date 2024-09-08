import mongoose, { Document, Schema } from 'mongoose';

// Define the schema type interface
export interface TaskDocument extends Document {
  title?: string;
  status?: string;
  content?: string;
  createdBy?: string;
  listUser?: any[];
  taskParentId?: string;
  timeStart?: Date;
  timeFinish?: Date;
  deleted: boolean;
}

// Define the schema
const taskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: false },
    status: { type: String, required: false },
    content: { type: String, required: false },
    createdBy: { type: String, required: false },
    taskParentId: { type: String, required: false },
    timeStart: { type: Date, required: false },
    timeFinish: { type: Date, required: false },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create the model
const Task = mongoose.model<TaskDocument>('Task', taskSchema, 'tasks');

export default Task;

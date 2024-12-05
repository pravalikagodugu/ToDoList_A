import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
    },
});


const todoList = model("todo", todoSchema);

export default todoList;

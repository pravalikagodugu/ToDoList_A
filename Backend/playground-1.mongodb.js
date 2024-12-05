/* global use, db */
// MongoDB Playground for ToDoList Project

// Select the database to use
use('todoDatabase'); // Replace with your database name if different

// Insert sample documents into the todoList collection
db.getCollection('todoList').insertMany([
  { 
    task: 'Complete React project', 
    status: 'In Progress', 
    deadline: new Date('2024-12-10T18:00:00Z') 
  },
  { 
    task: 'Prepare for meeting', 
    status: 'Pending', 
    deadline: new Date('2024-12-08T09:00:00Z') 
  },
  { 
    task: 'Submit assignment', 
    status: 'Completed', 
    deadline: new Date('2024-12-01T23:59:59Z') 
  }
]);

// Find all tasks with 'Pending' status
const pendingTasks = db.getCollection('todoList').find({ status: 'Pending' }).toArray();
console.log('Pending tasks:', pendingTasks);

// Find tasks with a deadline within the next 7 days
const upcomingTasks = db.getCollection('todoList').find({
  deadline: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
}).toArray();
console.log('Tasks due within the next 7 days:', upcomingTasks);

// Update the status of a specific task (example: mark as 'Completed')
db.getCollection('todoList').updateOne(
  { task: 'Prepare for meeting' }, 
  { $set: { status: 'Completed' } }
);

// Delete a task by its task name
db.getCollection('todoList').deleteOne({ task: 'Submit assignment' });
console.log('Deleted task: Submit assignment');

// Aggregate tasks grouped by status
const tasksByStatus = db.getCollection('todoList').aggregate([
  { $group: { _id: '$status', count: { $sum: 1 } } }
]).toArray();
console.log('Tasks grouped by status:', tasksByStatus);

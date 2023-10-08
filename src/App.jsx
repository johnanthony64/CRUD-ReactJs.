import React, { useState, useEffect } from "react";
import "./index.css";

// Individual Task Component
const TaskItem = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.name);

    useEffect(() => {
        setEditValue(task.name);
    }, [task.name]);

    const handleUpdate = () => {
        onUpdate(task.id, editValue);
        setIsEditing(false);
    };

    return (
        <li className="task-item">
            {isEditing ? (
                <>
                    <input 
                        className="task-input" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)} 
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    {task.name}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
};

// Task Form Component
const TaskForm = ({ onAdd }) => {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }
        onAdd(task);
        setTask("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Enter task..." 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

const TaskDisplay = ({ tasks }) => {
    return (
        <ul className="task-display">
            {tasks.map(task => (
                <li key={task.id}>{task.name}</li>
            ))}
        </ul>
    );
};

// Main Task List Component
const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (name) => {
        const newTask = { id: Date.now(), name };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id) => {
        const remainingTasks = tasks.filter((task) => task.id !== id);
        setTasks(remainingTasks);
    };

    const updateTask = (id, name) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, name } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="task-management">
            <TaskForm onAdd={addTask} />
            <div className="columns">
                <div className="column">
                    <h2>Edit Tasks</h2>
                    <ul>
                        {tasks.map((task) => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                onDelete={deleteTask} 
                                onUpdate={updateTask} 
                            />
                        ))}
                    </ul>
                </div>
                <div className="column">
                    <h2>All Tasks</h2>
                    <TaskDisplay tasks={tasks} />
                </div>
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="app">
            <h1>Task Manager</h1>
            <TaskList />
        </div>
    );
};

export default App;

import React, {useState} from "react";

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
  }
  
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const taskStatus = {
    TODO: 'TODO',
    COMPLETED: 'COMPLETED',
}

const Task = ({ title, description, onRemove }) => {
    const [status, setState] = useState(taskStatus.TODO);

    return (
        <span>
            <input type="checkbox" />
            <strong>{title}</strong>
            <p>{description}</p>
            <button type="button" onClick={onRemove}>Remove</button>
        </span>
    );
}

const NewTask = ({ onAddTask, totalTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        // Check if title and description are not empty
        if (title.trim() === '' || description.trim() === '') {
            alert('Please enter both title and description.');
            return;
        }

        // Create a new task object
        const newTask = {
            id: totalTasks + 1,
            title,
            description,
        };

        // Call the onAddTask callback to add the new task to the tasksData array
        onAddTask(newTask);

        // Clear the input fields
        setTitle('');
        setDescription('');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddTask}>Add</button>
        </div>
    );
}

const Tasks = () => {
    const [tasksData, setTaskData] = useState(getTasksFromLocalStorage());

    const handleAddTask = (newTask) => {
        const updatedTasks = [...tasksData, newTask]
        setTaskData(updatedTasks);
        saveTasksToLocalStorage(updatedTasks)
    };

    const handlRemoveTask = (taskId) => {
        const updatedTasks = tasksData.filter(task => task.id !== taskId)
        setTaskData(updatedTasks);
        saveTasksToLocalStorage(updatedTasks)
    };

    return (
        <div>
            <ul>
                {tasksData.map(task => (
                    <li key={task.id}>
                        <Task
                            title={task.title}
                            description={task.description}
                            onRemove={() => handlRemoveTask(task.id)}
                        />
                    </li>
                ))}
          </ul>
          <NewTask onAddTask={handleAddTask} totalTasks={tasksData.length} />
        </div>
    );
};

export default Tasks;
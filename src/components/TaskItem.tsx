import React from 'react';
import {Priority, Task} from "../model/models";

const TaskItem: React.FC<{ task: Task, updateTask: (task: Task) => void }> = ({task, updateTask}) => {
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateTask({...task, priority: Priority[e.target.value.toUpperCase() as keyof typeof Priority]});
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTask({...task, category: e.target.value});
    };

    return (
        <li>
            <span>{task.title}</span>
            <select value={task.priority.value} onChange={handlePriorityChange}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <input type="text" value={task.category} onChange={handleCategoryChange}/>
        </li>
    );
};

export default TaskItem;
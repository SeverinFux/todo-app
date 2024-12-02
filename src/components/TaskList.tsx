import React, {useState} from 'react';
import TaskForm from './TaskForm';
import {Priority, Task} from '../model/models';
import {Table, TableColumnsType} from 'antd';
import {Utils} from "../utils/utils";


const defaultTaskList: Task[] = [
    {
        id: 1,
        title: 'Aufräumen',
        priority: Priority.HIGH,
        category: 'General',
        dueDate: new Date('2021-09-01'),
    },
    {
        id: 2,
        title: 'Einkaufen',
        priority: Priority.MEDIUM,
        category: 'General',
        dueDate: new Date('2021-09-02'),
    },
    {
        id: 3,
        title: 'Znacht kochen',
        priority: Priority.LOW,
        category: 'General',
        dueDate: new Date('2021-09-03'),
    },
];


const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(defaultTaskList);
    const [editTask, setEditTask] = useState<Task | undefined>(undefined);

    const addTask = (task: Task) => {
        setTasks(prevTasks => {
            const taskExists = prevTasks.some(t => t.id === task.id);
            if (taskExists) {
                // Replace the task with the same ID
                return prevTasks.map(t => (t.id === task.id ? task : t));
            } else {
                // Add the new task
                return [...prevTasks, task];
            }
        });
    };
        const editClicked = (task: Task) => {
        setEditTask(task)
    }

    const columns: TableColumnsType<Task> = [
        {
            title: 'Titel',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => Utils.sortByString(a.title, b.title),
            ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => Utils.sortByString(a.category, b.category),
            ellipsis: true,
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            sorter: (a, b) => Utils.sortByNumber(a.priority.weight, b.priority.weight),
            ellipsis: true,
            render: (priority) => priority.value,
        },
        {
            title: 'Todo until',
            dataIndex: 'dueDate',
            key: 'dueDate',
            sorter: (a, b) => Utils.sortByDate(a.dueDate!, b.dueDate!),
            defaultSortOrder: 'ascend',
            ellipsis: true,
            render: (dueDate: Date) => dueDate.toLocaleDateString(),
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (_, task) => (
                <a onClick={() => editClicked(task)}>Edit</a>
            ),
        },
    ];

    return (
        <div>
            <TaskForm addTask={addTask} editTask={editTask}/>
            <br/>
            <Table<Task> style={{marginTop: "16px"}} pagination={false} columns={columns} dataSource={tasks}/>
        </div>
    );
};

export default TaskList;

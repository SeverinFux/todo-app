import React, {useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import {Priority, Task} from '../model/models';
import {Button, Popconfirm, Segmented, Table, TableColumnsType} from 'antd';
import Util from "../utility/Util";
import {Content} from "antd/lib/layout/layout";
import { format } from 'date-fns';


const defaultTaskList: Task[] = [
    {
        id: 'idk any uuids',
        title: 'Aufräumen',
        priority: Priority.HIGH,
        category: 'General',
        dueDate: new Date('2021-09-01'),
        done: false,
    },
    {
        id: 'idk two different uuids',
        title: 'Einkaufen',
        priority: Priority.MEDIUM,
        category: 'General',
        dueDate: new Date('2021-09-02'),
        done: false,
    },
    {
        id: 'idk three different uuids',
        title: 'Znacht kochen',
        priority: Priority.LOW,
        category: 'General',
        dueDate: new Date('2021-09-03'),
        done: false,
    },
];
const optionsInitial: { value: string }[] = [
    {value: 'General'},
    {value: 'Work'},
    {value: 'Personal'},
    {value: 'Shopping'},
    {value: 'Others'},
];


const TaskList: React.FC = () => {
    const [allTasks, setAllTasks] = useState<Task[]>(defaultTaskList);
    const [visibleTasks, setVisibleTasks] = useState<Task[]>();
    const [editTask, setEditTask] = useState<Task | undefined>(undefined);
    const [categoryAutocomplete, setCategoryAutocomplete] = useState<{ value: string }[]>(optionsInitial);
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');


    const updateVisibleTasks = (tasks: Task[]) => {
        let filteredTasks = tasks.filter(task => !task.done); // Filter tasks where done is false
        if (priorityFilter !== 'all') {
            const priority = Priority[priorityFilter.toUpperCase() as keyof typeof Priority];
            filteredTasks = filteredTasks.filter(task => task.priority === priority);
        }
        if (categoryFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === categoryFilter);
        }
        setVisibleTasks(filteredTasks);
    }
    useEffect(() => {
        updateVisibleTasks(allTasks);
        console.log("oh oh vv" )
    }, [allTasks, priorityFilter, categoryFilter]);

    const addOrUpdateTask = (task: Task) => {
        setAllTasks(prevTasks => {
            const taskExists = prevTasks.some(t => t.id === task.id);
            if (taskExists) {
                return prevTasks.map(t => (t.id === task.id ? task : t));
            } else {
                return [...prevTasks, task];
            }
        });
        updateVisibleTasks([...allTasks, task]);
    };

    const editClicked = (task: Task) => {
        setEditTask(task)
    }
    const doneClicked = (task: Task) => {
        task.done = true
        addOrUpdateTask(task)
    }

    const columns: TableColumnsType<Task> = [
        {
            title: 'Titel',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => Util.sortByString(a.title, b.title),
            ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => Util.sortByString(a.category, b.category),
            ellipsis: true,
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            sorter: (a, b) => Util.sortByNumber(a.priority.weight, b.priority.weight),
            ellipsis: true,
            render: (priority) => priority?.value,
        },
        {
            title: 'Todo until',
            dataIndex: 'dueDate',
            key: 'dueDate',
            sorter: (a, b) => Util.sortByDate(a.dueDate!, b.dueDate!),
            defaultSortOrder: 'ascend',
            ellipsis: true,
            render: (dueDate: Date) => format(dueDate, 'd. MMM yyyy'),
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (_, task) => (
                <Button onClick={() => editClicked(task)}>Edit</Button>
            ),
        },
        {
            title: 'Done',
            key: 'done',
            render: (_, task) => (
                <Popconfirm
                    title="Mark this task as done"
                    description="Have you completed this task?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => doneClicked(task)}
                >
                    <Button>Done</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Content style={{padding: '0 48px'}}>
            <TaskForm addTask={addOrUpdateTask} editTask={editTask} categoryAutocomplete={categoryAutocomplete}
                      setCategoryAutocomplete={setCategoryAutocomplete}/>
            <br/>
            <Segmented style={{marginTop: "16px"}} value={priorityFilter} onChange={setPriorityFilter}
                       options={['all', 'high', 'medium', 'low',]}/>
            <br/>
            <Segmented
                style={{marginTop: "16px"}}
                value={categoryFilter}
                onChange={value => setCategoryFilter(value.toString())}
                options={['all', ...categoryAutocomplete.map(cat => cat.value)]}
            />
            <br/>
            <Table<Task> style={{marginTop: "16px"}} pagination={false} columns={columns} dataSource={visibleTasks}/>
        </Content>
    );
};

export default TaskList;

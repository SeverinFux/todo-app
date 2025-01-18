import React, {useEffect, useState} from 'react';
import {Priority, Task} from "../model/models";
import {AutoComplete, Button, DatePicker, Form, Input, Modal, Segmented, Space} from "antd";
import dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';


const TaskForm: React.FC<{
    addTask: (task: Task) => void;
    editTask?: Task;
    categoryAutocomplete: { value: string }[];
    setCategoryAutocomplete: (s: { value: string }[]) => void
}> =
    ({
         addTask,
         editTask,
         categoryAutocomplete,
         setCategoryAutocomplete
     }) => {
        const [form] = Form.useForm();
        const [isModalOpen, setIsModalOpen] = useState(false);

        const showModal = () => {
            setIsModalOpen(true);
        };

        const hideModal = () => {
            setIsModalOpen(false);
            form.resetFields();
        };

        const handleCategoryChange = (value: string) => {
            if (!categoryAutocomplete.some(option => option.value.toLowerCase() === value.toLowerCase())) {
                setCategoryAutocomplete([...categoryAutocomplete, {value}]);
            }
        };

        const handleSubmit = (values:Task ) => {
            hideModal();
            const newTask: Task = {
                id: editTask?.id || uuidv4(),
                title: values.title,
                priority: Priority[values.priority.value.toUpperCase() as keyof typeof Priority],
                category: values.category,
                dueDate: values.dueDate ? values.dueDate : null,
                done: false,
            };
            handleCategoryChange(newTask.category);
            console.log(newTask);

            addTask(newTask);
            form.resetFields();
        };

        useEffect(() => {
            if (editTask) {
                setIsModalOpen(true);
                form.setFieldsValue({
                    title: editTask.title,
                    priority: editTask.priority.value,
                    category: editTask.category,
                    dueDate: editTask.dueDate ? dayjs(editTask.dueDate) : null,
                    done: false,
                });
            }
        }, [editTask, form]);

        return (
            <Space style={{marginTop: "16px"}}>
                <Button type="primary" onClick={showModal}>
                    +
                </Button>
                <Modal open={isModalOpen} footer={[]} onCancel={hideModal}>
                    <Form
                        form={form}
                        style={{maxWidth: 600}}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label={"Task Title"}
                            name="title"
                            rules={[{required: true, message: 'Please input the task title!'}]}
                        >
                            <Input placeholder="Task Title"/>
                        </Form.Item>
                        <Form.Item
                            label={"Priority"}
                            name="priority"
                            initialValue="medium"
                            rules={[{required: true, message: 'Please select the priority!'}]}
                        >
                            <Segmented options={['high', 'medium', 'low']}/>
                        </Form.Item>
                        <Form.Item
                            label={"Category"}
                            name="category"
                            initialValue="General"
                            rules={[{required: true, message: 'Please input the category!'}]}
                        >
                            <AutoComplete
                                id={"categoryInput"}
                                options={categoryAutocomplete}
                                filterOption={(inputValue, option) =>
                                    option!.value!.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                placeholder="Category"
                            />
                        </Form.Item>
                        <Form.Item
                            label={"Due Date"}
                            name="dueDate"
                            rules={[{required: true, message: 'Please select the due date!'}]}
                        >
                            <DatePicker
                                style={{width: '100%'}}
                                format="DD-MM-YYYY"
                                id={"dueDateInput"}
                                disabledDate={(current) => {
                                    // Disable all dates before today
                                    return current && current < dayjs().startOf('day');
                                }}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editTask ? 'Update Task' : 'Add Task'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Space>
        );
    };

export default TaskForm;

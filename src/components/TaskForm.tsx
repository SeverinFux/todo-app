import React, {useEffect, useState} from 'react';
import {Priority, Task} from "../model/models";
import {AutoComplete, Button, DatePicker, Form, Input, Modal, Segmented, Space} from "antd";
import dayjs from "dayjs"; // For handling date formatting

const optionsInitial: { value: string }[] = [
    {value: 'General'},
    {value: 'Work'},
    {value: 'Personal'},
    {value: 'Shopping'},
    {value: 'Others'},
];

const TaskForm: React.FC<{ addTask: (task: Task) => void; editTask?: Task }> =
    ({
         addTask,
         editTask
     }) => {
        const [form] = Form.useForm();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [categoryAutocomplete, setCategoryAutocomplete] = useState<{ value: string }[]>(optionsInitial);

        const showModal = () => {
            setIsModalOpen(true);
        };

        const hideModal = () => {
            setIsModalOpen(false);
            form.resetFields(); // Reset form when modal is closed
        };

        const handleCategoryChange = (value: string) => {
            // Check if the value exists in the options
            if (!categoryAutocomplete.some(option => option.value.toLowerCase() === value.toLowerCase())) {
                // Add the new category to the options
                setCategoryAutocomplete([...categoryAutocomplete, {value}]);
            }
        };

        const handleSubmit = (values: any) => {
            hideModal();
            const newTask: Task = {
                id: editTask?.id || Date.now(), // Use existing ID for edit or generate a new one
                title: values.title,
                priority: Priority[values.priority.toUpperCase() as keyof typeof Priority],
                category: values.category,
                dueDate: values.dueDate ? values.dueDate.toDate() : null,
            };
            handleCategoryChange(newTask.category);
            console.log(newTask);

            addTask(newTask);
            form.resetFields();
        };

        useEffect(() => {
            if (editTask) {
                setIsModalOpen(true); // Open modal automatically for editing
                form.setFieldsValue({
                    title: editTask.title,
                    priority: editTask.priority.value, // Use `value` for the segmented control
                    category: editTask.category,
                    dueDate: editTask.dueDate ? dayjs(editTask.dueDate) : null, // Format date for DatePicker
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
                            <DatePicker style={{width: '100%'}} format="DD-MM-YYYY"/>
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

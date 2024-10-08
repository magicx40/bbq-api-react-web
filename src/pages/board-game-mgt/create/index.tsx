import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";

interface CreateBoardGameProps {
    open: boolean;
    confirmLoading: boolean;
    onOk: (e: any) => void;
    onCancel: (e: any) => void;
}

export default function CreateBoardGame({ open, confirmLoading, onOk, onCancel }: CreateBoardGameProps) {
    const [form] = Form.useForm();

    const handleOk = (e: any) => {
        form.validateFields().then((values) => {
            onOk(e);
        }).catch((error) => {
            console.log(error);
        });
    };
    const handleCancel = (e: any) => {
        form.resetFields();
        onCancel(e);
    };
    return (
        <Modal
            className="create-board-game-modal"
            title="创建桌游"
            open={open}
            confirmLoading={confirmLoading}
            okText="确认"
            cancelText="取消"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name="create_board_game"
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="游戏名称"
                    rules={[{ required: true, message: '请输入游戏名称!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="游戏简介"
                    rules={[{ required: true, message: '请输入游戏简介!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="minPlayers"
                    label="最小玩家数"
                    rules={[{ required: true, message: '请输入最小玩家数!', type: 'number' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="maxPlayers"
                    label="最大玩家数"
                    rules={[{ required: true, message: '请输入最大玩家数!', type: 'number' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="playTime"
                    label="游玩时长"
                    rules={[{ required: true, message: '请输入游玩时长!', type: 'number' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="ageRating"
                    label="年龄评级"
                    rules={[{ required: true, message: '请输入年龄评级!', type: 'number' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="publisher"
                    label="游戏类型"
                    rules={[{ required: true, message: '请输入游戏类型!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="releaseDate"
                    label="发布日期"
                    rules={[{ required: true, message: '请选择发布日期!' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="游戏类别"
                    rules={[{ required: true, message: '请输入游戏类别!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="imageUrl"
                    label="图片链接"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
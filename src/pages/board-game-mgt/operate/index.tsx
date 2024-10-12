import {
    createBoardGame,
    updateBoardGame as updateBoardGameApi,
} from '@/api/board-game-mgt';
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    message as Msg,
} from 'antd';
import { DataType } from '../Index';
import { omit } from 'lodash';

interface OperateBoardGameProps {
    open: boolean;
    type: 'create' | 'edit';
    record: ({ id: number } & DataType) | null;
    confirmLoading: boolean;
    getBoardGames: () => void;
    onOk: (e: any) => void;
    onCancel: (e: any) => void;
}

export default function OperateBoardGame({
    open,
    type,
    record,
    confirmLoading,
    onOk,
    onCancel,
    getBoardGames,
}: OperateBoardGameProps) {
    const [form] = Form.useForm();

    const handleOk = (e: any) => {
        form.validateFields()
            .then(async valueMap => {
                if (type === 'create') {
                    await createBGame(valueMap);
                } else {
                    await updateBoardGame({
                        id: record?.id,
                        ...valueMap,
                    });
                }
                onOk(e);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const createBGame = async (createForm: any) => {
        console.log('v', createForm);
        createForm.releaseDate = createForm?.releaseDate?.format('YYYY-MM-DD');
        try {
            const { code, message }: any = await createBoardGame(createForm);
            if (code === 200) {
                Msg.success(message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateBoardGame = async (record: { id: number } & DataType) => {
        try {
            const { code, message }: any = await updateBoardGameApi(
                record.id,
                omit(
                    {
                        ...record,
                    },
                    'id'
                )
            );
            if (code === 200) {
                Msg.success(message);
                getBoardGames();
            }
        } catch (err) {
            console.error(err);
        }
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
                    rules={[
                        {
                            required: true,
                            message: '请输入最小玩家数!',
                            type: 'number',
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="maxPlayers"
                    label="最大玩家数"
                    rules={[
                        {
                            required: true,
                            message: '请输入最大玩家数!',
                            type: 'number',
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="playTime"
                    label="游玩时长"
                    rules={[
                        {
                            required: true,
                            message: '请输入游玩时长!',
                            type: 'number',
                        },
                    ]}
                >
                    <InputNumber min={1} suffix="分钟" />
                </Form.Item>

                <Form.Item
                    name="ageRating"
                    label="年龄评级"
                    rules={[
                        {
                            required: true,
                            message: '请输入年龄评级!',
                            type: 'number',
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                    name="publisher"
                    label="出版商"
                    rules={[{ required: true, message: '请输入出版商!' }]}
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
                    label="游戏分类"
                    rules={[{ required: true, message: '请输入游戏分类!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="imageUrl" label="图片链接">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

import { createContent as createContentApi } from '@/api/python-learn';
import { Form, Input, Modal, message as Msg } from 'antd';
import { merge } from 'lodash';

interface CreateContentProps {
    open: boolean;
    confirmLoading: boolean;
    chapterId: number;
    refresh: () => void;
    onOk: (e: any) => void;
    onCancel: (e: any) => void;
}
export default function CreateContent({
    open,
    confirmLoading,
    chapterId,
    refresh,
    onOk,
    onCancel,
}: CreateContentProps) {
    const [form] = Form.useForm();

    const handleOk = (e: any) => {
        form.validateFields()
            .then(async valueMap => {
                await createContent(merge(valueMap, { chapterId }));
                onOk(e);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const createContent = async (params: {
        functionName: string;
        explanation: string;
        example: string;
        chapterId: number;
    }) => {
        try {
            const { code, message }: any = await createContentApi(params);
            if (code === 200) {
                Msg.success(message);
                refresh();
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
            className="create-content-modal"
            title="创建内容"
            open={open}
            confirmLoading={confirmLoading}
            okText="确认"
            cancelText="取消"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name="create_content"
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    name="functionName"
                    label="函数名"
                    rules={[{ required: true, message: '请输入函数名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="explanation"
                    label="释义"
                    rules={[{ required: true, message: '请输入释义!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="example"
                    label="示例"
                    rules={[{ required: true, message: '请输入示例!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

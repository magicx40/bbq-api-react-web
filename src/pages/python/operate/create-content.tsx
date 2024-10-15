import { createContent as createContentApi } from '@/api/python-learn';
import AceEditor from '@/components/ace-editor';
import { Form, Input, Modal, message as Msg, Radio } from 'antd';
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
    const type = Form.useWatch('type', form);

    const handleOk = (e: any) => {
        form.validateFields()
            .then(async valueMap => {
                await createContent(merge(valueMap, { chapterId }));
                form.resetFields();
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
        type: number;
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
            width={1000}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name="create_content"
                form={form}
                initialValues={{ type: 0 }}
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
                    name="type"
                    label="示例类型"
                    rules={[{ required: true, message: '请输入示例类型!' }]}
                >
                    <Radio.Group>
                        <Radio value={0}>文本</Radio>
                        <Radio value={1}>代码</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="example"
                    label="示例"
                    rules={[{ required: true, message: '请输入示例!' }]}
                >
                    {type === 1 ? (
                        <AceEditor height="200px" width="100%" />
                    ) : (
                        <Input.TextArea rows={4} />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
}

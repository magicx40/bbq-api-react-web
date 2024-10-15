import { createChapter as createChapterApi } from '@/api/python-learn';
import { Form, Input, Modal, message as Msg } from 'antd';

interface CreateChapterProps {
    open: boolean;
    confirmLoading: boolean;
    refresh: () => void;
    onOk: (e: any) => void;
    onCancel: (e: any) => void;
}
export default function CreateChapter({
    open,
    confirmLoading,
    refresh,
    onOk,
    onCancel,
}: CreateChapterProps) {
    const [form] = Form.useForm();

    const handleOk = (e: any) => {
        form.validateFields()
            .then(async valueMap => {
                await createChapter(valueMap);
                onOk(e);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const createChapter = async (params: { title: string }) => {
        try {
            const { code, message }: any = await createChapterApi(params);
            if (code === 200) {
                Msg.success(message);
                form.resetFields();
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
            className="create-chapter-modal"
            title="创建章节"
            open={open}
            confirmLoading={confirmLoading}
            okText="确认"
            cancelText="取消"
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name="create_chapter"
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="章节名"
                    rules={[{ required: true, message: '请输入章节名!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

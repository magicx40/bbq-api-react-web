import { Form, Input, Modal, Radio, message as Msg } from 'antd';
import { createPRD as createPRDApi } from '@/api/prd';
import { PrdPriorityEnum } from '../prd.enum';
import { useSelector } from 'react-redux';

const PRDPriorityList = Object.keys(PrdPriorityEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
        label: key,
        value: PrdPriorityEnum[key as keyof typeof PrdPriorityEnum],
        default:
            PrdPriorityEnum[key as keyof typeof PrdPriorityEnum] ===
            PrdPriorityEnum.High,
    }));

interface CreatePRDProps {
    open: boolean;
    confirmLoading: boolean;
    refresh: () => void;
    onOk: (e: any) => void;
    onCancel: (e: any) => void;
}
export default function CreatePRD({
    open,
    confirmLoading,
    refresh,
    onOk,
    onCancel,
}: CreatePRDProps) {
    const [form] = Form.useForm();
    const { userId } = useSelector((store: any) => store.user);

    const handleOk = (e: any) => {
        form.validateFields()
            .then(async valueMap => {
                valueMap.createdBy = userId;
                await createContent(valueMap);
                form.resetFields();
                onOk(e);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const createContent = async (params: {
        title: string;
        description: string;
        priority: number;
        createdBy: number;
    }) => {
        try {
            const { code, message }: any = await createPRDApi(params);
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
            className="create-prd-modal"
            title="创建PRD"
            open={open}
            confirmLoading={confirmLoading}
            okText="确认"
            cancelText="取消"
            width={650}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                name="create_prd_content"
                form={form}
                initialValues={{ priority: PrdPriorityEnum.High }}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '请输入标题!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="详情"
                    rules={[{ required: true, message: '请输入详情!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="priority"
                    label="优先级"
                    rules={[{ required: true, message: '请选择优先级!' }]}
                >
                    <Radio.Group>
                        {PRDPriorityList.map(priority => {
                            return (
                                <Radio
                                    key={priority.value}
                                    value={priority.value}
                                >
                                    {priority.label}
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
}

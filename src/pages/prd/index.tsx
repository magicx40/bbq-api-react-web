import {
    Button,
    Modal,
    Table,
    TableProps,
    message as Msg,
    Tooltip,
} from 'antd';
import { deletePRDById, getPrdList } from '@/api/prd';
import './index.scss';
import { useEffect, useState } from 'react';
import CreatePRD from './operate/create-prd';

interface DataType {
    id: number;
    title: string;
    description: string;
    priority: number;
    createdBy: number;
    createdAt: Date;
}

const getColumns = (
    handleDelete: Function
): TableProps<DataType>['columns'] => {
    return [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            render: (_, { description }) => {
                return description?.length > 20 ? (
                    <Tooltip
                        title={description}
                        overlayStyle={{ whiteSpace: 'pre-wrap' }}
                    >
                        <span>{description?.slice(0, 20)}...</span>
                    </Tooltip>
                ) : (
                    description
                );
            },
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: '创建人',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => handleDelete(record)}>
                    删除
                </Button>
            ),
        },
    ];
};

export default function Prd() {
    const [dataSource, setDataSource] = useState([]);
    const [prdOpen, setPrdOpen] = useState(false);
    const [prdConfirmLoading, setPrdConfirmLoading] = useState(false);

    const getPrdListData = async () => {
        const { code, data }: any = await getPrdList();
        if (code === 200) {
            const newData = data?.map((item: any, index: number) => ({
                ...item,
                key: index,
                createdBy: item?.createdBy?.username,
            }));
            setDataSource(newData);
        }
    };

    const deletePrd = async ({ id }: DataType) => {
        Modal.warning({
            title: '删除PRD',
            content: '请确认是否删除该PRD？',
            closable: true,
            onOk: async () => {
                try {
                    const { code, message }: any = await deletePRDById({
                        id,
                    });
                    if (code === 200) {
                        Msg.success(message);
                        getPrdListData();
                    }
                } catch (err) {
                    console.error(err);
                }
            },
        });
    };

    const handleCreatePRDOperate = () => {
        setPrdOpen(false);
        setPrdConfirmLoading(false);
    };

    const handleCreatePRDOpen = () => {
        setPrdOpen(true);
    };

    const handleDelete = (record: DataType) => {
        deletePrd(record);
    };

    const columns = getColumns(handleDelete);

    useEffect(() => {
        getPrdListData();
    }, []);
    return (
        <div className="prd-page">
            <div className="prd-header">
                <h2>PRD列表</h2>
                <div className="header-extra-actions">
                    <Button type="primary" onClick={handleCreatePRDOpen}>
                        新建PRD
                    </Button>
                </div>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <CreatePRD
                open={prdOpen}
                confirmLoading={prdConfirmLoading}
                refresh={getPrdListData}
                onOk={handleCreatePRDOperate}
                onCancel={handleCreatePRDOperate}
            />
        </div>
    );
}

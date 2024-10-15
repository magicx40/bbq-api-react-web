import {
    Button,
    Collapse,
    CollapseProps,
    Empty,
    Modal,
    Table,
    TableProps,
    theme,
    message as Msg,
} from 'antd';
import './index.scss';
import {
    deletePyContent,
    getPyChapters as getPyChaptersApi,
} from '@/api/python-learn';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import CreateChapter from './operate/create-chapter';
import CreateContent from './operate/create-content';
import AceEditor from '@/components/ace-editor';

export interface DataType {
    functionName: string;
    explanation: string;
    example: string;
}

export interface ContentColumn extends DataType {
    id: number;
}

const getColumns = ({
    handleEdit,
    handleDelete,
}: {
    handleEdit: (record: ContentColumn) => void;
    handleDelete: (record: ContentColumn) => void;
}): TableProps<ContentColumn>['columns'] => {
    return [
        {
            title: '函数',
            dataIndex: 'functionName',
            key: 'functionName',
        },
        {
            title: '释义',
            dataIndex: 'explanation',
            key: 'explanation',
        },
        {
            title: '示例',
            dataIndex: 'example',
            key: 'example',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleDelete(record)}>
                        删除
                    </Button>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        查看示例
                    </Button>
                </>
            ),
        },
    ];
};

export default function PythonLearn() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [contents, setContents] = useState<any[]>([]);
    const [chapterOpen, setChapterOpen] = useState(false);
    const [chapterConfirmLoading, setChapterConfirmLoading] = useState(false);
    const [contentOpen, setContentOpen] = useState(false);
    const [contentConfirmLoading, setContentConfirmLoading] = useState(false);
    const [chapterId, setChapterId] = useState(-1);
    const handleEdit = (record: ContentColumn) => {
        showContentDetail(record.example);
    };
    const handleDelete = async ({ id }: ContentColumn) => {
        deleteContentByWarning(id);
    };
    const columns = getColumns({
        handleEdit,
        handleDelete,
    });

    const getItems = () => {
        return contents.map((item: any) => {
            return {
                key: `${item.id}`,
                label: item.title,
                children: (
                    <div className="python-learn-content-table">
                        <Button
                            type="primary"
                            ghost
                            onClick={() => handleCreateContent(item.id)}
                        >
                            添加知识
                        </Button>
                        <Table
                            dataSource={item.contents.map((d: any) => ({
                                ...d,
                                key: `${d.id}`,
                            }))}
                            columns={columns}
                            pagination={false}
                        />
                    </div>
                ),
            };
        }) as CollapseProps['items'];
    };
    const items = getItems();

    const showContentDetail = (value: string) => {
        Modal.info({
            title: '查看示例详情',
            content: (
                <div>
                    <AceEditor value={value} height="350px" width="100%" />
                </div>
            ),
            width: 800,
            okText: '关闭',
            destroyOnClose: true,
        });
    };

    const deleteContentByWarning = (id: number) => {
        Modal.warning({
            title: '删除内容',
            content: '请确认是否删除该内容？',
            closable: true,
            onOk: async () => {
                try {
                    const { code, message }: any = await deletePyContent({
                        id,
                    });
                    if (code === 200) {
                        Msg.success(message);
                        getPyChapters();
                    }
                } catch (err) {
                    console.error(err);
                }
            },
        });
    };

    const getPyChapters = async () => {
        try {
            const { code, data }: any = await getPyChaptersApi();
            if (code === 200) {
                setContents(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateContent = (chapterId: number) => {
        setChapterId(chapterId);
        setContentOpen(true);
    };

    const handleCreateChapterOperate = () => {
        setChapterOpen(false);
        setChapterConfirmLoading(false);
    };

    const handleCreateContentOperate = () => {
        setContentOpen(false);
        setContentConfirmLoading(false);
    };

    useEffect(() => {
        getPyChapters();
    }, []);

    return (
        <div className="python-learn-page">
            <div
                className="python-learn-header"
                style={{ background: colorBgContainer, padding: 12 }}
            >
                <h2>python课程列表</h2>
                <div className="header-extra-actions">
                    <Button type="primary" onClick={() => setChapterOpen(true)}>
                        添加章节
                    </Button>
                </div>
            </div>
            <div
                className="python-learn-content"
                style={{
                    background: colorBgContainer,
                    padding: 12,
                    marginTop: 12,
                }}
            >
                {isEmpty(contents) ? <Empty /> : <Collapse items={items} />}
            </div>
            <CreateChapter
                open={chapterOpen}
                confirmLoading={chapterConfirmLoading}
                refresh={getPyChapters}
                onOk={handleCreateChapterOperate}
                onCancel={handleCreateChapterOperate}
            />
            <CreateContent
                open={contentOpen}
                confirmLoading={contentConfirmLoading}
                refresh={getPyChapters}
                onOk={handleCreateContentOperate}
                onCancel={handleCreateContentOperate}
                chapterId={chapterId}
            />
        </div>
    );
}

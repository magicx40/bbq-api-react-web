import { Button, Collapse, CollapseProps, Table, theme } from 'antd';
import './index.scss';
import { getPyContents as getPyContentsApi } from '@/api/python-learn';
import { useEffect, useState } from 'react';
import { pick } from 'lodash';
import CreateChapter from './operate/create-chapter';
import CreateContent from './operate/create-content';

const columns = [
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
];

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
                            dataSource={item.children.map((d: any) => ({
                                ...d,
                                key: `${d.id}`,
                            }))}
                            columns={columns}
                        />
                    </div>
                ),
            };
        }) as CollapseProps['items'];
    };
    const items = getItems();

    const getPyContents = async () => {
        try {
            const { code, data }: any = await getPyContentsApi();
            if (code === 200) {
                const contentTree = getContentTree(data);
                setContents(contentTree);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateContent = (chapterId: number) => {
        setChapterId(chapterId);
        setContentOpen(true);
    };

    const getContentTree = (data: any[]) => {
        let chapterMap: any = {};
        data.forEach(content => {
            const contentItem = pick(content, [
                'id',
                'functionName',
                'explanation',
                'example',
            ]);
            if (!chapterMap[content.chapter.id]) {
                chapterMap[content.chapter.id] = {
                    id: content.chapter.id,
                    title: content.chapter.title,
                    children: [contentItem],
                };
            } else {
                chapterMap[content.chapter.id].children.push(contentItem);
            }
        });
        return Object.values(chapterMap) as any[];
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
        getPyContents();
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
                <Collapse items={items} />
            </div>
            <CreateChapter
                open={chapterOpen}
                confirmLoading={chapterConfirmLoading}
                refresh={getPyContents}
                onOk={handleCreateChapterOperate}
                onCancel={handleCreateChapterOperate}
            />
            <CreateContent
                open={contentOpen}
                confirmLoading={contentConfirmLoading}
                refresh={getPyContents}
                onOk={handleCreateContentOperate}
                onCancel={handleCreateContentOperate}
                chapterId={chapterId}
            />
        </div>
    );
}

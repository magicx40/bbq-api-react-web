import { Button, Col, Input, Row, Table, TableProps, theme } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getBoardGameList } from '@/api/board-game-mgt';
import './index.scss';
import CreateBoardGame from "./create";

interface DataType {
    title: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    ageRating: number;
    publisher: string;
    releaseDate: string;
    category: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    current: number;
    pageSize: number;
    total: number;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '名称',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '最小玩家数',
        dataIndex: 'minPlayers',
        key: 'minPlayers',
    },
    {
        title: '最大玩家数',
        dataIndex: 'maxPlayers',
        key: 'maxPlayers',
    },
    {
        title: '游玩时间（分钟）',
        dataIndex: 'playTime',
        key: 'playTime',
    },
    {
        title: '年龄评级',
        dataIndex: 'ageRating',
        key: 'ageRating',
    },
    {
        title: '出版商',
        dataIndex: 'publisher',
        key: 'publisher',
    },
    {
        title: '出版时间',
        dataIndex: 'releaseDate',
        key: 'releaseDate',
    },
    {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
    }
];

export default function BoardGameMgt() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [search, setSearch] = useState("");
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const getBoardGames = useCallback(async () => {
        setLoading(true);
        try {
            const { code, data }: any = await getBoardGameList({
                currentPage: pagination.current,
                limit: pagination.pageSize,
                title: search
            });
            if (code === 200) {
                setData(data.items || []);
                setPagination((prev) => ({
                    ...prev,
                    total: data.total,
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.current, pagination.pageSize, search]);

    const handleTableChange = (newPagination: any) => {
        setPagination((prev) => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        }));
    };

    const showCreateBoardGameModal = () => {
        setOpen(true);
    };

    const handleCreateBoardGame = () => {
    };

    const handleCreateBoardGameCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        getBoardGames();
    }, [getBoardGames]);

    return (
        <>
            <div className="board-games-header" style={{ background: colorBgContainer, padding: 12 }}>
                <h2>桌游列表</h2>
                <div className="header-extra-actions">
                    <Button type="primary" onClick={showCreateBoardGameModal}>添加桌游</Button>
                </div>
            </div>
            <div className="board-games-content" style={{ background: colorBgContainer, padding: 12, marginTop: 12 }}>
                <Row>
                    <Col span={8}>
                        <Input.Search
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={(value) => {
                                setSearch(value);
                                setPagination((prev) => ({
                                    ...prev,
                                    current: 1, // 重置到第一页
                                }));
                            }}
                            placeholder="按title搜索"
                        />
                    </Col>
                </Row>
                <Table<DataType>
                    className="board-games-table"
                    columns={columns}
                    dataSource={data}
                    rowKey={'id'}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true
                    }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
            <CreateBoardGame
                open={open}
                confirmLoading={confirmLoading}
                onOk={handleCreateBoardGame}
                onCancel={handleCreateBoardGameCancel} />
        </>
    );
}

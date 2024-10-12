import service from '@/utils/http';

export function getBoardGameList(params: {
    currentPage: number;
    limit: number;
    title?: string;
}) {
    return service.get('/api/board-games/list', { params });
}

export function createBoardGame(params: {
    title: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    ageRating: number;
    publisher: string;
    releaseDate: string;
    category: string;
    imageUrl?: string;
}) {
    return service.post('/api/board-games/save', params);
}

export function updateBoardGame(
    id: number,
    params: Partial<{
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
    }>
) {
    return service.put(`/api/board-games/update/${id}`, params);
}

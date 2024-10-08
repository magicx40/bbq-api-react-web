import service from '@/utils/http';

export function getBoardGameList(params: {
    currentPage: number;
    limit: number;
    title?: string;
}) {
  return service.get('/api/board-games/list', { params });
}
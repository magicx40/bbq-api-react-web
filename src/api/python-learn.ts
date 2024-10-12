import service from '@/utils/http';

export function getPyContents() {
    return service.get('/api/contents');
}

export function createChapter(params: { title: string }) {
    return service.post('/api/chapters', params);
}

export function createContent(params: {
    chapterId: number;
    functionName: string;
    explanation: string;
    example: string;
}) {
    return service.post('/api/contents', params);
}

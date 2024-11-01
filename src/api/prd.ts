import { PrdPriorityEnum } from '@/pages/prd/prd.enum';
import service from '@/utils/http';

export function getPrdList() {
    return service.get('/api/prds');
}

export function createPRD(params: {
    title: string;
    description: string;
    priority: PrdPriorityEnum;
    createdBy: number;
}) {
    return service.post('/api/prds/save', params);
}

export function deletePRDById(params: { id: number }) {
    return service.post('/api/prds/delete', params);
}

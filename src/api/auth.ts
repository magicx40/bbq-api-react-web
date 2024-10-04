import service from '@/utils/http';

interface AuthInfo {
    username: string;
    password: string;
    email?: string;
}

export function loginApi(params: AuthInfo) {
    return service.post('/api/auth/login', params);
}

export function getUsers() {
    return service.get('/api/users');
}
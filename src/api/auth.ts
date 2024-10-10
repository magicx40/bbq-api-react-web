import service from '@/utils/http';

interface AuthInfo {
    username: string;
    password: string;
    email?: string;
}

export function login(params: AuthInfo) {
    return service.post('/api/auth/login', params);
}

export function logout() {
    return service.post('/api/auth/logout');
}
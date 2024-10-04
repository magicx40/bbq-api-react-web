export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token: string) {
    if (!token) return;
    return localStorage.setItem('token', token);
}
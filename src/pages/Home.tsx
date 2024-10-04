import { getUsers } from '@/api/auth';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        getUsers()
            .then(res => {
                console.log('res', res);
            })
            .catch(err => {
                console.log(err);
            });
    });
    return <div>首页</div>;
}

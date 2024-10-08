import NotFoundImg from '@/assets/404.svg';
import './404.scss';

export default function NotFound() {
    return (
        <div className="not-found-page">
            <img src={NotFoundImg} alt="404" />
        </div>
    );
}

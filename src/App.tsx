import {
    unstable_HistoryRouter as HistoryRouter,
    Route,
    Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import HomeLayout from './layout/HomeLayout';
import Login from './pages/login/Index';
import history from './utils/history';

function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<div>默认</div>} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </HistoryRouter>
    );
}

export default App;

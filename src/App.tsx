import {
    unstable_HistoryRouter as HistoryRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import BoardGameMgt from './pages/board-game-mgt/Index';
import CommonLayout from './layout/CommonLayout';
import Login from './pages/login/Index';
import NotFound from './layout/404';
import history from './utils/history';
import PythonLearn from './pages/python';

function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route element={<CommonLayout />}>
                    <Route
                        path="/"
                        element={
                            <Navigate to="/board-game-management" replace />
                        }
                    />
                    <Route
                        path="/board-game-management"
                        element={<BoardGameMgt />}
                    />
                    <Route path="/python-learn" element={<PythonLearn />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </HistoryRouter>
    );
}

export default App;

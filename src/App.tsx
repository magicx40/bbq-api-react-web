import {
    unstable_HistoryRouter as HistoryRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import CommonLayout from './layout/CommonLayout';
import Login from './pages/login/Index';
import NotFound from './layout/404';
import history from './utils/history';
import PythonLearn from './pages/python';
import Prd from './pages/prd';

function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route element={<CommonLayout />}>
                    <Route
                        path="/"
                        element={<Navigate to="/python-learn" replace />}
                    />
                    <Route path="/python-learn" element={<PythonLearn />} />
                    <Route path="/prd-mgt" element={<Prd />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </HistoryRouter>
    );
}

export default App;

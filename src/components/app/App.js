import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

// динамические импорты мы не должны помещать выше статических!!!
const Page404 = lazy(() => import('../pages/Page404')); // добавляем ленивую загрузку импорта страницы 404 (для оптимизации)
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy (() => import('../pages/SingleComicPage'));
const SingleCharacterPage = lazy (() => import('../pages/SingleCharacterPage'));

const App = () => {

    return (
        <Router>        {/* Добавляем Роутер */}
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}> {/* обертка ленивой загрузки (fallback это запасной компонент который показывается пока грузится основной) */}
                        <Routes> {/* Добавляем Руты (подругружает только нужную страницу) */}
                            <Route path="/" element={<MainPage/>} /> {/* Добавляем сам маршрут (path / - будет главная страница) element - сам елемент который будет открываться */} 
                            <Route path="/comics" element={<ComicsPage/>} />
                            <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                            <Route path="/characters/:id" element={<SingleCharacterPage/>}/>
                            <Route path="*" element={<Page404/>} /> {/* если в адресной строке не будет существующего url то будет ошибка 404 */}

                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
        )
    }

export default App;
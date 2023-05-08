import React, {lazy, Suspense} from 'react';

import './scss/app.scss'
import Home from "./pages/Home";
import {
    Routes,
    Route,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayouts";


const Cart = lazy(() => import('./pages/Cart'));
const FullPizza = lazy(() => import('./pages/FullPizza'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {

    return (

        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={<Suspense fallback={<div>Загрузка...</div>}>
                    <Cart/>
                </Suspense>}/>
                <Route path="pizza/:id" element={<Suspense fallback={<div>Загрузка...</div>}>
                    <FullPizza/>
                </Suspense>}/>
                <Route path="*" element={

                    <Suspense fallback={<div>Загрузка...</div>}>
                        <NotFound/>
                    </Suspense>}/>
            </Route>
        </Routes>
    );
}

export default App;

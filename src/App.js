import React,{ Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchData } from "./fetchData";
import Loader from './components/Loader';

import './normalise.css';
import './App.css';

// Only load these components once we are done fetching data. Once data is fetched pass it as a prop into Airport List Component
const AirportList = lazy(() => import('./components/AirportList'));
const AirportData = fetchData();


const App = () => (
    <Router>
        <>
            <Suspense fallback={<Loader/>}>
                <Route path="/" render={()=><AirportList data={AirportData.airport.read()}/>} />
            </Suspense>
        </>
    </Router>
);

export default App;

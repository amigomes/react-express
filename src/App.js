import React from 'react';
import './App.css';
import Navbar from './components/Navbar/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Submit from './pages/submit';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route path='/' exact element={<Home/>} />
		<Route path='/submit' element={<Submit/>} />
	</Routes>
	</Router>
);
}

export default App;
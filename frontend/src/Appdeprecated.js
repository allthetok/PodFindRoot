/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './jscomponents/Login'
import Signup from './jscomponents/Signup'
import Likes from './jscomponents/Likes'
import Home from './jscomponents/Home'
import Discover from './jscomponents/Discover'
import ForgotPass from './jscomponents/ForgotPass'
import User from './jscomponents/User'

const App = () => {
	const [userId, setUserId] = useState(() => {
		const savedUserId = localStorage.getItem('userid')
		localStorage.removeItem('selectedLikePod')
		const initialVal = JSON.parse(savedUserId)
		return initialVal || null
	})


	const handleUserIdChange = (resUserId, remember) => {
		setUserId(resUserId)
		if (remember === true) {
			localStorage.setItem('userid', resUserId)
		}
	}

	const handleUserLogout = (e) => {
		localStorage.removeItem('userid')
		setUserId(null)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'
					element={
						userId ? (
							<Navigate replace to={'/home'} />
						)
							: (
								<Login handleIdChange={handleUserIdChange} userId={userId} />
							)
					}/>
				<Route path='/home'
					element={
						!userId ? (
							<Navigate replace to={'/'} />
						)
							: (
								<Home userId={userId} handleUserLogout={handleUserLogout}/>
							)
					} />
				<Route path='/signup' element={<Signup handleIdChange={handleUserIdChange} userId={userId} />} />
				<Route path='/forgot' element={<ForgotPass handleIdChange={handleUserIdChange} userId={userId} />} />
				<Route path='/likes'
					element={
						!userId ? (
							<Navigate replace to={'/home'} />
						)
							: (
								<Likes userId={userId} handleUserLogout={handleUserLogout}/>
							)
					} />
				<Route path='/discover'
					element={
						!userId ? (
							<Navigate replace to={'/home'} />
						)
							: (
								<Discover userId={userId} handleUserLogout={handleUserLogout}/>
							)
					} />
				<Route path='/profile'
					element={
						!userId ? (
							<Navigate replace to={'/home'} />
						)
							: (
								<User userId={userId} handleUserLogout={handleUserLogout}/>
							)
					} />
			</Routes>
		</BrowserRouter>

	)
}

export default App
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Likes } from './components/Likes'
import { Home } from './components/Home'
import { Discover } from './components/Discover'
import { ForgotPass } from './components/ForgotPass'
import { User } from './components/User'

const App = () => {
	const [userId, setUserId] = useState(() => {
		const savedUserId = localStorage.getItem('userid')
		localStorage.removeItem('selectedLikePod')
		const initialVal = JSON.parse(savedUserId!)
		return initialVal || null
	})


	const handleUserIdChange = (resUserId: number, remember: boolean) => {
		setUserId(resUserId)
		if (remember === true) {
			localStorage.setItem('userid', resUserId.toString())
		}
	}

	const handleUserLogout = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
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

export { App }
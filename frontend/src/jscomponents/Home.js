/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import PodcastDetail from './PodcastDetail'

const Home = ({ userId, handleUserLogout }) => {
	const [finalSearch, setFinalSearch] = useState(() => {
		const selectedLikePod = localStorage.getItem('selectedLikePod')
		return selectedLikePod || ''
	})

	//const [finalSearch, setFinalSearch] = useState('')
	//const [formSubmitted, setFormSubmitted] = useState(false)
	const [formSubmitted, setFormSubmitted] = useState(() => {
		const selectedLikePod = localStorage.getItem('selectedLikePod')
		return selectedLikePod ? true : false
	})

	const textInput = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		localStorage.removeItem('selectedLikePod')
		console.log(textInput)
		setFinalSearch(textInput.current.value)
		setFormSubmitted(true)
	}


	return (
		<>
			<Navbar handleSubmit={handleSubmit} textInput={textInput} handleUserLogout={handleUserLogout}/>
			{formSubmitted
				? <PodcastDetail userId={userId} finalSearch={finalSearch} />
				: <></>
			}
		</>
	)
}

export default Home
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Button } from '@mui/material'
import Navbar from './Navbar'
import PodcastLikeList from './PodcastLikeList'
import EpisodeLikeList from './EpisodeLikeList'
import './Filter.css'


const Likes = ({ userId, handleUserLogout }) => {
	const [finalSearch, setFinalSearch] = useState('')
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [sortOptions, setSortOptions] = useState('PODCAST')

	const textInput = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(textInput)
		setFinalSearch(textInput.current.value)
		setFormSubmitted(true)
	}

	return (
		<>
			<Navbar handleSubmit={handleSubmit} textInput={textInput} handleUserLogout={handleUserLogout}/>
			<div className='filterWrap'>
				<Button onClick={() => setSortOptions('PODCAST')} variant={sortOptions === 'PODCAST' ? 'contained' : 'outlined'}>Podcasts</Button>
				<Button onClick={() => setSortOptions('EPISODE')} variant={sortOptions === 'EPISODE' ? 'contained' : 'outlined'}>Episodes</Button>
			</div>
			{
				sortOptions === 'EPISODE' ?
					<EpisodeLikeList userId={userId} sortOptions={sortOptions} />
					:
					<PodcastLikeList userId={userId} sortOptions={sortOptions}/>
			}
		</>
	)
}

export default Likes
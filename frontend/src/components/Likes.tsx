/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Button } from '@mui/material'
import { Navbar } from './Navbar'
import { PodcastLikeList } from './PodcastLikeList'
import { EpisodeLikeList } from './EpisodeLikeList'
import './Filter.css'
import { useNavigate } from 'react-router-dom'

type LikesProps = {
	userId: number,
	handleUserLogout: (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => void
}

const Likes = ({ userId, handleUserLogout }: LikesProps) => {
	const [finalSearch, setFinalSearch] =  useState<string | null | undefined>('')
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [sortOptions, setSortOptions] = useState('PODCAST')

	const textInput = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	const handleSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
		e.preventDefault()
		localStorage.removeItem('selectedLikePod')
		navigate('/')
		localStorage.setItem('selectedLikePod', textInput.current!.value)
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

export { Likes }
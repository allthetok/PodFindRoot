/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, SyntheticEvent } from 'react'
import { Button, Autocomplete, TextField } from '@mui/material'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'
import { PodcastDiscoverList } from './PodcastDiscoverList'

type DiscoverProps = {
	userId: number,
	handleUserLogout: (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => void
}

const Discover = ({ userId, handleUserLogout }: DiscoverProps) => {

	const [finalSearch, setFinalSearch] =  useState<string | null | undefined>('')
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [sortOptions, setSortOptions] = useState('FOLLOWER_COUNT')
	const [options, setOptions] = useState('10')

	const numOptions = ['5', '10', '20']


	const textInput = useRef<HTMLInputElement>(null)

	const navigate = useNavigate()

	const handleSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
		e.preventDefault()
		localStorage.removeItem('selectedLikePod')
		navigate('/')
		localStorage.setItem('selectedLikePod', textInput.current!.value)
	}


	// const onTextChange = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }, values) => {
	// 	e.preventDefault()
	// 	setOptions(values)
	// }

	const onTextChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setOptions(value!)
	}

	return (
		<div>
			<Navbar handleSubmit={handleSubmit} textInput={textInput} handleUserLogout={handleUserLogout}/>
			<div className='filterWrap'>
				<Button onClick={() => setSortOptions('FOLLOWER_COUNT')} variant={sortOptions === 'FOLLOWER_COUNT' ? 'contained' : 'outlined'}>Popular</Button>
				<Button onClick={() => setSortOptions('TRENDING')} variant={sortOptions === 'TRENDING' ? 'contained' : 'outlined'}>Trending</Button>
				<Button onClick={() => setSortOptions('DATE_OF_FIRST_EPISODE')} variant={sortOptions === 'DATE_OF_FIRST_EPISODE' ? 'contained' : 'outlined'}>Newest</Button>
				<Autocomplete className='autoComp' disablePortal id='combo-box' options={numOptions} onChange={onTextChange} sx={{ width: 150, bgcolor: 'white' }} renderInput={(params) => <TextField {...params} label="Count"/>} />
			</div>
			<PodcastDiscoverList sortOptions={sortOptions} options={options} userId={userId}/>
		</div>
	)
}

export { Discover }
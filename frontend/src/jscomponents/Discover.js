/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Button, Autocomplete, TextField } from '@mui/material'
import Navbar from './Navbar'
import PodcastDiscoverList from './PodcastDiscoverList'


const Discover = ({ userId, handleUserLogout }) => {

	const [finalSearch, setFinalSearch] = useState('')
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [sortOptions, setSortOptions] = useState('FOLLOWER_COUNT')
	const [options, setOptions] = useState('10')

	const numOptions = ['5', '10', '20']


	const textInput = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(textInput)
		setFinalSearch(textInput.current.value)
		setFormSubmitted(true)
	}


	const onTextChange = (event, values) => {
		event.preventDefault()
		setOptions(values)
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

export default Discover
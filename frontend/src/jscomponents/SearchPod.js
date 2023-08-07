/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, createContext } from 'react'
import './SearchPod.css'
import PodcastDetail from './PodcastDetail'
import TstDetail from './TstDetail'

export const SearchContext = createContext(null)

const SearchPod = ({ userId }) => {
	const [finalSearch, setFinalSearch] = useState('')
	console.log(userId)
	const textInput = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(textInput)
		setFinalSearch(textInput.current.value)
	}

	return (
		<SearchContext.Provider value={finalSearch}>
			<div className='searchWrap'>
				<form className='searchBar' onSubmit={handleSubmit}>
					<input type='text' ref={textInput} required placeholder='Search...' />
					<button className='searchBtn'>
						<span>Search</span>
					</button>
				</form>
			</div>
			{finalSearch !== '' ?
			//  <PodcastDetail userId={userId} />
				<TstDetail userId={userId} />
				: <></>
			}
		</SearchContext.Provider>
	)
}

export default SearchPod
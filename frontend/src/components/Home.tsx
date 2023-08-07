/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { PodcastDetail } from './PodcastDetail'

type HomeProps = {
	userId: number,
	handleUserLogout: (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => void
}

const Home = ({ userId, handleUserLogout }: HomeProps) => {

	const [finalSearch, setFinalSearch] = useState<string | null | undefined>(() => {
		const selectedLikePod = localStorage.getItem('selectedLikePod')
		return selectedLikePod || ''
	})

	const [formSubmitted, setFormSubmitted] = useState(() => {
		const selectedLikePod = localStorage.getItem('selectedLikePod')
		return selectedLikePod ? true : false
	})

	const textInput = useRef<HTMLInputElement>(null)

	// const handleSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
	// 	e.preventDefault()
	// 	localStorage.removeItem('selectedLikePod')
	// 	setFinalSearch(textInput.current?.nodeValue)
	// 	setFormSubmitted(true)
	// }

	const handleSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
		e.preventDefault()
		localStorage.removeItem('selectedLikePod')
		setFinalSearch(textInput.current!.value)
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

export { Home }
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PodcastPreview.css'
import { MoreVert, Clear } from '@mui/icons-material'

const EpisodeLike = ({ strpodchaserid, strepisodeid, strpodtitle, strtitle, strweburl, strimageurl, intlength, strairdate, userId, handleDelete }) => {

	const navigate = useNavigate()

	const handleClick = (e) => {
		e.preventDefault()
		navigate('/')
		localStorage.removeItem('selectedLikePod')
		localStorage.setItem('selectedLikePod', strpodtitle)
	}

	const formattedTime = (seconds) => {
		const hours = Math.floor(seconds/3600)
		const mins = Math.floor(seconds % 3600 / 60)
		const hoursDisplay = hours > 0 ? `${hours}h` : ''
		const minsDisplay = mins > 0 ? `${mins}m` : ''
		if (seconds < 60) {
			return `${seconds}s`
		}
		else if (seconds > 60) {
			if (hoursDisplay === '') {
				return minsDisplay
			}
			if (minsDisplay === '') {
				return hoursDisplay
			}
		}
		return `${hoursDisplay}:${minsDisplay}`

	}

	const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })
	return (
		<li>
			<div className='videoCard ptop'>
				<Clear className='likesDelete' style={{ fontSize: '1.5rem' }} onClick={() => handleDelete(userId, strepisodeid)}/>
				<a title='Play' onClick={handleClick}>
					{strimageurl !== ''
						? <img className='videoImg' src={strimageurl} alt='Not displayable'/>
						: <img className='videoImg' alt='No thumbnail found'/>
					}
				</a>
				<div className='duration'>
					{formattedTime(intlength)}
				</div>
				<div className='videoData'>
					<div className='moreDetails'>
						<h5 className='title'>{strtitle}</h5>
						<p className='aired'>Aired {formattedDateLong(strairdate)}</p>
					</div>
					<MoreVert className='moreIcon' onClick={() => window.open(strweburl)}/>
				</div>
			</div>
		</li>
	)
}

export default EpisodeLike
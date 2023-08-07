/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PodcastPreview.css'
import { MoreVert, Clear } from '@mui/icons-material'

const PodcastLike = ({ strpodchaserid, strtitle, strweburl, strimageurl, strlatestepisodedate, userId, handleDelete }) => {

	const navigate = useNavigate()

	const handleClick = (e) => {
		e.preventDefault()
		navigate('/')
		localStorage.removeItem('selectedLikePod')
		localStorage.setItem('selectedLikePod', strtitle)
	}

	const formattedDateLong = inpDate => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })
	return (
		<li>
			<div className='videoCard ptop'>
				<Clear className='likesDelete' style={{ fontSize: '1.5rem' }} onClick={() => handleDelete(userId, strpodchaserid)}/>
				{/* <a title='Play' target='_blank' rel='noopener noreferrer' href={strweburl}> */}
				<a title='Play' onClick={handleClick}>
					{strimageurl !== ''
						? <img className='videoImg' src={strimageurl} alt='Not displayable'/>
						: <img className='videoImg' alt='No thumbnail found'/>
					}
				</a>
				<div className='videoData'>
					<div className='moreDetails'>
						<h5 className='title'>{strtitle}</h5>
						<p className='aired'>Latest {formattedDateLong(strlatestepisodedate)}</p>
					</div>
					<MoreVert className='moreIcon' onClick={() => window.open(strweburl)}/>
				</div>
			</div>
		</li>
	)
}

export default PodcastLike
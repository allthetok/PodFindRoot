/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import './PodcastPreview.css'
import { MoreVert, Favorite } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Episode = ({ podchaserId, podTitle, key, episodeId, imageUrl, url, length, title, airDate, userId }) => {

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

	const likeEp = async (podchaserId, podTitle, episodeId, imageUrl, url, length, title, airDate, userId) => {
		const likeConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/likeEp',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'strpodchaserid': podchaserId,
				'strepisodeid': episodeId,
				'strpodTitle': podTitle,
				'strtitle': title,
				'strweburl': url,
				'strimageurl': imageUrl,
				'intlength': length,
				'strairdate': airDate,
				'lnguserid': userId
			}
		}
		const newLikeResults = await axios(likeConfig)
		if (newLikeResults.status === 400) {
			axios.console.error()
		}
		else {
			console.log(newLikeResults)
		}
	}

	const handleLike = (e) => {
		e.preventDefault()
		likeEp(podchaserId, episodeId, podTitle, imageUrl, url, length, title, airDate, userId)
	}

	return (
		<li key={key}>
			<div className='videoCard'>
				{/* <div className='likesAdd'><Favorite className='videoIcon' onClick={handleLikeEp}/></div> */}
				<div className='likesAdd'>
					<IconButton
						size="medium"
						edge="end"
						aria-label="account of current user"
						color="inherit"
						sx={{ padding: 0 }}
						onClick={handleLike}
					>
						<FavoriteIcon />
					</IconButton>
				</div>

				<a title='Play' target='_blank' rel='noopener noreferrer' href={url}>
					{imageUrl !== ''
						? <img className='videoImg' src={imageUrl} alt={title}/>
						: <img className='videoImg' alt='No thumbnail found'/>
					}

				</a>
				<div className='duration'>
					{formattedTime(length)}
				</div>
				<div className='videoData'>
					<div className='moreDetails'>
						<h5 className='title'>{title}</h5>
						<p className='aired'>{formattedDateLong(airDate)}</p>
					</div>
					<MoreVert className='moreIcon'/>
				</div>
			</div>
		</li>
	)
}

export default Episode
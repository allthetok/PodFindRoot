/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './PodcastPreview.css'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { MoreVert } from '@mui/icons-material'

type PodcastDiscoverProps = {
	strpodchaserid: string,
	strtitle: string,
	strweburl: string,
	strimageurl: string,
	strlatestepisodedate: string,
	strname: string,
	userId: number
}

const PodcastDiscover = ({ strpodchaserid, strtitle, strweburl, strimageurl, strlatestepisodedate, strname, userId }: PodcastDiscoverProps) => {

	const navigate = useNavigate()

	const handleClick = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		navigate('/')
		localStorage.removeItem('selectedLikePod')
		localStorage.setItem('selectedLikePod', strtitle)
	}

	const formattedDateLong = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })

	const likePod = async (podchaserId: string, title: string, name: string, url: string, imageUrl: string, latestEpisodeDate: string, userId: number) => {
		const likeConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/likePod',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'strpodchaserid': podchaserId,
				'strtitle': title,
				'strname': name,
				'strweburl': url,
				'strimageurl': imageUrl,
				'strlatestepisodedate': latestEpisodeDate,
				'lnguserid': userId
			}
		}
		const newLikeResults = await axios(likeConfig)
		if (newLikeResults.status === 400) {
			console.error()
		}
		else {
			console.log(newLikeResults)
		}
	}

	const handleLike = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		likePod(strpodchaserid, strtitle, strname, strweburl, strimageurl, strlatestepisodedate, userId)
	}

	return (
		<li key={strpodchaserid}>
			<div className='videoCard ptop'>
				{/* <a title='Play' target='_blank' rel='noopener noreferrer' href={strweburl}> */}
				<div className='likesAdd'>
					<IconButton
						size="medium"
						edge="end"
						aria-label="account of current user"
						color="inherit"
						sx={{ padding: 0 }}
						onClick={handleLike}>
						<FavoriteIcon />
					</IconButton>
				</div>
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

export { PodcastDiscover }
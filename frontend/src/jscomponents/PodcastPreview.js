/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import './PodcastPreview.css'
import filter from '../mockdata/searchpod'
import { MoreVert, PlaylistAdd } from '@mui/icons-material'

const PodcastPreview = () => {

	const formattedTime = (seconds) => {
		const hours = Math.floor(seconds/3600)
		const mins = Math.floor(seconds % 3600 / 60)
		//const sec = Math.floor(seconds % 3600 % 60)
		const hoursDisplay = hours > 0 ? `${hours}h` : ''
		const minsDisplay = mins > 0 ? `${mins}m` : ''
		//const secDisplay = sec > 0 ? `${sec}s` : ''

		return `${hoursDisplay}:${minsDisplay}`
	}


	return (
		<div className='videoCard'>
			<div className='likesAdd'><PlaylistAdd className='videoIcon'/></div>
			<img className='videoImg' src={filter.data.podcasts.data[0].imageUrl}/>
			<div className='duration'>
				{formattedTime(filter.data.podcasts.data[0].avgEpisodeLength)}
			</div>
			<div className='videoData'>
				<div className='channelDetails'>
					<h5>{filter.data.podcasts.data[0].title}</h5>
					<p className='c_name'><img className='twitter' src='icons8-twitter.svg'/> {filter.data.podcasts.data[0].socialLinks.twitter}</p>
					<p>{formattedTime(filter.data.podcasts.data[0].avgEpisodeLength)} Average</p>
				</div>
				<MoreVert className='moreIcon'/>
			</div>
		</div>
	)
}

export default PodcastPreview
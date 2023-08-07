/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import './PodcastDetail.css'

type LikeBtnProps = {
	liked: boolean | undefined,
	dataFetch: DataFetch,
	userId: number
}

type DataFetch = {
	id: string,
	title: string,
	description: string,
	webUrl: string,
	language: string,
	numberOfEpisodes: number,
	avgEpisodeLength: number,
	latestEpisodeDate: string,
	ratingCount: number,
	ratingAverage: number,
	author: {
		name: string
	},
	startDate: string,
	reviewCount: number,
	imageUrl: string,
	socialLinks: {
		twitter: string | null,
		facebook: string | null,
		instagram: string | null
	}
}


const LikeBtn = ({ liked, dataFetch, userId }: LikeBtnProps) => {
	const [like, setLike] = useState(liked !== true ? 'show' : 'noshow')

	const likePod = async (dataFetch: DataFetch) => {
		const likeConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/likePod',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'strpodchaserid': dataFetch.id,
				'strtitle': dataFetch.title,
				'strname': dataFetch.author.name,
				'strweburl': dataFetch.webUrl,
				'strimageurl': dataFetch.imageUrl,
				'strlatestepisodedate': dataFetch.latestEpisodeDate,
				'lnguserid': userId
			}
		}
		const newLikeResults = await axios(likeConfig)
		if (newLikeResults.status === 200) {
			setLike('noshow')
		}
	}

	const handleLike = () => {
		likePod(dataFetch)
	}

	useEffect(() => {
		console.log('effect triggered, this podcast is: ' + like)
		if (liked === true ) {
			setLike('noshow')
		}
		else if (liked === false) {
			setLike('show')
		}
	}, [dataFetch, liked])

	return (
		<>
			{like === 'show' ?
				<div className='likeContainer'>
					<Button onClick={handleLike} variant='contained' startIcon={<FavoriteIcon/>}>
                    Like
					</Button>
				</div>
				: <></>
			}
		</>
	)
}

export { LikeBtn }
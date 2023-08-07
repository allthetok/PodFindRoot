/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PodcastLike } from './PodcastLike'
import './EpisodeList.css'

type PodcastLikeListProps = {
	userId: number,
	sortOptions: string
}

type Podcast = {
	strpodchaserid: string,
	strtitle: string,
	strweburl: string,
	strimageurl: string,
	strlatestepisodedate: string,
	userId: number,
	lnglikeid: number
}

const PodcastLikeList = ({ userId, sortOptions }: PodcastLikeListProps) => {
	const [podLikeDataFetch, setPodLikeDataFetch] = useState<Podcast[]>([])

	const getUserLikes = async () => {
		const userLikesConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/likes',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'lnguserid': userId,
				'strspecified': sortOptions
			},
		}

		await axios(userLikesConfig)
			.then(response => {
				setPodLikeDataFetch(uniqueFilter(response.data))
			}).catch(err => {
				console.log(err)
			})
	}

	const deleteUserLike = async (userId: number, strpodchaserid: string) => {
		const likeDeleteConfig = {
			method: 'delete',
			url: 'http://localhost:3002/api/like',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'lnguserid': userId,
				'strpodchaserid': strpodchaserid
			},
		}

		const response = await axios(likeDeleteConfig)
		if (response.status === 204) {
			await getUserLikes()
		}
	}

	useEffect(() => {
		getUserLikes()
	}, [userId])

	// const uniqueFilter = (data) => {
	// 	const map = new Map(data.map(pos => [pos.strpodchaserid, pos]))
	// 	const uniques = [...map.values()]
	// 	return uniques
	// }

	const uniqueFilter = (data: { map: (arg0: (pos: any) => any[]) => Iterable<readonly [Podcast, Podcast]> | null | undefined} ) => {
		const map = new Map(data.map(pos => [pos.strpodchaserid, pos]))
		const uniques = [...map.values()]
		return uniques
	}

	return (
		<>
			<div className='episodeContainer'>
				{podLikeDataFetch === null
					?
					<div>{userId}</div>
					:
					<ul className='episodeList regular'>
						{podLikeDataFetch.map((podlike) =>
							<PodcastLike key={podlike.lnglikeid}
								strpodchaserid={podlike.strpodchaserid}
								strtitle={podlike.strtitle}
								strweburl={podlike.strweburl}
								strimageurl={podlike.strimageurl}
								strlatestepisodedate={podlike.strlatestepisodedate}
								userId={userId}
								handleDelete={deleteUserLike}
							/>
						)}
					</ul>}
			</div>
		</>

	)
}

export { PodcastLikeList }
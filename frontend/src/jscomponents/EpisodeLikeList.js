/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EpisodeLike from './EpisodeLike'
import './EpisodeList.css'

const EpisodeLikeList = ({ userId, sortOptions }) => {
	const [epLikeDataFetch, setEpLikeDataFetch] = useState(null)

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
				setEpLikeDataFetch(uniqueFilter(response.data))
				console.log(uniqueFilter(response.data))
			}).catch(err => {
				console.log(err)
			})
	}

	const deleteUserLike = async (userId, strepisodeid) => {
		const likeDeleteConfig = {
			method: 'delete',
			url: 'http://localhost:3002/api/like',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'lnguserid': userId,
				'strepisodeid': strepisodeid
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

	const uniqueFilter = (data) => {
		const map = new Map(data.map(pos => [pos.strtitle, pos]))
		const uniques = [...map.values()]
		return uniques
	}

	return (
		<>
			<div className='episodeContainer'>
				{epLikeDataFetch === null
					?
					<div>{userId}</div>
					:
					<ul className='episodeList regular'>
						{epLikeDataFetch.map((eplike) =>
							<EpisodeLike key={eplike.lnglikeid}
								strpodchaserid={eplike.strpodchaserid}
								strepisodeid={eplike.strepisodeid}
								strpodtitle={eplike.strpodtitle}
								strtitle={eplike.strtitle}
								strweburl={eplike.strweburl}
								strimageurl={eplike.strimageurl}
								intlength={eplike.intlength}
								strairdate={eplike.strairdate}
								userId={userId}
								handleDelete={deleteUserLike}
							/>
						)}
					</ul>}
			</div>
		</>

	)
}

export default EpisodeLikeList
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { EpisodeLike } from './EpisodeLike'
import './EpisodeList.css'

type EpisodeLikeListProps = {
	userId: number,
	sortOptions: string
}

type Episode = {
	key: number,
	strpodchaserid: string,
	strepisodeid: string,
	strpodtitle: string,
	strtitle: string,
	strweburl: string,
	strimageurl: string,
	intlength: number,
	strairdate: string,
	lnglikeid: number
}

const EpisodeLikeList = ({ userId, sortOptions }: EpisodeLikeListProps) => {
	// const [epLikeDataFetch, setEpLikeDataFetch] = useState<Episode[] | unknown[]>([])
	// const [epLikeDataFetch, setEpLikeDataFetch] = useState<unknown>([])
	const [epLikeDataFetch, setEpLikeDataFetch] = useState<Episode[]>([])


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
				const epFetch = uniqueFilter(response.data)
				//setEpLikeDataFetch(epFetch)
				setEpLikeDataFetch(uniqueFilter(response.data))
				console.log(uniqueFilter(response.data))
			}).catch(err => {
				console.log(err)
			})
	}

	const deleteUserLike = async (userId: number, strepisodeid: string): Promise<void> => {
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// const uniqueFilter = (data: { map: (arg0: (pos: any) => any[]) => Iterable<readonly [unknown, unknown]> | null | undefined }) => {
	// 	const map = new Map(data.map(pos => [pos.strtitle, pos]))
	// 	const uniques = [...map.values()]
	// 	return uniques
	// }

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uniqueFilter = (data: { map: (arg0: (pos: any) => any[]) => Iterable<readonly [Episode, Episode]> | null | undefined} ) => {
		const map = new Map(data.map(pos => [pos.strtitle, pos]))
		const uniques = [...map.values()]
		return uniques
	}

	// const uniqueTitle = (EpArray: Episode[]) => {
	// 	const unique: Episode[] = EpArray.map((Ep) => Ep.strtitle)
	// 		.filter((value, index, self) => self.indexOf(value) === index)
	// 	return unique
	// }

	// const uniqueArray = (array: Episode[], key: string) => {
	// 	const arrayUniqueByKey = [...new Map(array.map(item =>
	// 		[item[key], item])).values()]
	// 	return arrayUniqueByKey
	// }

	// const uniqueArray = (myArray: Episode[]) => {
	// 	return Array.from(new Set(myArray.map((item: Episode) => item.strtitle)))
	// }

	return (
		<>
			<div className='episodeContainer'>
				{epLikeDataFetch.length === 0
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

export { EpisodeLikeList }
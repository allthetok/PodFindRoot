/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PodcastDiscover } from './PodcastDiscover'
import './EpisodeList.css'

type PodcastDiscoverListProps = {
	options: string | null,
	sortOptions: string,
	userId: number
}

type PodDataFetch = {
	id: string,
	title: string,
	url: string,
	imageUrl: string,
	latestEpisodeDate: string,
	author: {
		name: string
	}
}

const PodcastDiscoverList = ({ options, sortOptions, userId }: PodcastDiscoverListProps) => {

	const [podDataFetch, setPodDataFetch] = useState<PodDataFetch[]>([])

	const data = JSON.stringify({
		query: `query {
        podcasts (first: 20, sort: {
            sortBy: ${sortOptions},
            direction: DESCENDING
        }) {
            data{
                id,
                title,
                url,
                imageUrl,
                latestEpisodeDate,
                author {name}
            }
        }
    }`,
		variables: {}
	})

	const config = {
		method: 'post',
		url: 'https://api.podchaser.com/graphql',
		headers: {
			'Authorization': `Bearer ${process.env.REACT_APP_DEVELOPMENT_TOKEN}`,
			'Content-Type': 'application/json'
		},
		data : data
	}


	useEffect(() => {
		axios(config)
			.then(response => {
				const responseObj = response.data
				if (userId) {
					// setPodDataFetch({
					// 	'data': {
					// 		'podcasts': {
					// 			'data': []
					// 		}
					// 	}
					// })
					setPodDataFetch([])
				}
				console.log(response.data)
				setPodDataFetch(responseObj.data.podcasts.data)
			})
	}, [sortOptions])

	return (
		<>
			<div className='episodeContainer'>
				{podDataFetch.length === 0 && options ?
					<div></div> :
					<ul className='episodeList regular'>
						{podDataFetch.slice(0,parseInt(options ? options : '10')).map((podcast) =>
							<PodcastDiscover strpodchaserid={podcast.id} strtitle={podcast.title} strweburl={podcast.url} strimageurl={podcast.imageUrl} strlatestepisodedate={podcast.latestEpisodeDate} strname={podcast.author.name} userId={userId}/>
						)}
					</ul>}
			</div>
		</>

	)
}

export { PodcastDiscoverList }
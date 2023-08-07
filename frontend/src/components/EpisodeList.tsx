/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Episode } from './Episode'
import './EpisodeList.css'

type EpisodeListProps = {
	podchaserId: string,
	podTitle: string,
	options: string,
	sortOptions: string,
	userId: number
}

type Episode = {
	podchaserId: string,
	podTitle: string,
	id: string,
	key: number,
	imageUrl: string,
	url: string,
	length: number,
	title: string,
	airDate: string,
	userId: number
}

const EpisodeList = ({ podchaserId, podTitle, options, sortOptions, userId }: EpisodeListProps) => {

	//const [episodeDataFetch, setEpisodeDataFetch] = useState('')

	const [episodeDataFetch, setEpisodeDataFetch] = useState<Episode[]>([])

	const data = JSON.stringify({
		query: `query {
      podcast(identifier: {id: "${podchaserId}", type: PODCHASER}) {
              id,
              title,
              description,
              webUrl,
              language,
              numberOfEpisodes,
              avgEpisodeLength,
              latestEpisodeDate,
              ratingCount,
              ratingAverage,
              reviewCount,
              imageUrl,
              socialLinks {
                  twitter,
                  facebook,
                  instagram
              },
              episodes(sort: {
                  sortBy: ${sortOptions}
              }, first: 20) {
                  paginatorInfo {
                      count,
                      currentPage,
                      firstItem,
                      hasMorePages,
                      lastItem,
                      lastPage,
                      perPage,
                      total
                  },
                  data {
                      id,
                      title,
                      description,
                      airDate,
                      imageUrl,
                      url,
                      length,
                      explicit
                  }
              }
              
              
          }
  }`,
		variables: {}
	})

	const config = {
		method: 'post',
		url: 'https://api.podchaser.com/graphql',
		headers: {
			'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
			'Content-Type': 'application/json'
		},
		data : data
	}


	useEffect(() => {
		axios(config)
			.then(response => {
				const responseObj = response.data
				// if (podchaserId === '') {
				// setEpisodeDataFetch({
				// 	'data': {
				// 		'podcast': {
				// 			'episodes': {
				// 				'data': []
				// 			}
				// 		}
				// 	}
				// })
				// setEpisodeDataFetch({
				// 	})
				// }
				console.log(response.data)
				setEpisodeDataFetch(responseObj.data.podcast.episodes.data)
			})
	}, [podchaserId, sortOptions])

	return (
		<>
			<div className='episodeContainer'>
				{episodeDataFetch.length === 0 ?
					<div></div> :
					<ul className='episodeList regular'>
						{episodeDataFetch.slice(0,parseInt(options)).map((episode) =>
							<Episode podchaserId={podchaserId} podTitle={podTitle} episodeId={episode.id} key={parseInt(episode.id)} imageUrl={episode.imageUrl} url={episode.url} length={episode.length} title={episode.title} airDate={episode.airDate} userId={userId}/>
						)}
					</ul>}
			</div>
		</>

	)
}

export { EpisodeList }
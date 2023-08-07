/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

type UseSearchProps = {
	userId: number,
	finalSearch: string | null | undefined
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

const useSearch = ({ userId, finalSearch }: UseSearchProps) => {
	const [dataFetch, setDataFetch] = useState<DataFetch>()
	const [like, setLike] = useState<any>()


	const finalSearchData = JSON.stringify({
		query: `query {
            podcasts(searchTerm: "${finalSearch}", first: 1) {
                paginatorInfo {
                    currentPage,
                    hasMorePages,
                    lastPage,
                },
                data {
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
                    author {
                        name
                    },
                    startDate,
                    reviewCount,
                    imageUrl,
                    socialLinks {
                        twitter,
                        facebook,
                        instagram
                    },
                }
            }
        }`,
		variables: {}
	})

	const searchConfig = {
		method: 'post',
		url: 'https://api.podchaser.com/graphql',
		headers: {
			'Authorization': `Bearer ${process.env.REACT_APP_DEVELOPMENT_TOKEN}`,
			'Content-Type': 'application/json'
		},
		data : finalSearchData
	}

	const likeBtnConfig = {
		method: 'post',
		url: 'http://localhost:3002/api/like',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'lnguserid': userId,
			'strpodchaserid': null
		}
	}

	const getData = useCallback(async () => {
		const dataResults = await axios(searchConfig)
		console.log(finalSearch)
		setDataFetch(dataResults.data.data.podcasts.data[0])
		console.log(dataResults.data.data.podcasts.data[0])
		likeBtnConfig.data.strpodchaserid = dataResults.data.data.podcasts.data[0].id
		const likeResults = await axios(likeBtnConfig)
		setLike(likeResults.data.blnLiked)

	}, [finalSearch])

	useEffect(() => {
		getData()
	}, [getData])

	return [dataFetch, like]
}


export default useSearch
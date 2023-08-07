/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useSearch = (userId, finalSearch) => {
	const [dataFetch, setDataFetch] = useState(null)
	const [like, setLike] = useState(null)


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

	let likeBtnConfig = {
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
		setDataFetch(dataResults.data.data.podcasts.data[0])
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
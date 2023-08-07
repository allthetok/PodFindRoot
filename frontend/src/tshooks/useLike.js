/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'

const useLike = (dataFetch, userId, like) => {
	const [dataf, setDataF] = useState(null)
	const [liked, setLiked] = useState(null)
	const [style, setStyle] = useState({})

	useEffect(() => {
		if (dataFetch && like) {
			console.log(dataFetch)
			setDataF({
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
			})
			setLiked(like)
		}
	}, [dataFetch])

	const handleLike = async () => {
		if (dataf !== null && like !== null) {
			await axios(dataf)
				.then(response => {
					setLiked(!liked)
					setStyle({ display: 'none' })
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	return [liked, handleLike]

}






// const [likeConfig, setLikeConfig] = useState(null)
// console.log(dataFetch)
// const likeConfig = {
//     method: 'post',
//     url: 'http://localhost:3002/api/likePod',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data: {
//         // 'strpodchaserid': null,
//         // 'strtitle': null,
//         // 'strname': null,
//         // 'strweburl': null,
//         // 'strimageurl': null,
//         // 'strlatestepisodedate': null,
//         // 'lnguserid': null,
//     }
// }

//     const likePod = async () => {
//         await axios(likeConfig)
//         .then(response => {
//             setLiked(!liked)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }

//     const handleLike = () => {
//         likePod()
//     }

//     useEffect(() => {
//         setLikeConfig({
//              method: 'post',
//              url: 'http://localhost:3002/api/likePod',
//              headers: {
//                  'Content-Type': 'application/json'
//              },
//              data: {
//                  'strpodchaserid': dataFetch.id,
//                  'strtitle': dataFetch.title,
//                  'strname': dataFetch.author.name,
//                  'strweburl': dataFetch.webUrl,
//                  'strimageurl': dataFetch.imageUrl,
//                  'strlatestepisodedate': dataFetch.latestEpisodeDate,
//                  'lnguserid': userId
//              }
//          })
//     }, [dataFetch])

//     return [liked, handleLike]

// }

export default useLike
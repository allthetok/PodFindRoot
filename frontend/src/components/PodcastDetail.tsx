/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Filter } from './Filter'
import useSearch from '../tshooks/useSearch'
import './PodcastDetail.css'
import { LikeBtn } from './LikeBtn'

type PodcastDetailProps = {
	userId: number,
	finalSearch: string | null | undefined
}

const PodcastDetail = ({ userId, finalSearch }: PodcastDetailProps) => {

	const [dataFetch, like] = useSearch({ userId, finalSearch })

	const formattedTime = (seconds: number) => {
		const hours = Math.floor(seconds/3600)
		const mins = Math.floor(seconds % 3600 / 60)
		const hoursDisplay = hours > 0 ? `${hours}h` : ''
		const minsDisplay = mins > 0 ? `${mins}m` : ''
		return `${hoursDisplay}:${minsDisplay}`
	}

	const formattedDateShort = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', month: 'long' })
	const formattedDateLong = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })

	return (
		<>
			{dataFetch && like !== null ?
				<div className='infoContainer'>
					<div className='coverArt'>
						<img className='showCover' alt='Cover Art' src={dataFetch.imageUrl}></img>
						<h3>
							{dataFetch.title}
						</h3>
						<table className='podInfoOuter'>
							<tbody>
								<tr>
									<td className='verticalAlignTop'>
										<table className='podInfo'>
											<tbody>
												<tr>
													<th className='infoHeader'>Creator</th>
													<td colSpan={2} className='creator'>
														{dataFetch.author.name}
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Type</th>
													<td colSpan={2} className='regular'>
                                                    Podcast
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Released</th>
													<td colSpan={2} className='regular'>
														{formattedDateShort(dataFetch.startDate)}
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Latest Ep</th>
													<td colSpan={2} className='regular'>
														{formattedDateLong(dataFetch.latestEpisodeDate)}
													</td>
												</tr>
												<tr>
													<th className='infoHeader p4'>Rating</th>
													<td colSpan={2}>
														<span className='avgRating regular'>
															{(dataFetch.ratingAverage).toFixed(2)}&nbsp;
														</span>
														<span className='maxRating regular'>
                                                        /&nbsp;
															<span>
                                                            5.0&nbsp;
															</span>
														</span>
														<span className='numRatings'>
                                                        from&nbsp;
															<b>
																<span>{dataFetch.ratingCount}&nbsp;</span>
															</b>
                                                        ratings
														</span>
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Episodes #</th>
													<td colSpan={2} className='regular'>
														{dataFetch.numberOfEpisodes}
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Avg Length</th>
													<td colSpan={2} className='regular'>
														{formattedTime(dataFetch.avgEpisodeLength)}
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Description</th>
													<td colSpan={2} className='desc'>
														{dataFetch.description}
													</td>
												</tr>
												<tr>
													<th className='infoHeader'>Launch</th>
													<td colSpan={2}>
														{/* eslint-disable-next-line */}
                                                    <a className='mediaSpotify' title='Spotify' target='_blank' rel='noopener noreferrer' href={dataFetch.webUrl}></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>

					</div>
					<div className='mediaContainer'>
						<a className='mediaTwitter' title='Twitter' target ='_blank' rel='noopener noreferrer' href={`https://twitter.com/${dataFetch === undefined ? '' : dataFetch.socialLinks.twitter}`}> </a>
						<a className='mediaFacebook' title='Facebook' target='_blank'rel='noopener noreferrer' href={`https://facebook.com/${dataFetch === undefined ? '' : dataFetch.socialLinks.facebook}`}> </a>
						<a className='mediaInstagram' title='Instagram' target='_blank' rel='noopener noreferrer' href={`https://instagram.com/${dataFetch === undefined ? '' : dataFetch.socialLinks.instagram}`}> </a>
					</div>
					<LikeBtn liked={like} dataFetch={dataFetch} userId={userId}/>
					<Filter podchaserId={dataFetch.id} podTitle={dataFetch.title} userId={userId} />
				</div>
				: <></> }
		</>
	)
}

export { PodcastDetail }
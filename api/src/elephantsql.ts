/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import pg, { QueryResult } from 'pg'
import bcrypt from 'bcrypt'
const app = express()

const corsOptions = {
	origin: 'http://localhost:3001',
	credentials: true,           //access-control-allow-credentials:true
	optionSuccessStatus: 200
}

const requestLogger = (request: Request, response: Response, next: NextFunction): void => {
	console.log('Method:', request.method)
	console.log('Path: ', request.url)
	console.log('Body: ', request.body)
	console.log('---')
	next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors(corsOptions))

const client = new pg.Client(process.env.DATABASE_URL)

client.connect((err: Error | null) => {
	if (err) {
		return console.error('could not connect to Database', err)
	}
	return console.log('Successfully connected to database')
})

app.get('/api/users', async (request: Request, response: Response) => {
	const queryText:string = 'SELECT * from tblUser'
	const queryResults:QueryResult = await client.query(queryText)
	response.json(queryResults.rows)
})

app.post('/api/user', async (request: Request, response: Response) => {
	const body = request.body
	const struser: string = body.struser
	const strpass: string = body.strpass
	const stremail: string = body.stremail ? body.stremail : ''
	const newUser: boolean = body.newUser
	let values: any[], queryResults: QueryResult, queryText: string

	if (!struser || !strpass) {
		return response.status(400).json({
			error: 'Username or password missing'
		})
	}
	if (typeof(newUser) === 'undefined') {
		return response.status(400).json({
			error: 'Did not specify if signin or signup'
		})
	}

	if (!newUser) {
		if (struser.includes('@')) {
			queryResults = await client.query('SELECT strpass FROM tblUser WHERE stremail = $1', [struser])
		}
		else {
			queryResults = await client.query('SELECT strpass FROM tblUser WHERE struser = $1', [struser])
		}
		await bcrypt.compare(strpass, queryResults.rows[0].strpass)
		values = [struser, queryResults.rows[0].strpass]
		if (struser.includes('@')) {
			await client.query('UPDATE tblUser SET dtmlastlogin = NOW() WHERE stremail = $1 AND strpass = $2;', values)
			queryText = 'SELECT * from tblUser WHERE stremail = $1 AND strpass = $2'
			queryResults = await client.query(queryText, values)
		}
		else {
			await client.query('UPDATE tblUser SET dtmlastlogin = NOW() WHERE struser = $1 AND strpass = $2;', values)
			queryText = 'SELECT * from tblUser WHERE struser = $1 AND strpass = $2'
			queryResults = await client.query(queryText, values)
		}

	}
	else {
		const hash: string = await bcrypt.hash(strpass, 10)
		values = [struser, hash, stremail]
		queryText = 'INSERT INTO tblUser(struser, strpass, dtmcreated, dtmlastlogin, stremail) VALUES($1, $2, NOW(), NOW(), $3) RETURNING *'
		queryResults = await client.query(queryText, values)
	}

	console.log(`${newUser ? 'Signed up' : 'Logged In'} user: ${struser}.`)

	if (queryResults.rows[0]) {
		return response.status(200).json(
			{
				'lnguserid': queryResults.rows[0].lnguserid
			})
	}
})

// app.post('/api/likes', async (request: Request, response: Response) => {
//     const queryResults = await client.query('CREATE TABLE tblLikes(lngLikeId serial PRIMARY KEY, strpodchaserId VARCHAR (50) NOT NULL, strtitle VARCHAR (50) NOT NULL, strname VARCHAR (50) NOT NULL, strweburl VARCHAR (50) NOT NULL, strimageurl VARCHAR (50) NOT NULL, dtmLiked TIMESTAMP NOT NULL, strlatestEpisodeDate VARCHAR (50), lngUserId serial NOT NULL,FOREIGN KEY (lngUserId) REFERENCES tblUser(lngUserId));')
//     if (queryResults) {
//         console.log(queryResults)
//         return response.status(200).json(queryResults)
//     }
// })

app.post('/api/likePod', async (request: Request, response: Response) => {
	const body = request.body
	const strpodchaserid: string = body.strpodchaserid
	const strtitle: string = body.strtitle
	const strname: string = body.strname
	const strweburl:string = body.strweburl
	const strimageurl:string = body.strimageurl
	const strlatestepisodedate:string = body.strlatestepisodedate
	const lnguserid:number = body.lnguserid
	const values: any[] = [strpodchaserid, strtitle, strname, strweburl, strimageurl, strlatestepisodedate, lnguserid]
	const queryText: string = 'INSERT INTO tblLikes(strpodchaserId, strtitle, strname, strweburl, strimageurl, dtmLiked, strlatestEpisodeDate, lngUserId) VALUES($1, $2, $3, $4, $5, NOW(), $6, $7) RETURNING *'
	let queryResults: QueryResult

	if (!strpodchaserid || !strtitle || !strname || !strweburl || !strimageurl || !strlatestepisodedate || !lnguserid) {
		return response.status(400).json({
			error: 'PodchaserId, Title, Author Name, Web Url, Image Url, Latest Episode Date or UserId missing'
		})
	}
	queryResults = await client.query(queryText, values)

	console.log(`${strtitle} liked by ${lnguserid}`)

	if (queryResults.rows[0]) {
		return response.status(200).json({
			'strtitle': queryResults.rows[0].strtitle,
			'strpodchaserid': queryResults.rows[0].strpodchaserid,
			'lnguserid': queryResults.rows[0].lnguserid
		})
	}
})

app.post('/api/likeEp', async (request: Request, response: Response) => {
	const body = request.body
	const strpodchaserid: string = body.strpodchaserid
	const strepisodeid: string = body.strepisodeid
	const strpodtitle: string = body.strpodTitle
	const strtitle: string = body.strtitle
	const strweburl: string = body.strweburl
	const strimageurl: string = body.strimageurl
	const intlength: number = body.intlength
	const strairdate: string = body.strairdate
	const lnguserid: number = body.lnguserid
	const values: any[] = [strpodchaserid, strepisodeid, strpodtitle, strtitle, strweburl, strimageurl, intlength, strairdate, lnguserid]
	const queryText: string = 'INSERT INTO tblLikesEpisode(strpodchaserid, strepisodeid, strpodtitle, strtitle, strweburl, strimageurl, intlength, strairdate, dtmLiked, lnguserid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9) RETURNING *'
	let queryResults: QueryResult

	if (!strpodchaserid || !strepisodeid || !strpodtitle || !strtitle || !strweburl || !strairdate || !lnguserid) {
		return response.status(400).json({
			error: 'PodchaserId, Episode Id, Podcast Title, Title, Web Url, Air Date or UserId missing'
		})
	}

	queryResults = await client.query(queryText, values)

	console.log(`${strepisodeid} liked by ${lnguserid}`)

	if (queryResults.rows[0]) {
		return response.status(200).json({
			'strtitle': queryResults.rows[0].strtitle,
			'strpodchaserid': queryResults.rows[0].strpodchaserid,
			'strepisodeid': queryResults.rows[0].strepisodeid,
			'lnguserid': queryResults.rows[0].lnguserid
		})
	}
})

app.post('/api/like', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	const strpodchaserid: number = body.strpodchaserid
	const values: any[] = [lnguserid, strpodchaserid]
	let queryText: string, queryResults: QueryResult

	if (!lnguserid || !strpodchaserid) {
		return response.status(400).json({
			error: 'No user id or PodchaserId specified'
		})
	}

	queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblLikes WHERE lnguserid = $1 AND strpodchaserid = $2)'
	queryResults = await client.query(queryText, values)

	if (!queryResults.rows[0]) {
		return response.status(200).json({
			blnLiked: false
		})
	}
	else {
		return response.status(200).json({
			blnLiked: true
		})
	}

})

app.post('/api/likes', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	const strspecified: string = body.strspecified
	const values: number[] = [lnguserid]
	let queryText: string, queryResults: QueryResult

	if (!lnguserid) {
		return response.status(400).json({
			error: 'No user id specified'
		})
	}

	if (!strspecified) {
		return response.status(400).json({
			error: 'No specified search PODCAST/EPISODE'
		})
	}

	if (strspecified === 'PODCAST') {
		queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblLikes WHERE lnguserid = $1)'
		queryResults = await client.query(queryText, values)

		if (!queryResults.rows[0]) {
			return response.status(400).json({
				error: `User with id ${lnguserid} has not liked any podcasts`
			})
		}

		queryText = 'SELECT * from tblLikes WHERE lnguserid = $1 ORDER BY dtmLiked DESC'
		queryResults = await client.query(queryText, values)
		return response.status(200).json(queryResults.rows)
	}
	if(strspecified === 'EPISODE') {
		queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblLikesEpisode WHERE lnguserid = $1)'
		queryResults = await client.query(queryText, values)

		if (!queryResults.rows[0]) {
			return response.status(400).json({
				error: `User with id ${lnguserid} has not liked any episodes`
			})
		}

		queryText = 'SELECT * from tblLikesEpisode WHERE lnguserid = $1 ORDER BY dtmLiked DESC'
		queryResults = await client.query(queryText, values)
		return response.status(200).json(queryResults.rows)
	}

})

app.delete('/api/like', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	const strpodchaserid: string = body.strpodchaserid
	const strepisodeid: string = body.strepisodeid
	let values: any[]
	let queryText: string, queryResults: QueryResult

	if (!lnguserid ) {
		return response.status(400).json({
			error: 'No user id specified'
		})
	}

	if (!strpodchaserid && !strepisodeid) {
		return response.status(400).json({
			error: 'Podchaser and Episode ID both not specified'
		})
	}

	if (strpodchaserid) {
		values = [lnguserid, strpodchaserid]
		queryText = 'DELETE FROM tblLikes WHERE lnguserid = $1 AND strpodchaserid = $2'
		queryResults = await client.query(queryText, values)

		if (queryResults.rowCount === 0) {
			return response.status(404).json({
				error: `User id of ${lnguserid} has not liked podcast with podchaser id ${strpodchaserid}`
			})
		}

		else if (queryResults.rowCount !== 0) {
			return response.sendStatus(204)
		}
	}
	if (strepisodeid) {
		values = [lnguserid, strepisodeid]
		queryText = 'DELETE FROM tblLikesEpisode WHERE lnguserid = $1 AND strepisodeid = $2'
		queryResults = await client.query(queryText, values)

		if (queryResults.rowCount === 0) {
			return response.status(404).json({
				error: `User id of ${lnguserid} has not liked episode with episode id ${strepisodeid}`
			})
		}
		else if (queryResults.rowCount !== 0) {
			return response.sendStatus(204)
		}
	}

})

app.post('/api/verifyUser', async (request: Request, response: Response) => {
	const body = request.body
	const struser: string = body.struser
	const stremail: string = body.stremail
	let values: string[]
	let queryText: string, queryResults: QueryResult

	if (!struser || !stremail) {
		return response.status(400).json({
			error: 'User or Email missing'
		})
	}

	values = [struser, stremail]
	queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblUser WHERE struser = $1 AND stremail = $2)'

	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0) {
		return response.status(400).json({
			error: `User ${struser} with email ${stremail} does not exist`
		})
	}
	else if (queryResults.rowCount !== 0) {
		queryText = 'SELECT * FROM tbluser WHERE struser = $1 AND stremail = $2'
		queryResults = await client.query(queryText, values)
		return response.status(200).json({
			'blnExists': true,
			'lnguserid': queryResults.rows[0].lnguserid
		})
	}
})

app.patch('/api/userPass', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	const strpass: string = body.strpass
	let values: any[], queryResults: QueryResult, queryText: string

	if (!lnguserid || !strpass) {
		return response.status(400).json({
			error: 'Username or password missing'
		})
	}

	const hash = await bcrypt.hash(strpass, 10)
	values = [lnguserid, hash]
	queryText = 'UPDATE tblUser SET strpass = $2, dtmlastlogin = NOW() WHERE lnguserid = $1;'
	queryResults = await client.query(queryText, values)

	queryText = 'SELECT * from tblUser WHERE lnguserid = $1 AND strpass = $2'
	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0) {
		return response.status(400).json({
			error: `User ${lnguserid} does not exist`
		})
	}

	if (queryResults.rows[0]) {
		return response.status(200).json(
			{
				'lnguserid': queryResults.rows[0].lnguserid,
				'blnSuccess': true
			})
	}
})

app.patch('/api/username', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	const struser: string = body.struser
	let values: any[], queryResults: QueryResult, queryText: string

	if (!lnguserid || !struser) {
		return response.status(400).json({
			error: 'Userid or username missing'
		})
	}
	values = [lnguserid]

	queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblUser WHERE lnguserid = $1)'
	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0) {
		return response.status(400).json({
			error: `User ${lnguserid} does not exist`
		})
	}
	values = [struser, lnguserid]
	queryText = 'UPDATE tblUser SET struser = $1, dtmlastlogin = NOW() WHERE lnguserid = $2;'
	queryResults = await client.query(queryText, values)

	queryText = 'SELECT * from tblUser WHERE struser = $1 AND lnguserid = $2'
	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0 ) {
		return response.status(400).json({
			error: `User ${lnguserid} does not exist`
		})
	}

	if (queryResults.rows[0]) {
		return response.status(200).json(
			{
				'lnguserid': queryResults.rows[0].lnguserid,
				'blnSuccess': true
			})
	}
})

app.patch('/api/userEmail', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	const stremail: string = body.stremail
	let values: any[], queryResults: QueryResult, queryText: string


	if (!lnguserid || !stremail) {
		return response.status(400).json({
			error: 'Userid or email missing'
		})
	}
	values = [lnguserid]

	queryText = 'SELECT 1 WHERE EXISTS (SELECT * FROM tblUser WHERE lnguserid = $1)'
	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0) {
		return response.status(400).json({
			error: `User ${lnguserid} does not exist`
		})
	}

	values = [stremail, lnguserid]
	queryText = 'UPDATE tblUser SET stremail = $1, dtmlastlogin = NOW() WHERE lnguserid = $2;'
	queryResults = await client.query(queryText, values)

	queryText = 'SELECT * from tblUser WHERE stremail = $1 AND lnguserid = $2'
	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0 ) {
		return response.status(400).json({
			error: `User ${lnguserid} does not exist`
		})
	}

	if (queryResults.rows[0]) {
		return response.status(200).json(
			{
				'lnguserid': queryResults.rows[0].lnguserid,
				'blnSuccess': true
			})
	}
})

app.post('/api/useremail', async (request: Request, response: Response) => {
	const body = request.body
	const lnguserid: number = body.lnguserid
	let values: number[], queryResults: QueryResult, queryText: string

	if (!lnguserid) {
		return response.status(400).json({
			error: 'Userid missing'
		})
	}

	values = [lnguserid]

	queryText = 'SELECT * FROM tblUser WHERE lnguserid = $1;'
	queryResults = await client.query(queryText, values)

	if (queryResults.rowCount === 0) {
		return response.status(400).json({
			error: `User ${lnguserid} does not exist`
		})
	}

	else if (queryResults.rowCount !== 0) {
		return response.status(200).json({
			'lnguserid': queryResults.rows[0].lnguserid,
			'struser': queryResults.rows[0].struser,
			'stremail': queryResults.rows[0].stremail
		})
	}
})

const PORT = process.env.DB_PORT || 3002

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})







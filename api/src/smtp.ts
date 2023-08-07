/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
const app = express()
import nodemailer from 'nodemailer'

const corsOptions ={
	origin:'http://localhost:3001',
	credentials:true,            //access-control-allow-credentials:true
	optionSuccessStatus:200
}

const requestLogger = (request: Request, response: Response, next: NextFunction): void => {
	console.log('Method:', request.method)
	console.log('Path: ', request.path)
	console.log('Body: ', request.body)
	console.log('---')
	next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors(corsOptions))

const transport = {
	host: 'smtp-relay.brevo.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.SMTP_FROM_EMAIL,
		pass: process.env.SMTP_TO_PASSWORD,
	},
	// tls: {
	//     ciphers:'SSLv3'
	// }
}

const transporter = nodemailer.createTransport(transport)
transporter.verify((error: Error | null, success: true): void => {
	if (error) {
		console.error(error)
	}
	else {
		console.log('Connected to transporter')
	}
})

const generateVerificationCode = (): number => Math.floor(1000000*Math.random())

app.post('/api/verification', async (request: Request, response: Response) => {
	const stremail: string = request.body.stremail
	const verificationCodeGenerated: number = generateVerificationCode()
    type Mail = {
        from: string,
        to: string,
        subject: string,
        text: string
    }
    const mail: Mail = {
    	from: process.env.SMTP_FROM_EMAIL!,
    	to: stremail,
    	subject: 'Your Verification Code from PodFinder',
    	text: `Hello, ${verificationCodeGenerated} is your PodFinder Verification Code.`
    }
    transporter.sendMail(mail, (err: Error | null, data) => {
    	if (err) {
    		return response.status(400).json({
    			status: 'fail',
    		})
    	}
    	else {
    		return response.status(200).json({
    			status: 'success',
    			verificationCode: verificationCodeGenerated,
    			stremailto: mail.to,
    		})
    	}
    })
})

const PORT = process.env.MAIL_PORT || 3003

app.listen(PORT, () => {
	console.log(`Mail server running on port: ${PORT}`)
})


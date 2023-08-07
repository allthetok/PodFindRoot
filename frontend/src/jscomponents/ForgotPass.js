/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Copyright = ( props ) => {
	return <Typography variant='body2' color='text.secondary' align='center' {...props}>
		{'Copyright © '}
		<Link color='inherit' href='https://github.com/allthetok'>
            Allen Tok
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
}

const defaultTheme = createTheme()

const ForgotPass = ({ handleIdChange, userId }) => {
	//const [userId, setUserId] = useState(null)

	const [verificationCode, setVerificationCode] = useState(null)
	const [verificationEnter, setVerificationEnter] = useState('')
	const [pass1, setPass1] = useState('')
	const [pass2, setPass2] = useState('')
	const [id, setId] = useState(null)
	const [blnMatch, setBlnMatch] = useState(false)
	const [checked, setChecked] = useState(false)


	const navigate = useNavigate()

	// const getUserId = async (dataTarget) => {
	//     const user = dataTarget.get('user')
	//     const pass = dataTarget.get('password')

	//     const userConfig = {
	//         method: 'post',
	//         url: 'http://localhost:3002/api/user',
	//         headers: {
	//             'Content-Type': 'application/json'
	//         },
	//         data: {
	//             'struser': user,
	//             'strpass': pass,
	//             'newUser': false
	//         }
	//     }

	//     await axios(userConfig).then(response => {
	//         handleIdChange(response.data.lnguserid)
	//     }).catch(err => {
	//         console.log(err)
	//     })
	// }

	const sendUserVerificationCode = async (dataTarget) => {
		const email = dataTarget.get('email')
		const user = dataTarget.get('user')
		let blnExists = false

		const verifyUserConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/verifyUser',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'struser': user,
				'stremail': email
			}
		}

		const sendEmailConfig = {
			method: 'post',
			url: 'http://localhost:3003/api/verification',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'stremail': email
			}
		}

		await axios(verifyUserConfig).then(response => {
			blnExists = response.data.blnExists
			setId(response.data.lnguserid)
		})
			.catch(err => {
				console.log(err)
			})

		if (blnExists === true) {
			await axios(sendEmailConfig).then(response => {
				setVerificationCode(response.data.verificationCode)
			})
				.catch(err => {
					console.log(err)
				})
		}
	}

	const updatePassword = async (pass1, pass2, id) => {
		const updatePassConfig = {
			method: 'patch',
			url: 'http://localhost:3002/api/userPass',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'lnguserid': id,
				'strpass': pass1
			}
		}

		if (pass1 === pass2) {
			await axios(updatePassConfig).then(response => {
				handleIdChange(response.data.lnguserid, checked)
			})
				.catch(err => {
					console.log(err)
				})
		}
	}

	const handleSendSubmit = (e) => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		sendUserVerificationCode(data)
	}

	const handleVerificationSubmit = (e) => {
		e.preventDefault()
		if (parseInt(verificationEnter) === verificationCode) {
			setBlnMatch(true)
			setVerificationCode(null)
		}
	}

	const handlePassSubmit = (e) => {
		e.preventDefault()
		updatePassword(pass1, pass2, id)
	}

	useEffect(() => {
		if (userId) {
			navigate('/home')
		}
	}, [userId])

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				{
					id !== null && verificationCode !== null ?
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon/>
							</Avatar>
							<Typography component='h1' variant='h5'>
                            Enter Verification Code sent to your Email.
							</Typography>
							<Box component='form'
								onSubmit={handleVerificationSubmit}
								noValidate sx={{ mt: 1 }}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='verificationcode'
									onChange={(e) => setVerificationEnter(e.target.value)}
									value={verificationEnter}
									label='Verification Code'
									name='verificationcode'
									autoFocus/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}>
                                    Enter Verification Code
								</Button>
								<Grid container>
									<Grid item>
										<Link onClick={() => navigate('/signup')}href="/signup" variant="body2">
											{'Don\'t have an account? Sign Up'}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						:
						<></>
				}
				{blnMatch !== false ?
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon/>
						</Avatar>
						<Typography component='h1' variant='h5'>
                            Update password
						</Typography>
						<Box component='form'
							onSubmit={handlePassSubmit}
							noValidate sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='pass'
								type='password'
								onChange={(e) => setPass1(e.target.value)}
								value={pass1}
								label='Password'
								name='pass'
								autoFocus/>
							<TextField
								margin='normal'
								required
								fullWidth
								onChange={(e) => setPass2(e.target.value)}
								value={pass2}
								id='pass2'
								type='password'
								label='Confirm Password'
								name='pass2'
							/>
							<FormControlLabel
								control={<Checkbox onClick={() => setChecked(!checked)} value='remember' color='primary' />}
								label='Keep me logged in'/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
                                    Save New Password
							</Button>
							<Grid container>
								<Grid item>
									<Link onClick={() => navigate('/signup')}href="/signup" variant="body2">
										{'Don\'t have an account? Sign Up'}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					:
					<></>
				}
				{
					id === null && verificationCode === null ?
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon/>
							</Avatar>
							<Typography component='h1' variant='h5'>
                            Enter Account Details
							</Typography>
							<Box component='form'
								onSubmit={handleSendSubmit}
								noValidate sx={{ mt: 1 }}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email'
									name='email'
									autoComplete='email'
									autoFocus/>
								<TextField
									margin='normal'
									required
									fullWidth
									id='user'
									label='Username'
									name='user'
									autoComplete='user'
								/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}>
                                    Send Verification Code
								</Button>
								<Grid container>
									<Grid item>
										<Link onClick={() => navigate('/signup')}href="/signup" variant="body2">
											{'Don\'t have an account? Sign Up'}
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						:
						<></>
				}

				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	)
}

export default ForgotPass
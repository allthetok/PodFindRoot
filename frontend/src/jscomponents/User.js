/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
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
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerificationDialog from './VerificationDialog'
import './User.css'

const User = ({ userId, handleUserLogout }) => {

	// const getUsernameEmail = async (userId) => {
	//     let userDetails = {
	//         'struser': '',
	//         'stremail': ''
	//     }
	//     const userConfig = {
	//         method: 'post',
	//         url: 'http://localhost:3002/api/userEmail',
	//         headers: {
	//             'Content-Type': 'application/json'
	//         },
	//         data: {
	//             'lnguserid': userId
	//         }
	//     }
	//     await axios(userConfig).then(response => {
	//         userDetails = {
	//             'struser': response.data.struser,
	//             'stremail': response.data.stremail
	//         }
	//     }).catch(err => {
	//         console.log(err)
	//     })
	//     return userDetails
	// }

	const [editUser, setEditUser] = useState(true)
	const [editEmail, setEditEmail] = useState(true)
	const [editPass, setEditPass] = useState(true)
	const [Options, setOptions] = useState('USEREMAIL')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [pass1, setPass1] = useState('')
	const [pass2, setPass2] = useState('')
	const [open, setOpen] = useState(false)
	const [verificationEnter, setVerificationEnter] = useState('')
	const [verificationCode, setVerificationCode] = useState(null)

	const handleClickOpen = () => {
		setOpen(true)
		sendUserVerificationCode(email)
	}

	const handleClose = () => {
		// if (match === false) {
		//    await getUsernameEmail(userId)
		// }
		setOpen(false)
	}

	const handleChange = (e) => {
		setVerificationEnter(e.target.value)
	}

	const sendUserVerificationCode = async (stremail) => {
		const sendEmailConfig = {
			method: 'post',
			url: 'http://localhost:3003/api/verification',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'stremail': stremail
			}
		}
		await axios(sendEmailConfig).then(response => {
			setVerificationCode(response.data.verificationCode)
		})
			.catch(err => {
				console.log(err)
			})
	}


	const getUsernameEmail = async (userId) => {
		const userConfig = {
			method: 'post',
			url: 'http://localhost:3002/api/userEmail',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'lnguserid': userId
			}
		}
		await axios(userConfig).then(response => {
			console.log('fired')
			setUsername(response.data.struser)
			setEmail(response.data.stremail)
		}).catch(err => {
			console.log(err)
		})
	}

	// const handleSubmit = (e) => {
	//     e.preventDefault()
	//     console.log(textInput)
	//     setFinalSearch(textInput.current.value)
	//     setFormSubmitted(true)
	// }

	// const handleSubmit = async (e) => {
	//     e.preventDefault()
	//     if (Options === 'USEREMAIL') {
	//         const userUsernameConfig = {
	//             method: 'patch',
	//             url: 'http://localhost:3002/api/username',
	//             headers: {
	//                 'Content-Type': 'application/json'
	//             },
	//             data: {
	//                 'lnguserid': userId,
	//                 'struser': username
	//             }
	//         }
	//         const userEmailConfig = {
	//             method: 'patch',
	//             url: 'http://localhost:3002/api/userEmail',
	//             headers: {
	//                 'Content-Type': 'application/json'
	//             },
	//             data: {
	//                 'lnguserid': userId,
	//                 'stremail': email
	//             }
	//         }
	//         if (editUser === false && editEmail === true) {
	//             await axios(userUsernameConfig).then(response => {
	//                 if (response.status === 200) {
	//                     setEditUser(response.data.blnSuccess)
	//                 }
	//             })
	//             .catch(err => {
	//                 console.log(err)
	//             })
	//         }
	//         else if (editUser === true && editEmail === false) {
	//             await axios(userEmailConfig).then(response => {
	//                 if (response.status === 200) {
	//                     setEditEmail(response.data.blnSuccess)
	//                 }
	//             })
	//             .catch(err => {
	//                 console.log(err)
	//             })
	//         }
	//         else {
	//             await axios(userUsernameConfig).then(response => {
	//                 if (response.status === 200)
	//                     setEditUser(response.data.blnSuccess)
	//             })
	//             .catch(err => {
	//                 console.log(err)
	//             })
	//             await axios(userEmailConfig).then(response => {
	//                 if (response.status === 200) {
	//                     setEditEmail(response.data.blnSuccess)
	//                 }
	//             })
	//             .catch(err => {
	//                 console.log(err)
	//             })
	//         }
	//     }
	//     else {
	//         const userPassConfig = {
	//             method: 'patch',
	//             url: 'http://localhost:3002/api/userPass',
	//             headers: {
	//                 'Content-Type': 'application/json'
	//             },
	//             data: {
	//                 'lnguserid': userId,
	//                 'strpass': pass1
	//             }
	//         }
	//         await axios(userPassConfig).then(response => {
	//             if (response.status === 200) {
	//                 setEditPass(response.data.blnSuccess)
	//             }
	//         })
	//         .catch(err => {
	//             console.log(err)
	//         })
	//     }
	// }

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (Options === 'USEREMAIL') {
			const userUsernameConfig = {
				method: 'patch',
				url: 'http://localhost:3002/api/username',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					'lnguserid': userId,
					'struser': username
				}
			}
			if (editUser === false && editEmail === true) {
				await axios(userUsernameConfig).then(response => {
					if (response.status === 200) {
						setEditUser(response.data.blnSuccess)
					}
				})
					.catch(err => {
						console.log(err)
					})
			}
			else {
				handleClickOpen()
			}
		}
		else {
			const userPassConfig = {
				method: 'patch',
				url: 'http://localhost:3002/api/userPass',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					'lnguserid': userId,
					'strpass': pass1
				}
			}
			await axios(userPassConfig).then(response => {
				if (response.status === 200) {
					setEditPass(response.data.blnSuccess)
				}
			})
				.catch(err => {
					console.log(err)
				})
		}
	}

	const handleVerificationSubmit = async (e) => {
		e.preventDefault()
		console.log(verificationCode)
		if (parseInt(verificationEnter) === verificationCode) {
			if (editUser === true && editEmail === false) {
				const userEmailConfig = {
					method: 'patch',
					url: 'http://localhost:3002/api/userEmail',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'lnguserid': userId,
						'stremail': email
					}
				}
				await axios(userEmailConfig).then(response => {
					if (response.status === 200) {
						setEditEmail(response.data.blnSuccess)
					}
				})
					.catch(err => {
						console.log(err)
					})
			}
			else {
				const userUsernameConfig = {
					method: 'patch',
					url: 'http://localhost:3002/api/username',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'lnguserid': userId,
						'struser': username
					}
				}
				const userEmailConfig = {
					method: 'patch',
					url: 'http://localhost:3002/api/userEmail',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						'lnguserid': userId,
						'stremail': email
					}
				}
				await axios(userUsernameConfig).then(response => {
					if (response.status === 200) {
						setEditUser(response.data.blnSuccess)
					}
				})
					.catch(err => {
						console.log(err)
					})
				await axios(userEmailConfig).then(response => {
					if (response.status === 200) {
						setEditEmail(response.data.blnSuccess)
					}
				})
					.catch(err => {
						console.log(err)
					})
			}
			setVerificationEnter('')
			handleClose()
		}
	}

	useEffect(() => {
		getUsernameEmail(userId)
	}, [userId])

	return (
		<div className='userContainer'>
			<Navbar handleUserLogout={handleUserLogout}/>
			<div className='buttonWrap'>
				<Button onClick={() => setOptions('USEREMAIL')} variant={Options === 'USEREMAIL' ? 'contained' : 'outlined'}>USER DETAILS</Button>
				<Button onClick={() => setOptions('PASS')} variant={Options === 'PASS' ? 'contained' : 'outlined'}>Password</Button>
			</div>
			<div>
				{Options === 'USEREMAIL' ?
					<div>
						<Container component='main' maxWidth='m' sx={{ color: 'white', fontWeight: '400', fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0.00938em' }}>
							<Box
								sx={{
									marginTop: 8,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									bgcolor: '#0b1528'
								}}>
								<Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
									<AccountBoxIcon/>
								</Avatar>
								<Typography component='h1' variant='h5'>
                                Update user details
								</Typography>
								<Box component='form'
									onSubmit={handleSubmit}
									sx={{ mt: 1 }}
									noValidate>
									<div className='textWrap'>
										<TextField
											margin='normal'
											id='user'
											label='Username'
											disabled={editUser}
											onChange={(e) => setUsername(e.target.value)}
											value={username}
											name='user'
											autoComplete='user'
											sx={{ bgcolor: 'white', width: '75%' }}
											autoFocus/>
										<IconButton
											size="large"
											edge="start"
											color="inherit"
											aria-label="open drawer"
											sx={{ mr: 2 , color: 'white', paddingLeft: '25px', paddingTop: '25px' }}
											onClick={() => setEditUser(!editUser)}
										>
											<CreateIcon />
										</IconButton>
									</div>
									<div className='textWrap'>
										<TextField
											margin='normal'
											id='email'
											label='Email'
											disabled={editEmail}
											onChange={(e) => setEmail(e.target.value)}
											value={email}
											name='email'
											autoComplete='email'
											sx={{ bgcolor: 'white', width: '75%' }}
											autoFocus/>
										<IconButton
											size="large"
											edge="start"
											color="inherit"
											aria-label="open drawer"
											sx={{ mr: 2 , color: 'white', paddingLeft: '25px', paddingTop: '25px' }}
											onClick={() => setEditEmail(!editEmail)}
										>
											<CreateIcon />
										</IconButton>
									</div>
									<div className='textWrap'>
										<Button
											type='submit'
											disabled={Options === 'USEREMAIL' ? editUser && editEmail : editPass}
											fullWidth
											variant='contained'
											sx={{ mt: 3, mb: 2, width: '75%' }}>
                                        Save Changes
										</Button>
									</div>
								</Box>
							</Box>
						</Container>

						<VerificationDialog open={open} verificationEnter={verificationEnter} handleChange={handleChange} handleClickOpen={handleClickOpen} handleVerificationSubmit={handleVerificationSubmit} handleClose={handleClose} />
					</div>
					: <></>
				}
				{Options === 'PASS' ?
					<div>
						<Container component='main' maxWidth='m' sx={{ color: 'white', fontWeight: '400', fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0.00938em' }}>
							<Box
								sx={{
									marginTop: 8,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									bgcolor: '#0b1528'
								}}>
								<Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
									<AccountBoxIcon/>
								</Avatar>
								<Typography component='h1' variant='h5'>
                                Update password
								</Typography>
								<Box component='form'
									onSubmit={handleSubmit}
									sx={{ mt: 1 }}
									noValidate>
									<div className='textWrap'>
										<TextField
											margin='normal'
											id='pass'
											label='Password'
											disabled={editPass}
											value={pass1}
											onChange={(e) => setPass1(e.target.value)}
											name='pass'
											type='password'
											error={pass1 !== pass2}
											autoComplete='pass'
											sx={{ bgcolor: 'white', width: '75%' }}
											autoFocus/>
										<IconButton
											size="large"
											edge="start"
											color="inherit"
											aria-label="open drawer"
											sx={{ mr: 2 , color: 'white', paddingLeft: '25px', paddingTop: '25px' }}
											onClick={() => setEditPass(!editPass)}
										>
											<CreateIcon />
										</IconButton>
									</div>
									<div className='textWrap'>
										<TextField
											margin='normal'
											id='pass'
											label='Confirm Password'
											disabled={editPass}
											value={pass2}
											onChange={(e) => setPass2(e.target.value)}
											name='pass'
											type='password'
											error={pass1 !== pass2}
											autoComplete='pass'
											sx={{ bgcolor: 'white', width: '75%' }}
											autoFocus/>
									</div>
									<div className='textWrap'>
										<Button
											type='submit'
											fullWidth
											variant='contained'
											disabled={Options === 'USEREMAIL' ? editUser && editEmail : editPass}
											sx={{ mt: 3, mb: 2, width: '75%' }}>
                                        Save Changes
										</Button>
									</div>
									{/* <Grid container>
                                    <Grid item xs>
                                        <Link onClick={() => navigate('/forgot')} href="/forgot" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link onClick={() => navigate('/signup')} href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid> */}
								</Box>
							</Box>
						</Container>
					</div>
					: <></>
				}

			</div>
		</div>
	)
}

export default User
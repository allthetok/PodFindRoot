/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { FormEventHandler, LegacyRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PersonIcon from '@mui/icons-material/Person'
import './SearchPod.css'
import { LogoutDialog } from './LogoutDialog'

type NavbarProps = {
	handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
	textInput: LegacyRef<HTMLInputElement> | undefined,
	handleUserLogout: (e: any) => void
}

const Navbar = ({ handleSubmit, textInput, handleUserLogout }: NavbarProps) => {

	const navigate = useNavigate()

	const handleHomeClick = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		localStorage.removeItem('selectedLikePod')
		navigate('/')
	}

	const handleLikeClick = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		navigate('/likes')
		localStorage.removeItem('selectedLikePod')
	}

	const handleDiscoverClick = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		navigate('/discover')
		localStorage.removeItem('selectedLikePod')
	}


	const handleProfileClick = (e: { preventDefault: () => void }) => {
		e.preventDefault()
		navigate('/profile')
	}

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="open drawer"
							sx={{ mr: 2 }}
							onClick={handleHomeClick}
						>
							<HomeIcon />
							{/* <MenuIcon /> */}
						</IconButton>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ display: { xs: 'none', sm: 'block' } }}
						>
							<a className='homeText' onClick={handleHomeClick}>PodFinder</a>
						</Typography>
						<div className='searchWrap'>
							<form className='searchBar' onSubmit={handleSubmit}>
								<input type='text' ref={textInput} required placeholder='Search...' />
								<button className='searchBtn'>
									<span>Search</span>
								</button>
							</form>
						</div>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								color="inherit"
								onClick={handleDiscoverClick}
							>
								<SignalCellularAltIcon />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								color="inherit"
								onClick={handleLikeClick}
							>
								<FavoriteIcon />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								color="inherit"
								onClick={handleProfileClick}
							>
								<PersonIcon />
							</IconButton>
						</Box>
						<LogoutDialog handleUserLogout={handleUserLogout}/>
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	)
}

export { Navbar }
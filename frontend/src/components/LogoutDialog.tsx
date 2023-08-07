/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import DialogTitle from '@mui/material/DialogTitle'

type LogoutDialogProps = {
	handleUserLogout: (e: any) => void
}

const LogoutDialog = ({ handleUserLogout }: LogoutDialogProps) => {
	const [open, setOpen] = useState(false)

	const navigate = useNavigate()

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleCloseLogout = (e: { preventDefault: () => void }) => {
		handleUserLogout(e)
		navigate('/')
		setOpen(false)
	}

	return (
		<div>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
				<IconButton
					size="large"
					edge="end"
					aria-label="account of current user"
					color="inherit"
					onClick={handleClickOpen}
				>
					<LogoutIcon />
				</IconButton>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"

			>
				<DialogTitle id='alert-dialog-title' sx={ { backgroundColor: '#0b1528', color: '#fff', paddingBottom: '0' }}>
					{'Are you sure you want to log out?'}
				</DialogTitle>
				<DialogActions sx={ { backgroundColor: '#0b1528', justifyContent: 'center', paddingTop: '0' }}>
					<IconButton
						size="large"
						edge="end"
						aria-label="account of current user"
						color="error"
						onClick={handleClose}>
						<CancelIcon sx={ { fontSize: '2.5rem' }}/>
					</IconButton>
					<IconButton
						size="large"
						edge="end"
						aria-label="account of current user"
						color="success"
						autoFocus
						onClick={handleCloseLogout}>
						<DoneIcon sx={ { fontSize: '2.5rem' }}/>
					</IconButton>
				</DialogActions>
			</Dialog>
			{/* </Box> */}
		</div>
	)
}

export { LogoutDialog }
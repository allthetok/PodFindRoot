/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const VerificationDialog = ({ open, verificationEnter, handleChange, handleClickOpen, handleVerificationSubmit, handleClose }) => {

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				//sx={{ backgroundColor: '#0b1528'}}
			>
				<DialogTitle id='alert-dialog-title' sx={ { backgroundColor: '#0b1528', color: '#fff', paddingBottom: '0' }}>
					{'Enter verification code sent to your new email'}
				</DialogTitle>
				<TextField
					margin='normal'
					id='verifcode'
					label='Verification Code'
					value={verificationEnter}
					onChange={handleChange}
					name='verifcode'
					//sx={{bgcolor: 'white', width: '50%', paddingLeft: '120px'}}
					sx={{ marginTop: '0px', marginBottom: '0px' }}
					fullWidth
					autoFocus/>
				<DialogActions sx={ { backgroundColor: '#0b1528', justifyContent: 'center', paddingTop: '5px' }}>
					{/* <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        color="error"
                        onClick={handleClose}>
                            <CancelIcon sx={ {fontSize: '2.5rem'}}/>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        color="success"
                        autoFocus
                        onClick>
                            <DoneIcon sx={ {fontSize: '2.5rem'}}/>
                    </IconButton> */}
					<Button onClick={handleVerificationSubmit} variant='contained' >Verify</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default VerificationDialog
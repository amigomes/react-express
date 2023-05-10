import React from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';
import { useReducer } from 'react';

const BASE_URL = "https://impossible-snaps-tick.cyclic.app"
const API_VERSION = "/api/v1"

// Reducer to manage multiple state (Redux using useReducer hook)
const initialToolFormState = {
	"toolName": null,
	"toolWebsite": "",
	"toolShortDescription": "",
	"toolDescription": "",
	"Email": ""
}

function reducer(state, action) {
	switch (action.type) {
		case 'change':
			return {
				...state,
				[action.field]: action.value
			};
		case 'submit':
			return {
				...state,
				error: null,
				success: null
			};
		case 'success':
			return {
				...initialToolFormState,
				success: 'Thank you for your message!'
			};
		case 'error':
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
}

const Submit = () => {

	const [state, dispatch] = useReducer(reducer, initialToolFormState);

	const handleChange = event => {
		const { name, value } = event.target;
		dispatch({ type: 'change', field: name, value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch({ type: 'submit' });
		try {
			await axios.post(BASE_URL+API_VERSION+"/submit", state);
			dispatch({ type: 'success' });
		} catch (error) {
			dispatch({ type: 'error', error });
		}
	};
	return (
		<div className="SubmitNewTool">
			<Grid>
				<Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
					<CardContent>
						<Typography gutterBottom variant="h5">
							Submit New Tool
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p" gutterBottom>
							We will review your submitted tool and update the listing.
						</Typography>
						<form onSubmit={handleSubmit} onChange={handleChange}>
							<Grid container spacing={1}>
								<Grid xs={12} sm={6} item>
									<TextField placeholder="Tool Name" label="Tool Name" name='toolName' variant="outlined" fullWidth required />
								</Grid>
								<Grid xs={12} sm={6} item>
									<TextField placeholder="Tool Website" label="Tool Website" name='toolWebsite' variant="outlined" fullWidth required />
								</Grid>
								<Grid item xs={12}>
									<TextField label="Tool Short Description" multiline rows={4} name='toolShortDescription' placeholder="Enter Tool Short Description" variant="outlined" fullWidth required />
								</Grid>
								<Grid item xs={12}>
									<TextField label="Tool Description" multiline rows={4} name='toolDescription' placeholder="Type Tool's Full Description" variant="outlined" fullWidth required />
								</Grid>
								<Grid item xs={12}>
									<TextField type="email" placeholder="Enter email" label="Email" name='Email' variant="outlined" fullWidth />
								</Grid>
								<Grid item xs={12}>
									<Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</div>
	);
};

export default Submit;
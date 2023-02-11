import React from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';

const Submit = () => {
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
		  <form>
			<Grid container spacing={1}>
			  <Grid xs={12} sm={6} item>
				<TextField placeholder="Tool Name" label="Tool Name" variant="outlined" fullWidth required />
			  </Grid>
			  <Grid xs={12} sm={6} item>
				<TextField placeholder="Tool Website" label="Tool Website" variant="outlined" fullWidth required />
			  </Grid>
			  <Grid item xs={12}>
				<TextField label="Tool Short Description" multiline rows={4} placeholder="Enter Tool Short Description" variant="outlined" fullWidth required />
			  </Grid>
			  <Grid item xs={12}>
				<TextField label="Tool Description" multiline rows={4} placeholder="Type Tool's Full Description" variant="outlined" fullWidth required />
			  </Grid>
			  <Grid item xs={12}>
				<TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth />
			  </Grid>
			  <Grid item xs={12}>
				<Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
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
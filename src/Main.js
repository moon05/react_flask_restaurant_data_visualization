
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import DatePicker from "react-datepicker";
import {DateTime} from "luxon";
import CustomerCount from './CustomerCount';
import AvgTTS from './AvgTTS';
import DayPartTTS from "./DayPartTTS"
import WeeklyDistribution from "./WeeklyDistribution"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Main() {


	const classes = useStyles();


	const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);

    });
  }, []);

  
  return (
  	<Grid container spacing={12} direction="row" justify="center" alignItems="center">
    	<Grid item container xs={10} direction="row" justify="center">
        	<div>
        		<h1> Restaurant Data Visualization</h1>
        	</div>
    	</Grid>
    	<Grid container xs={10} direction="row" justify="center" style={{paddingTop: 5}}>
	        <Grid item container xs={12} direction="row" justify="center" style={{paddingTop: 5}}>
		        <Tabs>

		        	<TabList>
		        		<Tab>Average Customer Data By Hour</Tab>
		      			<Tab>Average TTS Data By Hour</Tab>
		      			<Tab>Average TTS By Day Part</Tab>
		      			<Tab>Weekly TTS Distribution</Tab>
		        	</TabList>

		        	<TabPanel>
		        		<CustomerCount />
		        	</TabPanel>

		        	<TabPanel>
		        		<AvgTTS />
		        	</TabPanel>

		        	<TabPanel>
		        		<DayPartTTS />
		        	</TabPanel>

		        	<TabPanel>
		        		<WeeklyDistribution />
		        	</TabPanel>

		        </Tabs>
	        </Grid>
        </Grid>
    </Grid>
    
  );

}

export default Main;
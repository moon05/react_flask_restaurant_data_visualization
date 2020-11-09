import React, { useState, useEffect } from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import DatePicker from "react-datepicker";
import {DateTime} from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import CustomChart from "./CustomChart";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />



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

function SubDayPart(props) {

  const classes = useStyles();

  //DATEPICKER STUFF
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  //hack for making it load without refreshing
  const [entered, setEntered] = useState(false);

  const handleCalendarClose = () => console.log("Calendar Closed");
  const handleCalendarOpen = () => console.log("Calendar Opened");

  useEffect(() => {
  	setEntered(true);
  }, [])




const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];
		
	return (
	    <div className={classes.root}>
        
        <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="center">
          
          <Grid item xs={5} justify="center" >
            
            
            <CustomChart data={data} xaxisData={"name"} DataValues={"uv"}/>

          </Grid>
          
          <Grid item xs={5} justify="center" >
            
            <CustomChart data={data} xaxisData={"name"} DataValues={"pv"}/>
              
          </Grid>
          
          <Grid item xs={5} justify="center" >

            <CustomChart data={data} xaxisData={"name"} DataValues={"amt"}/>
            
          </Grid>
          
          <Grid item xs={5} justify="center" >

            <CustomChart data={data} xaxisData={"name"} DataValues={"uv"}/>
            
          </Grid>

        </Grid>

	    </div>
  );
	
}

export default SubDayPart;
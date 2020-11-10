import React, { useState, useEffect } from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import DatePicker from "react-datepicker";
import {DateTime} from "luxon";
import SubDayPart from "./SubDayPart"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomChart from "./CustomChart";
import 'react-tabs/style/react-tabs.css';

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function DayPartTTs(props) {

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

  //CUSTOMER BIG DICT STUFF
  const [dayPartData, setDayPartData] = useState({});
  const [currentDayPartData, setCurrentDayPartDayData] = useState([]);

  let dayPartDataObj = {};
  useEffect(() => {
    fetch('/getAvgTTSByDayPart')
      .then(res => res.json())
        .then(data => {
          Object.keys(data).map((key, value) => 
            {
              let subRes;
              subRes = Object.keys(data[key]).map((subKey) => data[key][subKey])
              let newKey = DateTime.fromISO(key, {zone: 'utc'}).toUTC();
              dayPartDataObj[newKey] = subRes;
            }
          )
        
          setDayPartData(dayPartDataObj);

        });
  }, [entered]);

  useEffect(() => {

    //Retreiving the first value from customerHourData object and setting it
    //as default graph data
    var daypartD = Object.values(dayPartData)[0];
    setCurrentDayPartDayData(daypartD);
    console.log(daypartD, "SETTING DEAFULT DATA for Avergae Customer By Hour Graph");


    let firstElement = Object.keys(dayPartData)[0];
    firstElement = new Date(firstElement);
    firstElement.setDate(firstElement.getDate() + 1);

    let lastElement = Object.keys(dayPartData)[Object.keys(dayPartData).length - 1]
    lastElement = new Date(lastElement);
    lastElement.setDate(lastElement.getDate() + 1);

    setStartDate(firstElement);
    setEndDate(lastElement);

    setDate(startDate);

    console.log(startDate);
    console.log(endDate);

  }, [dayPartData]);


		
	return (

      <Grid container spacing={12} direction="row" justify="center" alignItems="center" style={{paddingTop: 15}}>
        <Grid item container sm={10} direction="row" justify="flex-end" alignItems="center">
          <DatePicker 
              selected={(date instanceof Date && !isNaN(date)) ? date : new Date()}
              onChange={date => {
                setDate(date); 
                //There some weird stuff happens with the date conversions
                //This is a way to force it to choose the correct date
                let chosenDate = new Date(date);
                chosenDate.setDate(chosenDate.getDate() - 1)
                var a = chosenDate.toISOString();
                console.log(a);
                setCurrentDayPartDayData(dayPartData[a]);
                console.log("CURRENT DATE DATA SET TO: ", currentDayPartData)
              }}
              onCalendarClose={handleCalendarClose}
              onCalendarOpen={handleCalendarOpen}
              minDate={startDate}
              maxDate={endDate}
              showDisabledMonthNavigation
             />
        </Grid>
        <Grid item container sm={10} justify="center" alignItems="center">
            <CustomChart data={currentDayPartData} xAxisData={"name"} dataValues={"tts"} color={6}/>
        </Grid>
      </Grid>

  );
	
}

export default DayPartTTs;
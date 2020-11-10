import React, { useState, useEffect } from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import DatePicker from "react-datepicker";
import {DateTime} from "luxon";
import CustomChart from "./CustomChart";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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


function AvgTTS(props) {
  

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


  //AVG TTS STUFF
  const [avgTTSData, setAvgTTSData] = useState({});
  const [currentDayTTSData, setCurrentDayTTSData] = useState([]);

  let avgttsObj = {};

  useEffect(() => {
    fetch('/getAvgTTS')
      .then(res => res.json())
        .then(data => {
          Object.keys(data).map((key, value) => 
            {
              let subRes;
              subRes = Object.keys(data[key]).map((subKey) => data[key][subKey])
              let newKey = DateTime.fromISO(key, {zone: 'utc'}).toUTC();
              avgttsObj[newKey] = subRes;
            }
          )
          console.log(avgttsObj)
          setAvgTTSData(avgttsObj);
          console.log(avgTTSData)

        });
  }, [entered])

  useEffect(() => {

    //Retreiving the first value from customerHourData object and setting it
    //as default graph data
    var ttsD = Object.values(avgTTSData)[0];
    setCurrentDayTTSData(ttsD);
    console.log(ttsD, "SETTING DEAFULT DATA for Avergae TTS By Hour Graph");


    let firstElement = Object.keys(avgTTSData)[0];
    firstElement = new Date(firstElement);
    firstElement.setDate(firstElement.getDate() + 1);

    let lastElement = Object.keys(avgTTSData)[Object.keys(avgTTSData).length - 1]
    lastElement = new Date(lastElement);
    lastElement.setDate(lastElement.getDate() + 1);

    setStartDate(firstElement);
    setEndDate(lastElement);

    setDate(startDate);

    console.log(startDate);
    console.log(endDate);

  }, [avgTTSData]);



		
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
              setCurrentDayTTSData(avgTTSData[a]);
              console.log("CURRENT DATE DATA SET TO: ", currentDayTTSData)
            }}
            onCalendarClose={handleCalendarClose}
            onCalendarOpen={handleCalendarOpen}
            minDate={startDate}
            maxDate={endDate}
            showDisabledMonthNavigation
          />
        </Grid>
        <Grid item container sm={10} justify="center" alignItems="center">
          <CustomChart data={currentDayTTSData} xAxisData={"time"} dataValues={"tts"} color={2}/>


        </Grid>
      </Grid>
  );
	
}

export default AvgTTS;
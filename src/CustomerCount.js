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


function CustomerCount(props) {

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
  const [customerHourData, setCustomerHourData] = useState({});
  const [currentDayData, setCurrentDayData] = useState([]);

  let customerCountObj = {};
  useEffect(() => {
    fetch('https://flask-restaurant-backend.herokuapp.com/getCustomerCount')
      .then(res => res.json())
        .then(data => {
          Object.keys(data).map((key, value) => 
            {
              let subRes;
              subRes = Object.keys(data[key]).map((subKey) => data[key][subKey])
              let newKey = DateTime.fromISO(key, {zone: 'utc'}).toUTC();
              customerCountObj[newKey] = subRes;
            }
          )
        
          setCustomerHourData(customerCountObj);

        });
  }, [entered]);

  useEffect(() => {

    //Retreiving the first value from customerHourData object and setting it
    //as default graph data
    var cusD = Object.values(customerHourData)[0];
    setCurrentDayData(cusD);
    console.log(cusD, "SETTING DEAFULT DATA for Avergae Customer By Hour Graph");


    let firstElement = Object.keys(customerHourData)[0];
    firstElement = new Date(firstElement);
    firstElement.setDate(firstElement.getDate() + 1);

    let lastElement = Object.keys(customerHourData)[Object.keys(customerHourData).length - 1]
    lastElement = new Date(lastElement);
    lastElement.setDate(lastElement.getDate() + 1);

    setStartDate(firstElement);
    setEndDate(lastElement);

    setDate(startDate);

    console.log(startDate);
    console.log(endDate);

  }, [customerHourData]);

		
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
			          setCurrentDayData(customerHourData[a]);
			          console.log("CURRENT DATE DATA SET TO: ", currentDayData)
			        }}
			        onCalendarClose={handleCalendarClose}
			        onCalendarOpen={handleCalendarOpen}
			        minDate={startDate}
			        maxDate={endDate}
			        showDisabledMonthNavigation
			       />
			</Grid>
			<Grid item container sm={10} justify="center" alignItems="center">
		        <CustomChart data={currentDayData} xAxisData={"time"} dataValues={"customer_number"} color={1}/>
		    </Grid>
      </Grid>
	    
  );

}

export default CustomerCount;
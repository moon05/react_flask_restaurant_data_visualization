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

function WeeklyDistribution(props) {

  const classes = useStyles();

  //hack for making it load without refreshing
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(true);
  }, [])

  //Weekly Distribution BIG DICT STUFF
  const [weeklyData, setWeeklyData] = useState({});

  let weeklyDataObj = [];

  useEffect(() => {
    fetch('https://flask-restaurant-backend.herokuapp.com/getTTSDistribution')
      .then(res => res.json())
        .then(data => {
          // dictionaries of dataframes level here
          let finalRes = []
          Object.keys(data).map((key, value) =>
            { 
              var a = Object.values(data[key])
              finalRes.push(a);
            }
          )
        console.log(typeof finalRes)
        console.log(finalRes, "final result here");
        console.log(typeof finalRes, "prijting type again")
          
          // console.log(weeklyDataObj, "printing weeklydata");
          // setWeeklyData(weeklyDataObj);
        setWeeklyData(finalRes);
        console.log("set data")

        });
  }, [entered]);

useState(() => {
  console.log("new useEffect")
  console.log(weeklyData, "Printing weekly data after loading");
}, [weeklyData])

  // useEffect(() => {

  //   //Retreiving the first value from customerHourData object and setting it
  //   //as default graph data
  //   var daypartD = Object.values(dayPartData)[0];
  //   setCurrentDayPartDayData(daypartD);
  //   console.log(daypartD, "SETTING DEAFULT DATA for Avergae Customer By Hour Graph");


  //   let firstElement = Object.keys(dayPartData)[0];
  //   firstElement = new Date(firstElement);
  //   firstElement.setDate(firstElement.getDate() + 1);

  //   let lastElement = Object.keys(dayPartData)[Object.keys(dayPartData).length - 1]
  //   lastElement = new Date(lastElement);
  //   lastElement.setDate(lastElement.getDate() + 1);

  //   setStartDate(firstElement);
  //   setEndDate(lastElement);

  //   setDate(startDate);

  //   console.log(startDate);
  //   console.log(endDate);

  // }, [dayPartData]);


		
	return (

      <Grid container xs={12} spacing={7} direction="row" justify="center" alignItems="center" style={{paddingTop: 15}}>
        <Grid item container xs={12} direction="row" justify="spaced-even" alignItems="center" style={{paddingTop: 10}}>
              <Grid item container xs={6} direction="row" justify="center" alignItems="center" >
                <CustomChart 
                    data={weeklyData[0]} 
                    xAxisData={"name"} 
                    dataValues={"count"} 
                    color={0} 
                    xAxisLabel={"Week 1"}
                    W={550} 
                    H={350}
                  />
              </Grid>

              <Grid item container xs={6} direction="row" justify="center" alignItems="center" >
                <CustomChart 
                  data={weeklyData[1]} 
                  xAxisData={"name"} 
                  dataValues={"count"} 
                  color={2} 
                  xAxisLabel={"Week 2"}
                  W={550} 
                  H={350}
                />
              </Grid>
          
        </Grid>
        <Grid item container xs={12} direction="row" justify="spaced-even" alignItems="center" style={{paddingTop: 5}}>
            <Grid item container xs={6} direction="row" justify="center" alignItems="center">
              <CustomChart 
                data={weeklyData[2]} 
                xAxisData={"name"} 
                dataValues={"count"} 
                color={3} 
                xAxisLabel={"Week 3"}
                W={550} 
                H={350}
              />
            </Grid>
            <Grid item container xs={6} direction="row" justify="center" alignItems="center">
              <CustomChart 
                data={weeklyData[3]} 
                xAxisData={"name"} 
                dataValues={"count"} 
                color={5} 
                xAxisLabel={"Week 4"}
                W={550} 
                H={350}
              />
            </Grid>
        </Grid>
      </Grid>

  );
	
}

export default WeeklyDistribution;
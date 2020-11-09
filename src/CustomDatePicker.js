import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import {DateTime} from "luxon";


function CustomChart(props) {
	//should make a loop for multiple DataValues and have a function to generate random pretty colors
	return (
		<BarChart width={650} height={310} data={props.data}barSize={20}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={props.xaxisData} scale="point" padding={{ left: 10, right: 10 }}/>
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey={props.DataValues} fill="#82ca9e"/>
        </BarChart>
	)

}

export default CustomChart;
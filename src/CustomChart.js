import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label} from 'recharts';
import 'react-tabs/style/react-tabs.css';

const colors = ["#FF9900", "#CC0C39", "#C8CF02", "#FE4B74", "#2A044A", "#0B2E59", "#7AB317"];

function CustomChart({ data, xAxisData, yAxisData, dataValues, color, W, H, xAxisLabel}) {
	//should make a loop for multiple DataValues and have a function to generate random pretty colors
    console.log("Entered Custom Chart");
    console.log(data)
    console.log(yAxisData)
    console.log(dataValues, "Data values in ccustom chart")
	return (
		<BarChart width={W ? W : 700} height={H ? H : 400} data={data} barSize={20}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            { xAxisLabel ? 
                <XAxis dataKey={xAxisData} scale="point" padding={{ left: 10, right: 10 }}>
                    <Label value={xAxisLabel} offset={-5} position="insideBottom" />
                </XAxis>
            : <XAxis dataKey={xAxisData} scale="point" padding={{ left: 10, right: 10 }}/>}
            <YAxis dataKey={yAxisData ? yAxisData : undefined } />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            { Array.isArray(dataValues) ?
                (dataValues.map((el, i) => 
                    {
                        console.log(el, i);
                        console.log(Object.values(data)[i]);
                        console.log(Object.values(data)[i][el]);
                        <Bar dataKey={el} fill={colors[i]}/>
                    }))
                : <Bar dataKey={dataValues} fill={colors[color]}/>
            }
        </BarChart>
	)

}

export default CustomChart;
import React, { useState, useEffect } from "react";
import { 
    Grid,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    InputAdornment,
    TextField } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid, 
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

// components
import Widget from "../../components/Widget/Widget";
import ApexLineChart from "./components/ApexLineChart";
import ApexHeatmap from "./components/ApexHeatmap";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from "./styles";
// import PageTitle from "../../components/PageTitle/PageTitle";

// const lineChartData = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
// ];

// const pieChartData = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

// const pie2 = [
//     {"foodtype":"Mixed","kgs":"160"},
//     {"foodtype":"Vegan","kgs":"686"},
//     {"foodtype":"Vegetarian","kgs":"395"}
// ];

// const pie3 = [
//     {foodtype:"Mixed",kgs:160},
//     {foodtype:"Vegan",kgs:200},
//     {foodtype:"Vegetarian",kgs:120}
// ];


export default function ChartOne(props) {
  var theme = useTheme();
//   var classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  // local
  var [activeIndex, setActiveIndexId] = useState(0);
  var [lineData, setLineData] = useState([]);
  var [pieData, setPieData] = useState([]);
//   var [foodTypeValue, setFoodTypeValue] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2019-09-20'));
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());

  const handleDateChangeFrom = date => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = date => {
    setSelectedDateTo(date);
  };
  
  useEffect(() => {
    // setLabelWidth(inputLabel.current.offsetWidth);

    var urlpath = process.env.NODE_ENV == "development" ? process.env.REACT_APP_URL_PATH : "";
    function fetchDataPie(){
        fetch(`${urlpath}/api/getChartData/pie/${localStorage.getItem("usergroup").toLowerCase()}/${localStorage.getItem("userid")}/${Date.parse(selectedDateFrom)}/${Date.parse(selectedDateTo)}`)
        .then(response => response.json())
        .then(response => setPieData(response))
    };
    fetchDataPie(); 

    async function fetchData(){
        fetch(`${urlpath}/api/getChartData/line/${localStorage.getItem("usergroup").toLowerCase()}/${localStorage.getItem("userid")}/${Date.parse(selectedDateFrom)}/${Date.parse(selectedDateTo)}`)
        .then(response => response.json())
        .then(response => setLineData(response))
    };
    fetchData();

  }, [selectedDateTo]);

//   function populateData(){

//   };

console.log(pieData);

  return (
    <>
      {/* <PageTitle title="Charts Page - Data Display" button="Latest Reports" /> */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Filters" noBodyPadding upperTitle  disableWidgetMenu = "true" >
            {/* <ApexLineChart /> */}
            <Grid container spacing={4}>
                {/* <Grid item xs={12} md={3}>
                    <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel ref={inputLabel} htmlFor="SelectFoodType">
                        Food Type
                    </InputLabel>
                    <Select
                        value={foodTypeValue}
                        onChange={e => setFoodTypeValue(e.target.value)}
                        labelWidth={labelWidth}
                        inputProps={{
                        name: 'Food Type',
                        id: 'SelectFoodType',
                        }}
                        
                    >
                        <MenuItem value={'Mixed'}>Mixed</MenuItem>
                        <MenuItem value={'Vegetarian'}>Vegetarian</MenuItem>
                        <MenuItem value={'Vegan'}>Vegan</MenuItem>
                        
                    </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={12} md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-from-picker-dialog"
                                label="Date From"
                                format="MM/dd/yyyy"
                                value={selectedDateFrom}
                                onChange={handleDateChangeFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-to-picker-dialog"
                                label="Date To"
                                format="MM/dd/yyyy"
                                value={selectedDateTo}
                                onChange={handleDateChangeTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
          </Widget>
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <Widget title="Apex Heatmap" upperTitle noBodyPadding>
            <ApexHeatmap />
          </Widget>
        </Grid> */}
        <Grid item xs={12} md={8}>
          <Widget title="Quantity vs. Date" noBodyPadding upperTitle disableWidgetMenu = "true" >
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                width={500}
                height={300}
                data={lineData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateadded" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="kgs"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
                {/* <Line
                  type="monotone"
                  dataKey="uv"
                  stroke={theme.palette.secondary.main}
                /> */}
              </LineChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        <Grid item xs={12} md={4}>
          <Widget title="Donations by Food Type" noBodyPadding upperTitle disableWidgetMenu = "true" >
            <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx={200} cy={150} outerRadius={80} width={200} height={300} data={pieData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="foodtype" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="kgs" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
            </RadarChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
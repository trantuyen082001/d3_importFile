import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import * as d3 from 'd3'
import Chart from './Chart/Chart';
import Histogram from './Chart/Histogram'
import "./style.css";


function App() {

  const [showData, setShowData] = useState([]);
  const [loading, setLoanding] = useState(true);

  const color = ["#0080ff ", "#ff0040", "#ffffff", "#00ff00"];


  useEffect(() => {
      try {
          d3.csv('https://gist.githubusercontent.com/trantuyen082001/40d07f6279e45aae4e0eb09db0fc440b/raw/3ecb15e7af0bc7d37576a0b9d7f7e7499b78076a/data.csv')
          .then((d) => {
              setShowData(d);
              setLoanding(false)
              // console.log(d)
          })
      } catch (error) {
          console.log("failed loading data", error)
      }
  },[])
  
  // const keysData = showData.columns
  // console.log(keysData[0])

  // console.log(keysData[0])


  // const region = showData.map((d) => (d.Region))


  // const nameRegion =  unique(region)

//   const checkRegion = [...new Set(showData.map((d) => d.Region))]
//   console.log(checkRegion)

//   console.log(showData)

//  const keyData = showData.columns;

//   const RegionData = {
//     name: 'Region',
//     color: [0],
//     items: checkRegion
//   }

//   const yearX = {
//     name: 'year',
//     items: showData.map((d) => (d.Year)).slice(0,18)
//   }

//   console.log(yearX)

//   const dateValue = {
//     name: '0-27 days',
//     color: color[2],
//     items: showData.map((d) => d['0-27 days']).slice(0,18)
//   }

//   const monthValue = {
//     name: '1-59 months',
//     color: color[3],
//     items: showData.map((d) => d['1-59 months']).slice(0,18)
//   }

  
//   const yearValue = {
//     name: '1-4 years',
//     color: color[3],
//     items: showData.map((d) => d['1-4 years']).slice(0,18)
//   }

  // console.log(showData)

  // const dateDatas = {
  //   name: keyData[2],
  //   color: color[2],
  //   // items: 
  // }

  // const dateValue = showData.map((d) => d['0-27 days'])
  // for(var key of keyData) {
  //   const datas = showData.map((d) => d[key])
  //   console.log(datas)
  // }
  
  // console.log(year)


  // const year = showData.map((d) => d3.timeParse("%Y")(d.Year))
  // const days = showData.map((d) => (d['0-27 days']))
  // const months = showData.map((d) => (d['1-59 months']))
  // const years = showData.map((d) => (d['1-4 years']))

  const daysData = {
    name: "0-27 days",
    color: "#ffffff",
    items: showData.map((d) => ({ value: d['0-27 days'], date: new Date(d.Year) }))
  }

  console.log(daysData.items)

  const monthsData = {
    name: "1-59 months",
    color: "#d53e4f",
    items: showData.map((d) => ({ value: d['1-59 months'], date: new Date(d.Year)}))
  }
  const yearsData = {
    name: "1-4 years",
    color: "#5e4fa2",
    items: showData.map((d) => ({ value: d['1-4 years'], date: new Date(d.Year) }))
  }




  const dimensions = {
    width: 900,
    height: 500,
    margin: {
      top: 30,
      right: 30,
      bottom: 70,
      left: 60
    }
  };

console.log(showData)  
  // console.log(RegionData)

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
           <Route path='/chart' element={<Chart data={[daysData, monthsData, yearsData]} dimensions={dimensions}/>}/>
           <Route path='/histogram' element={<Histogram data={[daysData, monthsData, yearsData]} dimensions={dimensions}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

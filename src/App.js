import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import * as d3 from 'd3'
import Chart from './Chart/Chart';
import Histogram from './Chart/Histogram'
import Legend from './view/Legend';
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

    // ========= CHANGE REGION ========  
    const [regionCurr, setRegionCurr] = useState([])
    const onChangeRegion = (e) => {
      const dataFloRegion = showData.filter(x => x.Region === e.target.value)
      console.log(e.target.value)
      console.log(dataFloRegion)
      setRegionCurr(dataFloRegion)
  }
  

  const checkRegion = [...new Set(showData.map((d) => d.Region))]

  const daysData = {
    name: "0-27 days",
    color: "#ffffff",
    items: showData.map((d) => ({ value: d['0-27 days'], date: new Date(d.Year) }))
  }

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
  

  const dayRegions = {
    name: "0-27 days",
    color: "#ffffff",
    items: regionCurr.map((d) => ({ value: d['0-27 days'], date: new Date(d.Year) }))
}
const monthRegions = {
    name: "1-59 months",
    color: "#d53e4f",
    items: regionCurr.map((d) => ({ value: d['1-59 months'], date: new Date(d.Year) }))
}
const yearRegions = {
    name: "1-4 years",
    color: "#5e4fa2",
    items: regionCurr.map((d) => ({ value: d['1-4 years'], date: new Date(d.Year) }))
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

  console.log(checkRegion)

  // ======== CHECK BOX ========
  // console.log(RegionData)
  const [selectedItems, setSelectedItems] = useState([]);
  const legendData = [dayRegions, monthRegions, yearRegions];
  const chartData = [
    dayRegions,
    ...[monthRegions, yearRegions].filter((d) => selectedItems.includes(d.name))
  ];

console.log(regionCurr.map((x)=> (x.Region)))



console.log(dayRegions)
console.log(monthRegions) 
console.log(yearRegions)

  

  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
     ? selectedItems.filter((item) => item !== name)
     : [...selectedItems, name];
    setSelectedItems(newSelectedItems); 
  }


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
           <Route 
                path='/chart' 
                element={
                  <>
                    <Chart 
                      regionCurr={regionCurr}
                      data={chartData} 
                      dimensions={dimensions}
                    />
                    <Legend
                      showData={showData}
                      data={legendData} 
                      selectedItems={selectedItems} 
                      onChange = {onChangeSelection}
                      onClick = {onChangeRegion} 
                      checkRegion = {checkRegion}
                    />
                  </>
                }
            />
           <Route path='/histogram' element={<Histogram data={[daysData, monthsData, yearsData]} dimensions={dimensions}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

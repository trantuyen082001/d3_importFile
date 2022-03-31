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
  
  // const keysData = showData.columns
  // console.log(keysData[0])

  // console.log(keysData[0])


  // const region = showData.map((d) => (d.Region))


  // const nameRegion =  unique(region)

  const checkRegion = [...new Set(showData.map((d) => d.Region))]

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
  // const daysDatas = {
  //   name: "0-27 days",
  //   color: "#ffffff",
  //   items: showData.map((d) => ({ ...d, date: new Date(d.Year) }))
  // }
  
  // console.log(daysDatas.items.filter(x => x.Region === 'Region of the Americas'))

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

  // var checkDataRegion = showData.values();
  // for(let elements of checkDataRegion) {  
  //   console.log(elements)
  // }

  // const checkRegions = showData.find((x) => x.Region === 'Africa Region');
  // console.log(checkRegions);

  const check_Africa_Region = showData.filter(x => x.Region === 'Africa Region')
  const check_Region_of_the_Americas = showData.filter(x => x.Region === 'Region of the Americas')
  const check_South_East_Asia_Region = showData.filter(x => x.Region === 'South-East Asia Region')
  const check_European_Region = showData.filter(x => x.Region === 'European Region')
  const check_Eastern_Mediterranean_Region = showData.filter(x => x.Region === 'Eastern Mediterranean Region')
  const check_Western_Pacific_Region = showData.filter(x => x.Region === 'Western Pacific Region')
  // console.log(check_Africa_Region)
  // console.log(check_Region_of_the_Americas.map((x) => x['1-4 years']))
  // console.log(check_South_East_Asia_Region)
  // console.log(check_European_Region)
  // console.log(check_Eastern_Mediterranean_Region)
  // console.log(check_Western_Pacific_Region)

  // const data_region = showData.filter(x => x.Region === )
  
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

  // ======== CHECK BOX ========
  // console.log(RegionData)
  const [selectedItems, setSelectedItems] = useState([]);
  const legendData = [daysData, monthsData, yearsData];
  const chartData = [
    daysData,
    ...[monthsData, yearsData].filter((d) => selectedItems.includes(d.name))
  ];
  // ========= CHANGE REGION ========   
  const [regionCurr, setRegionCurr] = useState([]);
  const regionCharts = showData.filter((d) => regionCurr.includes(d.Region))
  console.log(regionCharts)

  const chartRegions = showData.filter(x => x.Region);
  console.log(chartRegions)

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
                      region= 
                        {[
                          check_Africa_Region,
                          check_Region_of_the_Americas, 
                          check_South_East_Asia_Region,
                          check_European_Region,
                          check_Eastern_Mediterranean_Region,
                          check_Western_Pacific_Region
                        ]}
                      data={chartData} 
                      dimensions={dimensions}
                    />
                    <Legend
                      regions= 
                      {[
                        check_Africa_Region,
                        check_Region_of_the_Americas, 
                        check_South_East_Asia_Region,
                        check_European_Region,
                        check_Eastern_Mediterranean_Region,
                        check_Western_Pacific_Region
                      ]} 
                      data={legendData} 
                      selectedItems={selectedItems} 
                      onChange = {onChangeSelection} 
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

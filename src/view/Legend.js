import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

const Legend = ({showData,data, selectedItems, onChange, onClick, checkRegion}) => {

    // const onChangeRegion = (e) => {
    //     const dataFloRegion = showData.filter(x => x.Region === e.target.value)
    //     console.log(e.target.value)
    //     console.log(dataFloRegion)
    // }

    return (
    <div className='legendContainer'>
        <label style={{color: '#ffff'}}>
        <Form.Select 
            aria-label="Default select example"
            onClick={(e) => onClick(e)}
        > 
                <option>Open this select menu</option>
                {checkRegion.map((region) => (
                    <option value={region} key={region}>{region}</option>
                ))}
        </Form.Select>
        </label>
        { 
            data.map((d) => (
                <div className='checkbox' style={{ color: d.color }} key={d.name}>
                    {
                        d.name !== 'monthsData' && (
                            <input 
                                type="checkbox"
                                value={d.name}
                                checked={selectedItems.includes(d.name)}
                                onChange = {() => onChange(d.name)} 
                            />
                        )
                    }
                    <label>{d.name}</label>
                </div>
            ))
        }
    </div>
  )
}

export default Legend
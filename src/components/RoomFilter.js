import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../Context'
import Title from './Title'

// get unique values from rooms array for particular item
function getUniqueValues(items, value) {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter() {
    const context = useContext(RoomContext);
    console.log(context);
    let { rooms, handleChange, type, capacity } = context;

    // type filter mapping
    let types = getUniqueValues(rooms, 'type');
    types = ["all", ...types];
    types = types.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    });

    // capacity filter mapping
    let guests = getUniqueValues(rooms, 'capacity');
    guests = guests.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    });
    
    return (
        <section className="filter-container">
            <Title title="Search rooms" />
            <form className="filter-form">
                {/* start type filter */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select onChange={handleChange} name="type" id="type" value={type} className="form-control">
                        {types}
                    </select>
                </div>
                {/* end type filter */}
                {/* start capacity filter */}
                <div className="form-group">
                    <label htmlFor="capacity">Guest</label>
                    <select onChange={handleChange} name="capacity" id="capacity" value={capacity} className="form-control">
                        {guests}
                    </select>
                </div>
                {/* end capacity filter*/}
            </form>
        </section>
    )
}

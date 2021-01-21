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
    let { rooms, handleChange, type, capacity, price, maxPrice, minPrice, minSize, maxSize, breakfast, pets } = context;

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
                {/* start price filter */}
                <div className="form-group">
                    <label htmlFor="price">Room Price {price}</label>
                    <input type="range" id="price" className="form-control" name="price" onChange={handleChange} min={minPrice} max={maxPrice} value={price} />
                </div>
                {/* end price filter*/}
                {/* start size filter */}
                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <input type="number" name="minSize" id="size" className="size-input" value={minSize} onChange={handleChange} />
                    <input type="number" name="maxSize" id="size" className="size-input" value={maxSize} onChange={handleChange} />
                </div>
                {/* end size filter*/}
                {/* start breakfast pets checkbox */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" onChange={handleChange}  checked={breakfast} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" onChange={handleChange}  checked={pets} />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end breakfast checkbox */}

            </form>
        </section>
    )
}

import React from 'react'
import Loadergif from '../images/gif/loading-arrow.gif'

export default function Loader() {
    return (
        <div className="loading">
            <img src={Loadergif} alt="Loader image"/>
        </div>
    )
}

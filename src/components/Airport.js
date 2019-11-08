import React from 'react';

const Airport = (props) =>{

    const goBack = () =>{
        props.history.goBack();
    }

    const airport = props.location.state.airport;
    return (
        <>
                <div className="airport-info">
                    <h1>{airport.airportName} Airport</h1>
                    <p><b>Location</b>: {airport.city.cityName}, {airport.country.countryName}, {airport.region.regionName}</p>
                    <p><b>Timezone</b>: {airport.city.timeZoneName}</p>
                    <button onClick={goBack}>Back to list</button>
                </div>
        </>
    )
}



export default Airport;
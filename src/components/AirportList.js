import React, {useState, useEffect, Suspense} from 'react';
import {Link, Route,Switch} from 'react-router-dom';
import Airport from "./Airport";

const NoOfRows = 250;

const AirportList = (props) =>{

    const [page, setPage] = useState(1);
    const [results, setResults] = useState(props.data.slice(0,NoOfRows).map(i => i));

    const paginateUp = () =>{
        if(!(NoOfRows * (page) > props.data.length)){
            setPage(page + 1);
            let start = NoOfRows * page;
            let end = (NoOfRows * (page + 1) > props.data.length ? props.data.length : results.length * (page + 1));
            console.log(end);
            setResults(props.data.slice(start,end).map(i => i));
        }
    }
    const paginateDown = () =>{
        if(page > 1){
            setPage(page - 1);
            let start = NoOfRows * (page -2);
            let end = NoOfRows  * (page-1);
            setResults(props.data.slice(start,end).map(i => i));
        }
    }
    console.log(props.data);
    return (
        <>
            <Switch>

                <Route exact path="/airport/:id" component={Airport} />

                <Route exact path="/" render={()=>{
                    return(
                        <React.Fragment>
                            <header>
                                <div className="title">
                                    <p><b>Where Qantas Flys</b>  {NoOfRows * (page-1)} - {(NoOfRows * page > props.data.length ? props.data.length : results.length * (page))} of {props.data.length}</p>
                                    <button className="paginate-button" onClick={() => paginateDown()}>
                                        <span>&#x2039;</span>
                                    </button>
                                    <button className="paginate-button" onClick={() => paginateUp()}>
                                        <span>&#x203A;</span>
                                    </button>
                                </div>
                            </header>

                            <div className="container">
                                <div className="list-group">
                                    {results.map((airport,i)=>{
                                        return(
                                            <React.Fragment key={i}>
                                                <Link to={{ pathname:"/airport/" + airport.airportCode, state: {airport, page} }} className="list-group-item list-group-item-action">
                                                    <b> {airport.airportName}</b>
                                                    <br/>
                                                    {airport.country.countryName}
                                                    <span>&#x203A;</span>
                                                </Link>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}/>

            </Switch>
        </>
    )
}



export default AirportList;
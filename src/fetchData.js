export function fetchData() {
    let airportPromise = fetchAirports();
    return {
        airport: wrapPromise(airportPromise),
    };
}

// Dont render until promise is completed
function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

function fetchAirports() {
    console.log("fetch airports...");
    return new Promise(resolve => {
        fetch('https://api.qantas.com/flight/refData/airport').then((resp) => resp.json()).then((data =>{
                resolve(data)}
        )).catch(error => alert("Looks like there is an issue with our services right now. Please check again later. Thanks"));

    });
}

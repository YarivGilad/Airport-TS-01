import log from "@ajar/marker";
import { getFlightsData } from "./api.js";
import { Flight } from "./flight.js";
import { FlightDto } from "./types.js";
import EventEmitter from "events";


export class FlightsTower extends EventEmitter{

     readonly flights: Flight[] = [];
     readonly flightsDestinations: Set<string> = new Set();
     #flightsData: FlightDto[] = [];

     static DATA_READY = "DATA_READY";   

     constructor(){
        super();
        (async ()=> {
            this.#flightsData = await getFlightsData();
            this.emit(FlightsTower.DATA_READY);
        })();
     }

     createFlights(){
        for(let flightData of this.#flightsData) {
            this.flights.push(new Flight(flightData));
            this.flightsDestinations.add(flightData.destination);
        }
        log.magenta('=========================================')
        log.yellow(this.flights.length ,'flights were created')
        log.d('To the following destinations: ',Array.from(this.flightsDestinations));
        log.magenta('=========================================')
     }

     departAllFlights(){
        for(let flight of this.flights) {
            flight.on(Flight.LANDED, this.#logFlightData);
            flight.depart();
        }
     }

     #logFlightData(instance: Flight){
        log.blue(`🛩  Arrived: ${instance.number}`, 
                    ' from: ',instance.origin,
                    ' to ',instance.destination,
                    'on ',instance.arrived)
     }
}
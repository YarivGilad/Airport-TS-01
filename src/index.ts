import log from '@ajar/marker';
import { FlightsTower } from './flight-tower.js';


const tower = new FlightsTower();
// 
//tower.createFlights();
// tower.departAllFlights();
tower.on(FlightsTower.DATA_READY,()=> { 
    tower.createFlights();
    tower.departAllFlights();
})

import { FlightDto } from "./types.js";


export async function getFlightsData(): Promise<FlightDto[]>{
    // 
    //const response = await fetch(process.env.ENDPOINT)
    // const data =  await response.json();
    const data =  await (await fetch(process.env.ENDPOINT)).json();
    return data.flights;
}
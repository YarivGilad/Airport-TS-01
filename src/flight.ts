import { EventEmitter } from "node:events";
import dayjs from 'dayjs';
import type { FlightDto } from "./types.js";

export class Flight extends EventEmitter{

    #number: number | null = null;
    #origin: string | null = null;
    #destination: string | null = null;
    #departed: string | null = null;
    #arrived: string | null = null;

    static DEPARTED = 'DEPARTED';
    static LANDED = 'LANDED';

    constructor({number,origin,destination}: FlightDto){
        super();

        this.#number = number;
        this.#origin = origin;
        this.#destination = destination;
    }

    depart(){
        this.#departed = dayjs().format('DD/MM/YYYY');
        this.emit(Flight.DEPARTED, this);

        const rand = Math.round(1 + Math.random() * 4) * 1000;
        setTimeout(this.#land, rand);
    }
    
    #land = ()=> {
        this.#arrived = dayjs().format('DD/MM/YYYY');
        this.emit(Flight.LANDED, this);
    }

    get number(){return this.#number}
    set number(v){ this.#number = v}
    
    get origin(){return this.#origin}
    set origin(v){ this.#origin = v}

    get destination(){return this.#destination}
    set destination(v){ this.#destination = v}

    get departed(){return this.#departed}
    get arrived(){return this.#arrived}

}
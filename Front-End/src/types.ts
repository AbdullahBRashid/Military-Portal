import { DocumentReference, GeoPoint } from "firebase/firestore";

export interface Missile {
    id: string;
    name: string;
    range: number;
    blastRadius: number;
    launchCost: number;
    productionCost: number;
}

export interface MissileStorage {
    missile: DocumentReference<Missile>;
    quantity: number;
}

export interface Base {
    id: string;
    name: string;
    location: GeoPoint;
    missiles: MissileStorage[];
}
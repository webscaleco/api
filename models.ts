export class Session {
    status: string = 'idle';
    maxID: number = 1; 
    rowers: Rower[] = [];
    distance: number = 150;

    start() {
        this.status = 'active';
    }

    end() {
        this.status = 'idle';
    }

    addRower(rower:Rower) { 
        rower.id = this.maxID++; 
            rower.distance = 0;
        this.rowers.push(rower); 
        return rower; 
    }

}

export class Rower {
    // the id and distance are optional property (requires TS 2.0)
    id?:number; 
    name:string;
    distance?:number;
}
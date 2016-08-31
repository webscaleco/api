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
        this.rowers.push(rower); 
        console.log(rower); 
    }

}

export class Rower {
    // the id and distance are optional property (requires TS 2.0)
    id?:number; 
    name:string;
    distance?:number;
}
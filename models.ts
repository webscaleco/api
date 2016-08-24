export class Session {
    status: string = 'idle';
    maxID: number = 1; 
    rowers: Rower[] = [];

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
    id:number; 
    name:string;
}
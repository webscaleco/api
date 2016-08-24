export class Session {
    status: string = 'idle';
    maxID: number = 0; 
    rowers: Rower[] = [
        { id: 0, name: 'jeremy' }
    ];

    start() {
        this.status = 'active';
    }

    end() {
        this.status = 'idle';
    }

    addRower(rower:Rower) { 
        rower.id 
        this.rowers.push(rower)
    }
}

export class Rower {
    id:number; 
    name:string;
}
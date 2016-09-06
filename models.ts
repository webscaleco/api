export class Session {
    status: string = 'idle';
    maxID: number = 1;
    rowers: Rower[] = [];
    distance: number = 150;

    start() {
        this.status = 'active';
        this.rowers.forEach(r => r.distance = 0);
    }

    end() {
        this.status = 'idle';
    }

    addRower(rower: Rower) {
        // console.log(`adding ${d.name}`);
        if (!this.rowers.some(r => r.name == rower.name)) {
            rower.id = this.maxID++;
            rower.distance = 0;
            this.rowers.push(rower);
            return rower;
        }
        else
            return this.rowers.find(r => r.name == rower.name);
    }

}

export class Rower {
    // the id and distance are optional property (requires TS 2.0)
    id?: number;
    name: string;
    distance?: number;
    speed?: number;
    averageSpeed?: number;
    power?: number;
}
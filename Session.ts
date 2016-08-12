import Rower from './Rower';

class Session {
    status: string = 'idle';
    rowers: Rower[] = [
        { name: 'jeremy' }
    ];

    start() {
        this.status = 'active';
    }

    end() {
        this.status = 'idle';
    }
}

export default new Session();
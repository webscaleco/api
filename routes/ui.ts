import * as express from 'express';
import session from '../session';

let router = express.Router();

router.route('/')
    .get((req, res) => {
        res.end('hi... I\'m the Regatta API.');
    });

export default router;
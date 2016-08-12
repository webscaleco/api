import * as express from 'express';
import * as _ from 'lodash';
import session from './Session';

let router = express.Router();

router.route('/session')
    .get((req, res) => {
        res.json(session);
    });

router.route('/session/start')
    .post((req, res) => {
        session.start();
        res.json(session);
    });

router.route('/session/end')
    .post((req, res) => {
        session.end();
        res.json(session);
    });

router.route('/session/rower/:name')
    .get((req, res) => {
        res.json(_.find(session.rowers, { name: req.params.name }));
    })
    .post((req, res) => {
        let r = { name: req.params.name };
        session.rowers.push(r);
        res.json(r);
    })
    .delete((req, res) => {
        //remove rower
        //req.params.name
    })

export default router;
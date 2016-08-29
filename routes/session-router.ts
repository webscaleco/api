import * as express from 'express';
import * as _ from 'lodash';
import session from '../session';

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
        let r = { id: 0,  name: req.params.name };
        session.addRower(r);
        res.json(r);
    })
    .delete((req, res) => {
        _.remove(session.rowers, { name: req.params.name });
        res.status(200).end();
        
    })

export default router;
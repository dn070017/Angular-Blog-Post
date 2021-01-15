import bcrypt     from 'bcryptjs';
import express    from 'express';
import getJSON    from 'get-json';
import jwt        from 'jsonwebtoken';

import config     from '../config/config.mjs';
import User       from '../models/user.mjs';

const router  = express.Router();

router.post('/login', async function(req, res) {
    
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let user, validate;
    try {
        if (re.test(req.query.username))
            user = await User.findOne({ email: req.query.username });
        else 
            user = await User.findOne({ username: req.query.username });
        if (!user){
            return res.status(401).json({
                message: `Incorrect username or password.`
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `[LOGIN:001] Failed to connect to database.`
        });
    }
    try{
        validate = await new Promise((resolve, reject) => {
            bcrypt.compare(req.query.password, user.password, (err, validate) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(validate);
                }
            })
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: `[LOGIN:002] Failed to encrypt password.`
        });
    }
        
    if (validate){
        user.password = Array(user.password.length + 1).join('*');
        return res.status(200).json({
            token: jwt.sign(user.toJSON(), 
                            config.secret, {
                                algorithm: 'HS256',
                                issuer: 'Missmi Intelligence Backend',
                                expiresIn: config.expiresIn 
                            }),
            user: user.toJSON(),
            expiresIn: config.expiresIn,
            message: `Login successfully, welcome ${user.username}.`
        });
    }
    else
        return res.status(401).json({
            message: `Incorrect username or password.`
        });
});

export default router;
import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import config from '../config/config.mjs';

const auth = {
    encrypt: (user) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, config.salt, (err, res) => {
                if(err) {
                    console.error('\nFailed to encrypt password:', err);
                    reject();
                } 
                user.password = res
                resolve();
            });
    })},
    checkToken: (req, res, next) => {
        let token = req.get('Authorization');
        if(token){
            token = jwt.verify(token, config.secret, function(err, decoded) {
                if (err)
                    return res.status(401).json({ message: `Failed to authenticate, permission denied`});
                else{
                    req.token = decoded;
                    next();
                }
            });
        } else
            return res.status(401).json({ message: `Header does not contain token, permission denied`});
    }
};

export default auth;
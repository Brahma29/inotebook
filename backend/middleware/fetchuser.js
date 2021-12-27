var jwt = require('jsonwebtoken');
const JWT_SECRET = 'kachabadam$656rpkg@';


const fetchuser = (req, res, next)=>{
    //get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Access Denied"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: "System error"})
    }
}

module.exports = fetchuser;
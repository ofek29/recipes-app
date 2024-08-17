const jwt = require('jsonwebtoken');
const jwtKey = 'ofra_secret_salt_key';
const jwtExpiryTimeInMs = 60 * 1000 * 1; // 15 min
const userRepository = require('../DB/userRepository');

// const isSignedIn = async (req, res) => {
//     try {
//         const token = req.cookies.myToken;
//         if (!token) return res.status(401).json({ message: 'Not authorized' });

//         const verifiedToken = jwt.verify(token, jwtKey);
//         if (!verifiedToken) return res.status(403).json({ message: 'Token expired' });

//         res.json({ message: 'User is signed in' });
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }

// }

const registerUser = async (req, res) => {
    try {
        const { userName, email, password, phone } = req.body;
        await userRepository.registerUserSP(userName, email, password, phone);
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};
module.exports.registerUser = registerUser;

const loginUser = async (req, res) => {
    console.log('login func called');

    try {
        const { email, password } = req.body;
        const isSignedIn = await userRepository.loginUserSP(email, password);
        const username = isSignedIn.recordset[0]['username']; // recommended??
        console.log(` login in: +${username}`);

        if (username) {
            const myToken = jwt.sign(
                { username }, jwtKey,
                { algorithm: "HS256", expiresIn: jwtExpiryTimeInMs }
            )
            console.log('sign in - token created', myToken);
            // send login cookie to client
            res.cookie('myToken', myToken, { maxAge: jwtExpiryTimeInMs });
            res.status(200).json({ message: 'User signed in successfully', username: username });

            console.log('user signed in and cookie sent to client');
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports.loginUser = loginUser;

const refresh = (req, res) => {
    console.log('calling refresh token func');
    let myStatusCode = 200;
    const myToken = req.cookies.myToken;

    if (!myToken) {
        console.log('cant find my token');
        myStatusCode = 401;
        return myStatusCode;
    }

    //my token verify 
    let payload;
    try {
        payload = jwt.verify(myToken, jwtKey);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.log('Invalid JsonWebTokenError', error);
            myStatusCode = 401;
            return myStatusCode;
        }
        myStatusCode = 400;
        return myStatusCode; //400
    }
    //if token is valid -> refresh it
    const newToken = jwt.sign(
        { username: payload.username }, jwtKey,
        { algorithm: "HS256", expiresIn: jwtExpiryTimeInMs }
    )
    console.log('new refresh token', newToken, payload.username);
    // res.thePayload = payload;

    // send login cookie to client
    res.cookie('myToken', newToken, { maxAge: jwtExpiryTimeInMs });
    // res.json({ username: payload.username }); //res.status(200).
    // return myStatusCode;


    //chatgpt solution
    // For API requests, return the refreshed username in JSON
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(200).json({ username: payload.username });
    } else {
        // For page requests, don't interfere, just proceed to the next middleware
        return next();
    }
}

module.exports.refresh = refresh;

const { sql, appPool } = require('./connectToDB');


//----- registerUser stored procedure handler --//
const registerUserSP = async (username, email, password, phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await appPool.connect()
            try {
                const result = await pool.request()
                    .input('username', sql.VarChar, username)
                    .input('email', sql.VarChar, email)
                    .input('password', sql.VarChar, password)
                    .input('phone', sql.VarChar, phone)
                    .execute('registerUser')
                resolve(result);
            }
            catch (err) {
                console.error('Error registering user:', err);
                reject(err); // TROW ??
            }
        }
        catch (err) {
            console.error('ERROR CONNECTION TO DB <registerUserSP> :', err);
            reject('ERROR CONNECTION TO DB <registerUserSP> :', err);
        }
    })
};
module.exports.registerUserSP = registerUserSP;


//----- loginUser stored procedure handler --// 
const loginUserSP = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await appPool.connect()
            try {
                const result = await pool.request()
                    .input('email', sql.VarChar, email)
                    .input('password', sql.VarChar, password)
                    .execute('loginUser')
                resolve(result);

            }
            catch (err) {
                console.error('Error logging in user:', err);
                reject(err); // TROW ??
            }
        }
        catch (err) {
            console.error('ERROR CONNECTION TO DB <loginUserSP> :', err);
            reject('ERROR CONNECTION TO DB <loginUserSP> :', err);
        }
    })
};
module.exports.loginUserSP = loginUserSP;



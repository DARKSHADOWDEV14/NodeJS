import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';   

import { PORT, SECRET_JWT_KEY  } from './config.js';

import { userRepository } from './user_repository.js'; 
const app = express();
app.use(express.json());
app.use(cookieParser())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.render('index')
    try {
        const data =jwt.verify(token, SECRET_JWT_KEY)
        res.render('index', data) // , {username: 'Andres Davi'}
    } catch (error) {
        res.render('index')
    }
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    
    try {
        const user = await userRepository.login({username, password})
        const token = jwt.sign( {
            id: user._id, 
            username: user.username}, 
            SECRET_JWT_KEY,
        {
        expiresIn: '1h'
        })
        res.cookie( 'access_token', 
            token, {
            httpOnly: true, //la cookie no se puede acceder en el servidor
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict' ,
            maxAge: 1000 * 60 * 60 // 1 hora
        })
        .send({ user, token })
    } catch (error) {
        res.status(401).send({ error: error.message })  
    }

})

app.post("/register", async (req, res) => {
    const {username, password} = req.body;

    try {
        const id = await userRepository.createUser({username, password})
        res.send({ id })
    } catch (error) {
        // no es buena idea mandar el error al cliente, pero para fines de desarrollo es útil
        res.status(400).send({ error: error.message })
    }
})
app.post("/logout", (req, res) => {
    res.clearCookie('access_token')
    res.send({ message: 'Logged out successfully' })
})
app.post("/protected", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try{
        const data = jwt.verify(token, SECRET_JWT_KEY)
        res.send({ message: 'Protected data', data })
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' })
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
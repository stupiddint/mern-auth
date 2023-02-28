import express from 'express'
import cors from 'cors';
import morgan from 'morgan'
import connect from './database/mongodbConnection.js';
import router from './router/route.js';

const port = process.env.PORT || '8080';

/** middlewares */
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


/** HTTP GET Request */
app.get('/', (req,res)=>{
    res.status(200).json("home GET Request")
})
app.get('/contact', (req,res)=>{
    res.send('this is contact page')
})
/** api routes */
app.use('/api', router);

/** start server only when we have valid connection */
connect().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log(`app running at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(`cannot connect to server ${error}`)
        
    }
}).catch(error => {
    console.log(`Invalid database connection...`)
})

import express from 'express'
import { join } from 'node:path'
import cookieParser from 'cookie-parser'
import { createLogger, format, transports } from 'winston'

/*
const concert_data = {
    "concerts": [
         {
            "concert_id": 1,
            "concert_artist": "A",
            "concert_description": "Concert",
            "concert_price": "65",
            "concert_date": "9/2/2024",
            "concert_time": "11:00pm",
            "concert_image": "a"
         }
    ]
}
*/

const app = express()

const logger = createLogger ({
    level: 'info', 
    format: format.combine (
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(), 
        new transports.File({ filename: 'app-express.log' })
    ]
})

const logAll = function(request, response, next) {
    logger.info ('URL being requested: ${request.url}')
    next()
}

app.use(express.json())
app.use(cookieParser())
app.use(express.static(join(process.cwd(), 'express' )))
app.use(logAll)

app.set('view engine', 'ejs')
app.set('views', './src/public/views')

/*
app.get('/concerts', (request, response) => {
    try {
        responce.staus(200).render('concerts', { concerts: concert_data.concerts})
    } 
    catch (error){
        console.log(error.stack)
        response.status(500).send('Internal server error')
    }
    
})
*/

/*
function findConcertById(concerts, id) {
    for (let i = 0; i < concerts.length; i++) {
        const concert = concerts[i]
        if (concert.concert_id === id) {
            return concert
        }
    }
    return null
}
*/

/*
app.get('/concerts/:concert_id', (request, response) => {
    try {
        const concert_id = parseInt(request.params.concert_id)
        const concert_object = findConcertById(concert_data.concerts, concert_id)

        if(!concert_object) {
            return response.status(404).send('Concert not found')
        }

        response.status(200).render('concert', { concert_info: concert_object})
    
    }
    catch (error) {
        response.staus(500).send('Internal server error')
    }
      
})
*/    

/*
const validateBody = function(request, response, next) {
    try {
        let concert_id = requestbody.concert_id
        let concert_artist = requestbody.concert_artist
        let concert_price = requestbody.concert_price
        let concert_curreny = requestbody.concert_curreny

        if(!concert_id || !concert_artist || !concert_price || !concert_curreny) {
                console.log('Missing required field(s).')
                return response.status(400).send('Missing required field(s)')
        }
    }
        catch (error) {
            return response.staus(500).send('Internal Server Error');
    }
    

    next()
}
*/

/*
app.post("/save_to_cart", validateBody, (request, response) => {
    
        try {
            let concert_id = requestbody.concert_id
            let concert_artist = requestbody.concert_artist
            let concert_price = requestbody.concert_price
            let concert_curreny = requestbody.concert_curreny

            let cart 
            if (request.cookies.cart === undefined) {
                cart = []
            } 
            else {
                cart = JSON.parse(request.cookies.cart)
            }
            cart.push({ concert_id, concert_artist, concert_price, concert_curreny })

            response.cookie("cart", JSON.stringify(cart))
            response.status(200).json({ concert_id, concert_artist, concert_price, concert_curreny})
        }
        catch (error) {
            return response.status(500).send('Internal Server Error');
        }
        
    
})
*/

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('Something went wrong!');
});

app.listen(3000)
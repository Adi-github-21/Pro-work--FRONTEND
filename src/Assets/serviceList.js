import { FRONTEND_URL } from '../func.jsx'

import Service_Beautician from './Service Page/Service_Beautician.jpg'
import Service_Electrician from './Service Page/Service_Electrician.jpg'
import Service_Priest from './Service Page/Service_Priest.jpg'
import Service_Cook from './Service Page/Service_Cook.jpg'
import Service_Plumber from './Service Page/Service_Plumber.jpg'
import Service_Tutor from './Service Page/Service_Tutor.jpg'
import Service_Painter from './Service Page/Service_Painter.jpeg'
import Service_Carpenter from './Service Page/Service_Carpenter.jpg'

export const service_List = [
    {
        Category: 'Beautician',
        image: Service_Beautician,
        CategoryDescription: 'A skilled beautician dedicated to enhancing your natural beauty with personalized skincare, hair, and makeup services.',
        URL: FRONTEND_URL+'/services/beautician',
        TotalWorkers: " Beautician",
    },
    {
        Category: 'Carpenter',
        image: Service_Carpenter,
        CategoryDescription: 'A skilled carpenter crafting custom woodwork with precision, offering quality furniture, repairs, and home improvement solutions.',
        URL: FRONTEND_URL+'/services/carpenter',
        TotalWorkers: " Carpenter",
    },
    {
        Category: 'Electrician',
        image: Service_Electrician,
        CategoryDescription: 'A reliable electrician providing expert electrical services, from installations to repairs, ensuring safety and efficiency in every project.',
        URL: FRONTEND_URL+'/services/electrician',
        TotalWorkers: " Electrician",
    },
    
    {
        Category: 'Househelp',
        image: Service_Cook,
        CategoryDescription: 'A dependable househelper offering efficient cleaning, organizing, and household assistance, ensuring a tidy and comfortable home environment.',
        URL: FRONTEND_URL+'/services/househelp',
        TotalWorkers: " Househelp",
    },
    {
        Category: 'Painter',
        image: Service_Painter,
        CategoryDescription: 'A professional house painter delivering high-quality, precise painting services, transforming spaces with vibrant colors and flawless finishes.',
        URL: FRONTEND_URL+'/services/painter',
        TotalWorkers: " Painter",
    },
    {
        Category: 'Plumber',
        image: Service_Plumber,
        CategoryDescription: 'A skilled plumber offering reliable plumbing services, from repairs to installations, ensuring efficient and durable solutions for your home.',
        URL: FRONTEND_URL+'/services/plumber',
        TotalWorkers: " Plumber",
    },
    {
        Category: 'Priest',
        image: Service_Priest,
        CategoryDescription: 'A compassionate priest offering spiritual guidance, leading meaningful services, and providing support for personal growth and faith journeys.',
        URL: FRONTEND_URL+'/services/priest',
        TotalWorkers: " Priest",
    },
    {
        Category: 'Tutor',
        image: Service_Tutor,
        CategoryDescription: 'A dedicated tutor offering personalized lessons, helping students excel academically with tailored support in various subjects and skills.',
        URL: FRONTEND_URL+'/services/tutor',
        TotalWorkers: " Tutor",
    },
   
]
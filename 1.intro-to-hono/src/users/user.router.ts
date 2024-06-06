

import { Hono } from "hono";

export const userRouter = new Hono();

const users=[

    {
        id:1,
        name:'John Doe',
        email:"john@gmail.com"
    },
    {
        id:2,
        name:'Jane Doe',
        email:"jane@gmail.com"
    
    }
    
]

userRouter.get('/users',(c)=>{
    return c.json({users:[],200})
})
const Express = require('express')
const CORS = require('cors')
const {PrismaClient} = require('@prisma/client')
const app = Express()
const ps = new PrismaClient();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

app.use(CORS())
app.use(Express.json())
app.get('/',(req,res) => {
    res.send("Hi! this is the server here")
})

app.post('/register',async (req,res) => {
    const data = req.body;
    if(!data.name || !data.password){
        return res.status(400).json({"error" : "Request Doesn't have username of passowrd"})
    }
    try{
        const hashedPassword = await bcrypt.hash(data.password,10)
        const user = await ps.user.create({
            data : {
                name : data.name,
                password : hashedPassword
            }
        })
        return res.status(200).json({"message" : `Successfully registered user : ${user?.name}`})
    }catch(err){
        console.error("Failed to register the user" + String(err));
        return res.status(400).json({"error" : "Failed to register the user"})
    } 
})

const JWT_SECRET = '23789hno2f8903'

app.post('/login',async (req,res) => {
    const data = req.body;

    const user = await ps.user.findFirst({
        where : {
            name : data.name
        }
    })
    if(!user) return res.status(400).json({"error" : "User not found!"})

    const isMatch = await bcrypt.compare(data.password,user.password)
    if(!isMatch) return res.status(400).json({"message" : "Password is incorrect!"})

    const token = jwt.sign({userId: user.id,name : user.name},JWT_SECRET,{expiresIn : '1h'});

    res.json({ token });
    })

const authenticateToken = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if(!token) return res.status(400).json({"error" : "Missing jwt token in your request"})

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if (err) return res.status(403).json({message : "Invalid Token"})
        req.user = user;
        next()
    })
}


app.post('/task',authenticateToken,async (req,res) => {
    const data = req.body;
    if(!data.title || !data.content || !data.pendingOn) return res.status(400).json({error : "Required data missing in the requrest" + String(err)})
    
    if(!req?.user?.userId) return res.status(400).json({
        error : "Not a valid user found"
    })

    try{
        const task = await ps.task.create({
            data : {
                userId : req.user.userId,
                title : data.title,
                content : data.content,
                pendingOn : data.pendingOn,
                weekDays : data.weekDays
            }
        })

        

        res.status(200).json({message : `Successfully crated task id : ${task.id} for ${task.pendingOn.toISOString()}`})
    }
    catch(err){
        console.error("Failed to create this task" + String(err))
        res.status(400).json({error : "Failed to create this task"})
    }
})


app.get('/tasks',authenticateToken,async (req,res) => {
    if(!req?.user?.userId) return res.status(400).json({
        error : "Not a valid user found"
    })

    const tasks = await ps.task.findMany({
        where : {
            userId : req.user.userId
        }
    })

    if(!tasks) return res.status(400).json({
        error : "No tasks avaialble for this user"
    })

    return res.status(200).json(tasks)
})

app.delete('/task/:id',authenticateToken,async (req,res)=>{
    const task_id = req.params.id
    try{
        await ps.task.delete({
            where:{
                userId : req.user.userId,
                id : parseInt(task_id)
            }
        })
        return res.status(200).json({
            'message' : "Task successfully deleated!"
        })
    }
    catch(err){
        console.error("Can't delete task" + String(err.message))
        return res.status(400).json({
            error : "Can't delete task"
        })
    }
    
})
app.get('/task/:id',authenticateToken,async (req,res)=>{
    const task_id = req.params.id
    try{
       const task = await ps.task.findFirst({
        where : {
            userId : req.user.userId,
            id : parseInt(task_id)
        }
       })
       if (!task) {
        return res.status(404).json({ error: "Task not found" });
        }
       return res.status(200).json(task)
    }
    catch(err){
        console.error("Can't get the task" + String(err.message))
        return res.status(400).json({
            error : "Can't get the task"
        })
    }
    
})

app.put('/task/:id',authenticateToken,async(req,res)=>{
    const task_id = req.params.id
    const data = req.body

    try{
        const task = await ps.task.update({
            where : {
                userId : req.user.userId,
                id : parseInt(task_id)
            },
            data : {
                title : data.title,
                content : data.content,
                pendingOn : data.pendingOn
            }
        })
        return res.status(200).json({
            message : `Successfully updated task with id : ${task.id}`
        })
    }
    catch(err){
        console.error("Failed to update the task" + String(err))
        return res.status(400).json({
            error : "Failed to update the task"
        })
    }
})

app.listen(3000,()=>{
    console.log("The server is started on http://localhost:3000")
})


const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app  = express()
const PORT=8000

// Middleware 
app.use(express.urlencoded({extended:false}))



// for json data task 1
app.get('/api/user',(req,res)=>{
    return res.json(users)
})

// task 2 (dynamic path parameter) GET /api/user/:id
app.get('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
});

// task 3
app.post('/api/user', (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ status: "error", message: "Failed to write file" });
        }
        return res.send({ status: "success", id: newUser.id });
    });
});


// task 4
app.patch('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // Find the user by ID
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).send({ status: 'error', message: 'User not found' });
    }

    // Update the user's data
    Object.assign(user, body);

    // Write the updated users array to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ status: 'error', message: 'Failed to write file' });
        }
        return res.send({ status: 'success', id: user.id });
    });
});


// task 5
app.delete('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);

    // Find the user index by ID
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).send({ status: 'error', message: 'User not found' });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Write the updated users array to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ status: 'error', message: 'Failed to delete user' });
        }
        return res.send({ status: 'success', message: 'User deleted', id: id });
    });
});

app.listen(PORT,()=>console.log(`Server started at port: ${ PORT}`))


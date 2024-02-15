const express = require('express');
const app =express();
const port= process.env.PUBLIC_PORT;

app.get('/ping', (req, res)=>{
    res.send('pong');
});

if(require.main==module){
    app.listen(port, ()=>{
        console.log("Hello, let's read some books");
    });
}
module.exports=app;
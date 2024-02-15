const express = require('express');
const app =express();
const port= 3001;

app.get('/ping', (req, res)=>{
    res.send('pong');
});

if(require.main==module){
    app.listen(port, ()=>{
        console.log("Hello, let's read some books");
    });
}
module.exports=app;
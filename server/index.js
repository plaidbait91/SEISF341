const express = require('express');
const app = express();

app.get('/',(req,res)=>{
	res.status(200).json({api:'version 1'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server started on port',PORT));

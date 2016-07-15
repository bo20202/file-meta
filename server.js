const express = require('express')
const app = express()
const fs = require("fs")
var multer = require("multer")
var upload = multer({ dest: 'uploads/', inMemory: true })

app.use(express.static(__dirname + '/client'));
app.set('view engine', 'html')

app.get('/', (req, res)=>{
  res.render('./client/index')
})

app.post('/size', upload.single('file'), (req, res)=>{
  if(req.file){
  var size = {size: req.file.size}
  fs.unlink(req.file.path, ()=>
  {
    res.json(size)
  })
  }
  else{
    res.send("No file")
  }
})
app.listen(process.env.PORT, ()=>{
  console.log(`Listening on ${process.env.PORT}`);
})
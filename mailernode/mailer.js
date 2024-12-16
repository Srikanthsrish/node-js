const express=require('express');
const app=express();
const nodemailer=require('nodemailer')
const port=3004;
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'srishbontha83@gmail.com',
      pass: 'einn ibzd imft qbmd'
    }
  });
  
  
app.get('/',(req,res)=>{
    var mailOptions = {
        from: 'srishbontha83@gmail.com',
        to: 'yechurisumanth45@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.send("welcome to home page")
});

app.listen(port,()=>{
    console.log("server has been started"+"http://localhost:"+port)
})
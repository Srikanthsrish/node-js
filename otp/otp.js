otp=function otp(n){
    res=""
    for(i=1;i<=n;i++){
      let y  =Math.floor(Math.random(i)*10)
      res=res+y;
    }
    return res;
}
module.exports=otp
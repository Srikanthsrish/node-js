fetch("http://localhost:3000/users")
.then(response=>{
    if(!response.ok){
        console.log(response.statusText)
    }
    return response.json();
})
.then(data=>{
    localStorage.setItem("userdata",JSON.stringify(data))
    console.log("stored data in local storage ",data)
    getuserdatafromlocalstorage();
})
.catch(error=>{
    console.error("error  fetching data",error)
})
function getuserdatafromlocalstorage() {
    const storedData=localStorage.getItem("userdata");
    if(storedData){
    const parsedData=JSON.parse(storedData)
    console.log(parsedData)
    parsedData.forEach((ele)=>{
        console.log(ele.username)
    
    })}
    else{
       console.log ("not data found in ,local storage")
    }
}

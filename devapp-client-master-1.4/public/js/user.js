function GetUser(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: "/api/user",
            method: "GET",
            dataType: "json"
        })
        .done((json)=>{
            resolve(json.id);
        }).fail(()=>{
            reject("에러");
        })
    })
}

function setUser(log){
    var body = document.getElementById("user-body");
    var element = document.createElement("div");
    element.append(log);
    body.append(element);
}

async function ab(){
    try{
       var a =  await GetUser();
       setUser(a);
    }catch(error){
        setUser(error);
    }
}
ab();
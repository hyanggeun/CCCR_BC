
    var submit = document.getElementById("smt");
    submit.addEventListener('click',(evt)=>{
        evt.preventDefault();
        evt.stopPropagation();
        var name = document.querySelector('.user').textContent.toLowerCase();
        var id = document.getElementById('name').value;
        var address = document.getElementById('address').value;
        var price = document.getElementById('price').value;
        console.log(id);
        console.log(address);
        console.log(name);
        var date = new Date()
        console.log(date);
        fetch('/api/house',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Id: id, Address: address, OwnerId: name, Price: price,Timestamp: date})
        })
        .then((result)=>{
            if(result.status==200){
                // console.log("Success Register");
                 alert("집 등록 성공");
            }else{
                 alert("등록에러");
                 setName();
            }
        })
    })

function setName(){
return fetch('/api/user').then((evt)=>{
    evt.json().then((name)=>{
        console.log(name);
        return name;
    }).then((selected)=>{
        var selected_name_user = document.querySelector('.user');
        console.log(selected_name_user.textContent);
        if(selected_name_user.textContent==""){
            selected_name_user.append(selected);
        }
    })
})
}
window.onload = async function(){
    setName();
}
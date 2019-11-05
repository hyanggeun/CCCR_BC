function getList(){
    return fetch('/api/house')
    .then((result)=>result.json())
}

function setList(parsed_json){
    parsed_json = JSON.parse(parsed_json);
    var len = parsed_json.length;
    let list_body = document.querySelector(".list-body");
    console.log(list_body);
    for(var i=0;i<len;i++){
        var div_class = document.createElement("div");
        div_class.className = "panel-"+i;
        var div_info = document.createElement("div");
        div_info.className="info";
        var p_id = document.createElement("p");
        p_id.className="id";
        p_id.append("아파트");
        div_info.append(p_id);
        var p_place = document.createElement("p");
        p_place.className="place";
        p_place.append(parsed_json[i].Id);
        div_info.append(p_place);
        var p_address = document.createElement("p");
        p_address.className="address";
        p_address.append(parsed_json[i].Address);
        div_info.append(p_address);
    
        var div_price = document.createElement("div");
        div_price.className="info-2";
            var price_div = document.createElement("div");
            price_div.className = "pp";
            var p_price = document.createElement("p");
            p_price.className="price";
            p_price.append(parsed_json[i].Price);
            price_div.append(p_price);
            div_price.append(price_div);
        var btn_smt = document.createElement("input");
        btn_smt.type = "button";
        btn_smt.value = "거래";
        div_price.append(btn_smt);
    div_class.append(div_info);
    div_class.append(div_price);           
    list_body.append(div_class);
    }
    //     var _div_address = document.createElement("div");
    //    // _div_address.id="Address";
    //     _div_address.append(parsed_json[0]);
   
    // container.append(_div_address);
}
function setName(){
    fetch('/api/user').then((evt)=>{
        evt.json().then((name)=>{
            console.log(name);
            document.querySelector('.user').append(name);
        })
    })
}
async function list(){
    try{
       var a =  await getList();
      setList(a['result']);
      setName();
    }catch(error){
        console.log(error);
    }
}

window.onload = async function(){
   await list();
}
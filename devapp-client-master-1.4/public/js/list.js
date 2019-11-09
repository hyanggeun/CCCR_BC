function getList(id){
    return fetch('/api/houses/'+id)
    .then((result)=>result.json())
}

function setList(parsed_json){
    var len = parsed_json.length;
    let list_body_del = document.querySelectorAll(".list-body>.transferPage");
    let list_body = document.querySelector(".list-body");
    for(var i=0;i<list_body_del.length;i++){
        list_body_del[i].remove();
    }
    let list_transfer = document.createElement('div');
    list_transfer.className="transferPage";
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
    div_class.append(div_info);
    div_class.append(div_price);   
    list_transfer.append(div_class);    
    list_body.append(list_transfer);
    }
}

function setName(){
    fetch('/api/user').then((evt)=>{
        evt.json().then((name)=>{
            return name;
        }).then((selected)=>{
            var selected_name_user = document.querySelector('.user');
            if(selected_name_user.textContent==""){
                selected_name_user.append(selected);
            }
        })
    })
}

function setPage(parsed_json){
    var del_pages = document.querySelectorAll(".list-body>.pagination-container");
    for( var i=0;i<del_pages.length;i++){
        del_pages[i].remove();
    }
    //1. 페이지 만들기
    //2. section에따라 좌우이동 display결정
    var pagination_container_div = document.createElement('div');
    pagination_container_div.className="pagination-container";
    var pagination_ul = document.createElement('ul');
    pagination_ul.className="pagination";
    if(parsed_json['is_first_page']!==true){
        var prev_a = document.createElement("a");
        prev_a.className = "page-link";
        prev_a.id = "prev";
        var prev_num = parseInt(parsed_json['page_num'],10)-parseInt(1,10);
        prev_a.href="javascript:list("+prev_num+")";
        prev_a.append("이전");
        var prev_li= document.createElement('li');
        prev_li.className="page-item";
        prev_li.append(prev_a);
        pagination_ul.append(prev_li);
    }
    var section_num = parsed_json['section_num'];
    var start_page = 5*(section_num-1)+1;
    for(var i=start_page;i<start_page+5;i++){
        if(i<=parsed_json['total_page']){
            var page_a = document.createElement('a');
            page_a.className = "page-link";
            page_a.href="javascript:list("+i+")";
            page_a.id = "page-"+i;
            page_a.append(i);
            var page_li= document.createElement('li');
            page_li.className="page-item";
            page_li.append(page_a);
            pagination_ul.append(page_li);
        }
    }
    if(parsed_json['is_last_page']!==true){
        var next_a = document.createElement('a');
        next_a.className = "page-link";
        next_a.id = "next";
        var next_num = parseInt(parsed_json['page_num'],10)+parseInt(1,10);
        next_a.href="javascript:list("+next_num+")";
        next_a.append("다음");
        var next_li= document.createElement('li');
        next_li.className="page-item";
        next_li.append(next_a);
        pagination_ul.append(next_li);
    }
    pagination_container_div.append(pagination_ul);
    var listbody_div = document.querySelector('.list-body');
    listbody_div.append(pagination_container_div);

    var _section_num = parsed_json['section_num'];
    var _start_page = 5*(_section_num-1)+1;
    var pages = document.querySelectorAll(".page-item>a");
}

async function list(id){
    try{
       var a =  await getList(id);
      setList(a['result']);
      setName();
      setPage(a);
      
    }catch(error){
        console.log(error);
    }
}

window.onload = async function(){
   await list(1);
}



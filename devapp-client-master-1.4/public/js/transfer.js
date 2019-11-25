function getList(id){
    return fetch('/api/house/'+id)
    .then((result)=>result.json())
}

function setList(parsed_json){
    var len = parsed_json.length;
    let list_body = document.querySelector(".list-body");
    let transferPage = document.querySelector(".transferPage");
    console.log(list_body);
    let list_body_children = document.querySelectorAll(".transferPage>div");
    for(var i=0;i<list_body_children.length;i++){
        list_body_children[i].remove();
    }
    console.log(list_body_children);
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
            var price_name = parsed_json[i].Price;
            var price_sum="";
            if(price_name.length%3==0){
                price_sum+=price_name.slice(0,3);
                for(let i=price_name.length-3;i>=6;i-=3){
                    price_sum+=","+price_name.slice(i-3,i);
                }
                price_sum+=","+price_name.slice(price_name.length-3);
            }else if(price_name.length%3==1){
                price_sum+=price_name.slice(0,2);
                for(let i=1;i<price_name.length-3;i+=3){
                    price_sum+=","+price_name.slice(i,i+3);
                }
                price_sum+=","+price_name.slice(price_name.length-3);
            }else if(price_name.length%3==2){
                price_sum+=price_name.slice(0,2);
                for(let i=2;i<price_name.length-3;i+=3){
                    price_sum+=","+price_name.slice(i,i+3);
                }
                price_sum+=","+price_name.slice(price_name.length-3);
            }
            price_div.append(price_sum);
            price_div.append(p_price);
    
            div_price.append(price_div);
    
            var btn_smt = document.createElement("input");
            btn_smt.className="myBtn";
            btn_smt.type = "button";
            btn_smt.value = "거래";
            div_price.append(btn_smt);
            div_class.append(div_info);
            div_class.append(div_price);           
            transferPage.append(div_class);
        }
    
}

function setName(){
    fetch('/api/user').then((evt)=>{
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

function setPage(parsed_json){
    var del_pages = document.querySelectorAll(".pagination>li");
    for( var i=0;i<del_pages.length;i++){
        del_pages[i].remove();
    }
   // console.log(parsed_json);
    //1. 페이지 만들기
    //2. section에따라 좌우이동 display결정
    var pagination_container_div = document.querySelector('.pagination-container');
   //console.log(pagination_container_div);
    var pagination_ul = document.querySelector('.pagination');
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
            if(i===parsed_json['page_num']){
                page_a.style.color ="red";
            }
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
}

async function list(id){
    // window.location.reload();
    try{
      var a =  await getList(id);
      setList(a['result']);
      setPage(a);
      setName();
    }catch(error){
        console.log(error);
    }
}


async function startModal(){
    // Get the modal
    var modal = document.getElementById('myModal');
    var mobileMenu = document.querySelector('.menuModal');
        
    // Get the button that opens the modal
    var btn = document.querySelectorAll(".myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];                                          

    // When the user clicks on the button, open the modal 
    for(var i=0;i<btn.length;i++){
        btn[i].onclick = function() {
            var addr = this.parentNode.previousSibling.childNodes[1].textContent;
            var add_input = document.getElementById('select-addr');
            add_input.value=addr;
            modal.style.display = "block";
            
        }
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = async function() {
        modal.style.display = "none";
      
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = async function(event) {
        if (event.target == modal || event.target == mobileMenu) {
            modal.style.display = "none";
            mobileMenu.style.display = "none";
          
        }
    }
}    

async function transfer_list(){
    let submit = document.querySelector('.search');
    submit.addEventListener('click',(evt)=>{
    evt.preventDefault();
    fetch('/api/users')
    .then((resp)=>{
        resp.json()
        .then((res)=>{
            var names = res;
            let chk = false;
            var user_name = document.querySelector('.user').textContent;
            var selected_name = document.querySelector('.modal-input').value;
            var del_user = document.querySelector('.transferUser');
            if(del_user!==null){
                del_user.remove();
            }
            for(var i=0;i<names.length;i++){
            //    console.log(typeof user_name.toLowerCase());
                if(names[i].result != user_name.toLowerCase()){
                    //  console.log( names[i].result);
                    console.log(selected_name);
                    if(names[i].result===selected_name){
                        var  user_p = document.createElement("p");
                        user_p.id = "transferUserName";
                        user_p.append(names[i].result);
                        var transfer_user = document.createElement("li");
                        transfer_user.className = "transferUser";
                        transfer_user.append(user_p);
                        chk=true;
                    }
                }else{
                    //동일한 이름 오류처리
                }
            }
            if(chk==true){
                var transfer_list = document.querySelector('.transferlist');
                var transfer_ul = document.createElement("ul");
                transfer_ul.append(transfer_user);
                transfer_list.append(transfer_ul);
            }
        })
    }).then(async()=>{
        var select_user_li = document.querySelector('.transferlist');
        console.log(select_user_li);
        select_user_li.addEventListener('click',(evt)=>{
            let house = document.getElementById('select-addr').value;
            let name = document.getElementById('transferUserName').textContent;
            let price = document.getElementById('transferPrice').value;
            fetch('/api/user/house',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({Id: house, OwnerId: name,Price: price,Timestamp:new Date()})
            }).then((result)=>{
                if(result.status==200){
                    let modal = document.querySelector('.modal');
                    modal.style.display="none";
                    console.log("success");
                }else{
                    alert("전송 에러");
                }
            }).then(async ()=>{
                await list(1);
                setName();
                startModal();
            })
        })
    })
})
}

window.onload =  async function()
{
    await list(1);
    await startModal();
    await transfer_list();
    
};


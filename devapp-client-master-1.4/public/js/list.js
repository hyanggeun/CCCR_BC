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
        p_id.append(parsed_json[i].OwnerId);
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
            console.log(price_sum);
            p_price.append(price_sum);
            price_div.append(p_price);
            div_price.append(price_div);
        var image = document.createElement("i");
        image.className="fas fa-city";
        div_class.append(image);
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
            if(i===parsed_json['page_num']){
                page_a.style.color ="red";
            }
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
    
   var cols = document.querySelectorAll('.place');
   [].forEach.call(cols,function(col){ col.addEventListener("click",txModal,false); });
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

async function txModal(){
    const houseId = this.innerText;
    
    console.log(houseId);
    const response = await fetch('/api/txList?houseId='+houseId)
    const result = await response.json()
    console.log(result)
    let t = result[0].Timestamp;
    let year=t.substring(0,4);
    let month=t.substring(5,7);
    let date=t.substring(8,10);
    let hour = t.substring(11,13);
    let minute = t.substring(14,16);
    let sec = t.substring(17,19);
    const txContent = document.getElementById('txContent')
    let contents = `<div class="regiHead">
    <h2>등기사항전부인증서 (현재 유효 사항)   &nbsp;&nbsp;  건물</h2>
    <div class="barcode"></div>
</div>

<div class="modalWrap">
<div class="pyoje">
    <h3>[건물]${result[0].Address}</h3>
    <div class="unique">고유 번호 1234-4321-567890</div>
</div>
<div class="pyojebu">
    <table>
        <tr >
            <th class="pyojeTitle" colspan="5">
                <pre>【  표    제     부  】       </pre><pre>(건물의 표시)</pre>
            </th>
        </tr>
        <tr>
            <th class="regiNum">표시번호</th>
            <th class="Receipt">접수</th>
            <th class="addressNBuildNum">소재지번 및 건물번호</th>
            <th class="buildingList">건물 내역</th>
            <th class="buildEtc">등기원인 및 기타사항</th>
        </tr>
        <tr>
                <td class="pjNum"><div>1</div></td>
                <td class="PjDate"><div>${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분</div></td>
                <td class="pjAddress"><div>${result[0].Address}</div></td>
                <td class="pjBuildingInfo"><div>${result[0].Id}</div></td>
                <td class="pjEtc"><div></div></td>
            </tr>
            <tr>
            <td class="pjNum"><div></div></td>
            <td class="PjDate"><div></div></td>
            <td class="pjAddress"><div></div></td>
            <td class="pjBuildingInfo"><div></div></td>
            <td class="pjEtc"><div></div></td>
        </tr>
    </table>
</div><div class="gapgu">
<table>
    <tr>
        <th class="pyojeTitle" colspan="5">
            <pre>  【  갑       구  】       </pre> <pre>(소유권에 관한 사항)</pre>
        </th>
    </tr>
    <tr>
        <th class="ownNum">순위번호</th>
        <th class="regiPurpose">등기목적</th>
        <th class="Receipt">접수</th>
        <th class="regiReason">등기원인</th>
        <th class="ownEtc">권리자 및 기타사항</th>
    </tr>`
    for (let i=result.length-1;i>=0;i--){
        const val = result[i]
        let t = val.Timestamp;
        let year=t.substring(0,4);
        let month=t.substring(5,7);
        let date=t.substring(8,10);
        let hour = t.substring(11,13);
        let minute = t.substring(14,16);
        let sec = t.substring(17,19);
        if(i == result[i].length-1){
        let price_sum2="";
        let price_name = val.Price;
        if(price_name.length%3==0){
            price_sum2+=price_name.slice(0,3);
            for(let i=price_name.length-3;i>=6;i-=3){
                price_sum2+=","+price_name.slice(i-3,i);
            }
            price_sum2+=","+price_name.slice(price_name.length-3);
        }else if(price_name.length%3==1){
            price_sum2+=price_name.slice(0,2);
            for(let i=1;i<price_name.length-3;i+=3){
                price_sum2+=","+price_name.slice(i,i+3);
            }
            price_sum2+=","+price_name.slice(price_name.length-3);
        }else if(price_name.length%3==2){
            price_sum2+=price_name.slice(0,2);
            for(let i=2;i<price_name.length-3;i+=3){
                price_sum2+=","+price_name.slice(i,i+3);
            }
            price_sum2+=","+price_name.slice(price_name.length-3);
        }
        val.Price=price_sum2
        txContent.innerHTML +=`<div class="firstOwner">Owner: ${val.OwnerId}<br> Price: ${val.Price} <br>Time: ${t.getFullYear()}년${t.getMonth()}월${t.getDate()}일 ${t.getHours()}:${t.getMinutes()}분  ◁  </div>`
    }else{
        let price_sum3="";
        let price_name = val.Price;
        if(price_name.length%3==0){
            price_sum3+=price_name.slice(0,3);
            for(let i=price_name.length-3;i>=6;i-=3){
                price_sum3+=","+price_name.slice(i-3,i);
            }
            price_sum3+=","+price_name.slice(price_name.length-3);
        }else if(price_name.length%3==1){
            price_sum3+=price_name.slice(0,2);
            for(let i=1;i<price_name.length-3;i+=3){
                price_sum3+=","+price_name.slice(i,i+3);
            }
            price_sum3+=","+price_name.slice(price_name.length-3);
        }else if(price_name.length%3==2){
            price_sum3+=price_name.slice(0,2);
            for(let i=2;i<price_name.length-3;i+=3){
                price_sum3+=","+price_name.slice(i,i+3);
            }
            price_sum3+=","+price_name.slice(price_name.length-3);
        }
    
        val.Price = price_sum3;
    }
    let owner_ko="";
    if(val.OwnerId==="hyanggeun"){
        owner_ko="송향근";
    }
    if(val.OwnerId==="seungjung"){
        owner_ko="이승정";
    }
    if(val.OwnerId==="hyunwoo"){
        owner_ko="황현우";
    }
    if(val.OwnerId==="byungwoon"){
        owner_ko="이병운";
    }

        contents += `<tr>
                <td class="num"><div>${result.length-i}</div></td>
                <td class="purpose${result.length-i}"><div></div></td>
                <td class="date"><div>${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분</div></td>
                <td class="reason${result.length-i}"><div></div></td>
                <td class="etc"><div>
                    <p>소유자 &nbsp;  ${owner_ko}</p>
                    <p>${val.Address}</p>
                    <p>거래 가격 &nbsp; ${val.Price}</p>
                                </div></td>
            </tr>`
    }
    contents += `</table></div></div>`
    txContent.innerHTML = contents
        // const val = result[i]
        // console.log(val);
        // let t = val.Timestamp;
        // console.log(typeof t)
        // // console.log( `${t.getFullYear()}년 ${t.getMonth()+1}월 ${t.getDate()}일 ${t.getHours()}시 ${t.getMinutes()}분`)

        // let year=t.substring(0,4);
        // let month=t.substring(5,7);
        // let date=t.substring(8,10);
        // let hour = t.substring(11,13);
        // let minute = t.substring(14,16);
        // let sec = t.substring(17,19);
        // t = new Date(year,month,date,hour,minute,sec);
        // console.log(t)
        // if(i == result.length-1){
        //     let price_sum2="";
        //     let price_name = val.Price;
        //     if(price_name.length%3==0){
        //         price_sum2+=price_name.slice(0,3);
        //         for(let i=price_name.length-3;i>=6;i-=3){
        //             price_sum2+=","+price_name.slice(i-3,i);
        //         }
        //         price_sum2+=","+price_name.slice(price_name.length-3);
        //     }else if(price_name.length%3==1){
        //         price_sum2+=price_name.slice(0,2);
        //         for(let i=1;i<price_name.length-3;i+=3){
        //             price_sum2+=","+price_name.slice(i,i+3);
        //         }
        //         price_sum2+=","+price_name.slice(price_name.length-3);
        //     }else if(price_name.length%3==2){
        //         price_sum2+=price_name.slice(0,2);
        //         for(let i=2;i<price_name.length-3;i+=3){
        //             price_sum2+=","+price_name.slice(i,i+3);
        //         }
        //         price_sum2+=","+price_name.slice(price_name.length-3);
        //     }
        //     val.Price=price_sum2
        //     txContent.innerHTML +=`<div class="firstOwner">Owner: ${val.OwnerId}<br> Price: ${val.Price} <br>Time: ${t.getFullYear()}년${t.getMonth()}월${t.getDate()}일 ${t.getHours()}:${t.getMinutes()}분  ◁  </div>`
        // }else{
        //     let price_sum3="";
        //     let price_name = val.Price;
        //     if(price_name.length%3==0){
        //         price_sum3+=price_name.slice(0,3);
        //         for(let i=price_name.length-3;i>=6;i-=3){
        //             price_sum3+=","+price_name.slice(i-3,i);
        //         }
        //         price_sum3+=","+price_name.slice(price_name.length-3);
        //     }else if(price_name.length%3==1){
        //         price_sum3+=price_name.slice(0,2);
        //         for(let i=1;i<price_name.length-3;i+=3){
        //             price_sum3+=","+price_name.slice(i,i+3);
        //         }
        //         price_sum3+=","+price_name.slice(price_name.length-3);
        //     }else if(price_name.length%3==2){
        //         price_sum3+=price_name.slice(0,2);
        //         for(let i=2;i<price_name.length-3;i+=3){
        //             price_sum3+=","+price_name.slice(i,i+3);
        //         }
        //         price_sum3+=","+price_name.slice(price_name.length-3);
        //     }
        //     val.Price = price_sum3;
        //     txContent.innerHTML +=`<div class="nowOwner">Owner: ${val.OwnerId}<br> Price: ${val.Price} <br> Time: ${t.getFullYear()}년${t.getMonth()}월${t.getDate()}일 ${t.getHours()}:${t.getMinutes()}분 </div>`
    //     }
    // }

    document.getElementById('txModal').style.display='flex'
}

window.onload = async function(){
   await list(1);
    var cols = this.document.querySelectorAll('.place');
    [].forEach.call(cols,function(col){ col.addEventListener("click",txModal,false); });
}

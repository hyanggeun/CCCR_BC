async function start(){
    const response = await fetch('/api/blocks');
    const myJson = await response.json();
    let content = ""; 
    myJson.forEach(element => {
        let id = element.id
        let fingerPrint = element.fingerprint
        let tx = element.transactionList
        let data = "["
        tx.forEach(element => {
            data += element + ",";
        })
        data = data.substr(0, data.length -1);
        data += "]";
        if(data[1]==="{"){
            data = JSON.parse(data)
        }
        content += `<div class="card" >
                        <div class="card-body">
                            <h6><span>\#${id}</span></h6>
                            <p>fingerprint: ${fingerPrint}</p>
                        </div>`
        if(typeof(data)=="object"){
            data.forEach(element=>{
                content +=`<ul><b>ID:</b>${element.Id} <b>Owner:</b>${element.OwnerId} <b>Price:</b>${element.Price}</ul>`
            })
        }
        content += `</div>`
    });
    document.getElementById('card-container').innerHTML = content
}
start()

const sort = document.querySelector('.fa-sort-down');
const card = document.querySelector('.card-container');
const board = document.getElementById('ledger');

sort.onclick = () => {
    if (sort.style.transform == 'rotate(180deg)'){
    board.style.transform = 'translateY(0)';
    board.style.background = 'rgba(0,0,0,.4)';
    sort.style.transform = 'rotate(0deg)';
    card.style.display = 'flex';
    }
    else {    
    board.style.transform = 'translateY(80px)';
    board.style.background = 'rgba(255,255,255,0)';
    sort.style.transform = 'rotate(180deg)';
    card.style.display = 'none';
    }
}

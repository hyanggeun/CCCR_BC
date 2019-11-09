async function start(){
    const response = await fetch('/api/blocks',{method: 'post', body: ''});
    const myJson = await response.json();
    console.log(myJson)
    let content = ""; 
    myJson.forEach(element => {
        let id = element.id
        let fingerPrint = element.fingerprint
        let tx = element.transactions
        let timeStamp = ""
        tx.forEach(element => {
            timeStamp += `<li>${element.timestamp}</li>`
        })
        content += `<div class="card" >
                        <div class="card-body">
                            <h6><span>\#${id}</span></h6>
                            <p>fingerprint: ${fingerPrint}</p>
                        </div>
                        <ul >
                            ${timeStamp}
                        </ul>
                    </div>`
    });
    document.getElementById('card-container').innerHTML = content
}
start()

const sort = document.querySelector('.fa-sort-down');
const card = document.querySelector('.card-container');
const board = document.getElementById('ledger');

sort.onclick = () => {


    if (sort.style.transform == 'rotate(180deg)'){
    board.style.margin = '0';
    board.style.background = 'rgba(0,0,0,.4)';
    sort.style.transform = 'rotate(0deg)';
    card.style.display = 'flex';
    }
    else {    
    board.style.margin = '0 0 -100px 0';
    board.style.background = 'rgba(255,255,255,0)';
    sort.style.transform = 'rotate(180deg)';
    card.style.display = 'none';
    }
}

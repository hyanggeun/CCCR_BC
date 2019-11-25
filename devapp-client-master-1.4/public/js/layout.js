var register = document.getElementById("registerEvent");
register.addEventListener('mouseover',()=>{
    var register_tag = document.querySelector(".side-tag-r");
    register_tag.style.display="block";
})
register.addEventListener('mouseout',()=>{
    var register_tag = this.document.querySelector(".side-tag-r");
    register_tag.style.display="none";
})

var transfer = document.getElementById("transferEvent");
transfer.addEventListener('mouseover',()=>{
    var transfer_tag = document.querySelector(".side-tag-t");
    transfer_tag.style.display="block";
})
transfer.addEventListener('mouseout',()=>{
    var transfer_tag = this.document.querySelector(".side-tag-t");
    transfer_tag.style.display="none";
})

var lists = document.getElementById("listEvent");
lists.addEventListener('mouseover',()=>{
    var list_tag = document.querySelector(".side-tag-l");
    list_tag.style.display="block";
})
lists.addEventListener('mouseout',()=>{
    var list_tag = this.document.querySelector(".side-tag-l");
    list_tag.style.display="none";
})

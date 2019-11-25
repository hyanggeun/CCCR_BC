    const menu = document.getElementById('open');
    const mobileMenu = document.querySelector('.menuModal');
    const menuBar = document.querySelector('.mobile-menu');
    const close = document.querySelector('.closeTab');
    const reg = document.getElementById('txModal');


        menu.onclick = () => {
            mobileMenu.style.display = 'flex';
            menuBar.style.display = 'block';
            menuBar.style.transform = 'translate(0)'

        }
        close.onclick = () => {
            mobileMenu.style.display = 'none';
        }


       window.onclick = async function(event) {
           if (event.target == mobileMenu || event.target == reg) {
               mobileMenu.style.display = "none";
               reg.style.display = "none";
           }
        }
    
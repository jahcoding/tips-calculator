let bill = document.querySelector('#bill'),
    customBtn = document.querySelector('#custom-btn'),
    countPeople = document.querySelector('#count-people'),
    tipAmount = document.querySelector('.tip-amount'),
    btns = document.querySelectorAll('.buttons button');

let billValue, countPeopleValue, customBtnValue, percentage;

function getDynamicInformation(selector){
    const input = document.querySelector(selector);

    input.addEventListener('input', (e)=>{
        switch(input.getAttribute('id')){
            case 'bill':
                billValue = parseFloat(input.value);
                break;
            case 'count-people':
                countPeopleValue = parseInt(input.value);
                break;
            case 'custom-btn':
                customBtnValue = parseInt(input.value);
        }
        
        costTotal(billValue, countPeopleValue, customBtnValue);
    }); 
    
}

function costTotal( bill, countPeople, customBtn ){
    if(bill && countPeople && customBtn){
        tipAmount.innerHTML = `$${((bill / countPeople) * (customBtn / 100)).toFixed(2)}`;
    }else{
        btns.forEach((item, i) => {

            item.addEventListener('click', (e)=>{ 
                e.preventDefault();
                percentage = +e.target.getAttribute('data-percent');
                disActiveBtn();
                activeBtn(i)
                
                console.log(percentage);
                if(bill && countPeople){
                    tipAmount.innerHTML = `$${((bill / countPeople) * (percentage / 100)).toFixed(2)}`;
                }
            });
        });
    }
    
    
}
function disActiveBtn(){
    btns.forEach((item)=>{
        item.classList.remove('active');
    })
}

function activeBtn(i){
    btns[i].classList.add('active');
}


costTotal();
getDynamicInformation('#bill');
getDynamicInformation('#count-people');
getDynamicInformation('#custom-btn');

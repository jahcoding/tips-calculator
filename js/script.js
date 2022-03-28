let bill = document.querySelector('#bill'),
    customBtn = document.querySelector('#custom-btn'),
    countPeople = document.querySelector('#count-people'),
    tipAmount = document.querySelector('.tip-amount'),
    btns = document.querySelectorAll('.buttons button'),
    total = document.querySelector('.total-person');

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
                disActiveBtn();
                customBtnValue = parseInt(input.value);
        }
        costTotal(billValue, countPeopleValue, customBtnValue);
    }); 
    
}

function costTotal( bill, countPeople, customBtn ){
    if(bill && countPeople && customBtn){
        tipAmount.innerHTML = `$${((bill / countPeople) * (customBtn / 100)).toFixed(2)}`;
        total.innerHTML = `$${((((bill * customBtn) / 100) + (bill)) / 5 ).toFixed(2)}`;
    }else{
        calcAmountWithDefaultPercents(bill, countPeople);
    }
}

function calcAmountWithDefaultPercents(bill, countPeople){
    btns.forEach((item, i) => {
        item.addEventListener('click', (e)=>{ 
            e.preventDefault();
            disActiveBtn();
            activeBtn(i);
            checkDynamicInformation(bill, countPeople, item);
        });
        checkDynamicInformation(bill, countPeople, item);
    });
}

function checkDynamicInformation(bill, countPeople, itemArray){
    if(bill && countPeople && itemArray.classList.contains('active')){
        percentage = +itemArray.getAttribute('data-percent');
        tipAmount.innerHTML = `$${((bill / countPeople) * (percentage / 100)).toFixed(2)}`;
        total.innerHTML = `$${((((bill * percentage) / 100) + (bill)) / 5 ).toFixed(2)}`;
    }
}

function disActiveBtn(){
    btns.forEach((item)=>{
        item.classList.remove('active');
    })
}

function activeBtn(i = 0){
    btns[i].classList.add('active');
}

disActiveBtn();
activeBtn();
getDynamicInformation('#bill');
getDynamicInformation('#count-people');
getDynamicInformation('#custom-btn');

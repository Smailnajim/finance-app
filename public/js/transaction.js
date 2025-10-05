const selectBudge = document.getElementById('selectBudge');
const transactionTo = document.getElementById('transactionTo');

selectBudge.addEventListener('change', function(){
    console.log(this.value);
    if(this.value == 'wallet'){
        console.log(this.value);
        transactionTo.style.display = 'block';
    }else{
        transactionTo.style.display = 'none';
    }
});
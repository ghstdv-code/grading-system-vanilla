const inputs = document.querySelectorAll('.form-group input[type="text"]'),
btnCompute = document.querySelector('#btn-compute'),
errorMsg = document.querySelector('.error'),
result = document.querySelector('#average'),
btnClear = document.querySelector('#btn-clear');

/*function IsDigit(event){
    if ((event.charCode >= 48 && event.charCode <= 57) || event.keyCode === 46)
        return true;
    return false;
}*/

inputs.forEach((textField) => {
    textField.maxLength = "5";
    textField.addEventListener('keyup', () => {
        errorMsg.style.display = "none";
        result.style.display = 'none';
    });
});

btnCompute.addEventListener('click', () => {
    let score = [];
    let empty = 0, inValid = 0;

     inputs.forEach((txt) => {
         if(txt.value == '') empty++;
         else if(parseFloat(txt.value) >= 100.0 || parseFloat(txt.value) <= 0.0) inValid++;
         else score.push(parseFloat(txt.value));
     });
     
     if(empty > 0){
        errorMsg.innerHTML = "Please fill-up empty fields!";
        errorMsg.style.display = "block";
     }
     else{
         if(inValid > 0){
            errorMsg.innerHTML = "Value must not be higher than 100 and lower than or equal to 0!";
            errorMsg.style.display = "block";
         } else {
             result.innerHTML = `Final Grade: ${getAverage(score)}`;
             result.style.display = 'block';
         }
     }

});

btnClear.addEventListener('click', () => {
    inputs.forEach((txt) => {
        txt.value = "";
        result.style.display = 'none';
        errorMsg.style.display = "none";
    });
});

function getAverage(scores){
    let result = 0;
    scores.forEach((score) => {
        result += score;
    });
    return (Math.round((result / scores.length)*100)/100).toFixed(2);
}
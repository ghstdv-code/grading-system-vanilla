const inputs = document.querySelectorAll('.form-group input[type="text"]'),
btnCompute = document.querySelector('#btn-compute'),
errorMsg = document.querySelector('.error'),
result = document.querySelector('#average'),
btnClear = document.querySelector('#btn-clear'),
wrapper = document.querySelector('.wrapper'),
tableWrapper = document.querySelector('.wrapper.table-result'),
table = document.querySelector('table');

/*function IsDigit(event){
    if ((event.charCode >= 48 && event.charCode <= 57) || event.keyCode === 46)
        return true;
    return false;
}*/

let datas = JSON.parse(localStorage.getItem("datas"));

inputs.forEach((textField) => {
    if(textField.name !== 'tbx-name'){
        textField.maxLength = "5";
    }
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
            if(!datas){
                datas = [];
            }
            let info = {name : inputs[0].value, 
                prelim : inputs[1].value, 
                midterm : inputs[2].value, 
                prefinals: inputs[3].value, 
                finals: inputs[4].value, 
                finalGrade: getAverage(score)};
            datas.push(info);
            result.innerHTML = `Final Grade: ${getAverage(score)}`;
            result.style.display = 'block';
            wrapper.classList.add('active');
            tableWrapper.style.display = "block"; 
            localStorage.setItem('datas', JSON.stringify(datas));
            showRows();

            inputs.forEach((txt) => {
                txt.value = "";
            });
         }
     }

});

btnClear.addEventListener('click', () => {
    inputs.forEach((txt) => {
        txt.value = "";
    });
    result.style.display = 'none';
    errorMsg.style.display = "none";
    tableWrapper.style.display = "none";
    datas.splice(0, datas.length);
    wrapper.style.height = "auto";
});

function getAverage(scores){
    let result = 0;
    for(let i = 1; i < scores.length; i++){
        result += scores[i];
    }
    return (Math.round((result / (scores.length-1))*100)/100).toFixed(2);
}

function showRows(){
    let tr = "";
    datas.forEach((data) => {
        tr += `<tr>
                <td class='studName'>${data.name}</td>
                <td class='term'>${data.prelim}</td>
                <td class='term'>${data.midterm}</td>
                <td class='term'>${data.prefinals}</td>
                <td class='term'>${data.finals}</td>
                <td>${data.finalGrade}</td>
              </tr>`;
    });

    table.innerHTML = ` <tr>
                            <th>Student Name</th>
                            <th class='term'>Prelim</th>
                            <th class='term'>Midterm</th>
                            <th class='term'>Pre-Finals</th>
                            <th class='term'>Finals</th>
                            <th>Final Grade</th>
                        </tr>` + tr;
    //tableWrapper.offsetHeight >= 170 ? tableWrapper.classList.add("overflow") : tableWrapper.classList.remove("overflow");
}
function Add() {
    console.log("function Add() get started")
    Display('PhoneBook', 'none');
    Display('AddContact', 'flex');
}
function Back(){
    console.log("function Back() get started")
    Display('AddContact', 'none');
    Display('PhoneBook', 'flex');
}
function Display(el, sost) {
    console.log("Display(el, sost) get started")
    document.getElementById(el).style.display = sost;
}


// Неправильный ввод пользователем
function Create() {
    let inputName = document.getElementById("inputName").value;
    let inputPhone = document.getElementById("inputPhone").value;
    let checkFavorites = document.getElementById("checkboxFavorites").checked;
            
    let errorName = 0;
    let errorPhone = 0;
                
    if(!inputName) {
        alert("Введите имя");
        errorName++;
    }else {
        if(!/^[A-ZА-ЯЁ]+$/i.test(inputName)) {
            alert("Имя введено неверно");
            errorName++;
        }else {
            if (inputName.length > 15) {
                alert("Имя слишком длинное");
                errorName++;
            }
        }
    }
    if(!inputPhone) {
        alert("Введите номер");
        errorPhone++;
    }else {
        if (inputPhone.length < 11) {
            alert("Номер слишком короткий");
            errorPhone++;
        }else{
            for(let i = 0; array.length > i; i++) {
                if(array[i][1] == inputPhone){
                    alert("Номер телефона уже используется");
                    errorPhone++;
                }
            } 
        }
    }

    if(errorName == 0 && errorPhone == 0){
        array.push([inputName, inputPhone]);
        Sort();

        AddContact(copy);
        Back();
        document.getElementById("inputName").value = "";
        document.getElementById("inputPhone").value = "";
    }
}



let array = [];
let copy = [];

function Sort() {
    copy = [];
    for (let i = 0; i < array.length; i++){
        copy[i] = array[i];
    }

    copy.sort((a, b) => a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1);

    for (let i = 0; i < copy.length; i++){
        for (let j = 0; j < copy.length-1; j++){
            if (copy[j][2] < copy[j + 1][2]) {
                let q = copy[j];
                copy[j] = copy[j + 1];
                copy[j + 1] = q;
            }
        }
    }
}

function AddContact(ar) {
    document.getElementById("PhoneBookMidle").innerHTML = "";

    for (let i = 0; i < ar.length; i++){

    document.getElementById("PhoneBookMidle").innerHTML += 
        '<div id = "'+ar[i][1]+'"class="CardContact">' +
            '<div class="IconInCard">' +
            '<img src="img/contact.png" alt="Контакт" height="55" width="55"></div>' +
                '<div class="NameContactInCard">'+ar[i][0]+'<br/>'+ar[i][1]+'</div>'+
                '<div>'+
                    '<input type = "checkbox" aria-hidden="true" class = "favorite" onclick=\'Delete("' + ar[i][1] + '")\'>'+
                '</div>'+
            '</div>';
    }
}

function Delete(number) {
    console.log(number, "function Delete(number) get started");
    for(let i = 0; i < array.length; i++) {
        if(array[i][1] == number ){
            console.log("for in Delete(number)");
            array.splice(i, 1); 
            document.getElementById(number).remove();
        }
    } 
    for (let i = 0; i < array.length; i++){
        copy[i] = array[i];
    }
}






// Маска
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.inputPhone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___)-___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

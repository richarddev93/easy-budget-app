/*
    Criado por: Lucas Henrique
    Em: 17/10/2018

    str = cpf ou cnpj só numeros
    tipo = 'CPF' || 'CNPJ'
*/

function CEP(str)
{
    // Caso o CEP não esteja nesse formato ele é inválido!
    var objER = /^[0-9]$/;
    str = str.trim()
    // console.log("str",str)
    if(str.length > 0)
        {
            if(objER.test(str)){
            // console.log("true")
                return true;
            }
            else{
            // console.log('false')
                return false;
            }
        }
    else
        return false;
}

function CPF(str){
    var Soma;
    var Resto;
    Soma = 0;
    if (str == "00000000000") return false;

    if (cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999") return false;
        
    for (i=1; i<=9; i++) Soma = Soma + parseInt(str.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(str.substring(9, 10)) ) return false;
    
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(str.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(str.substring(10, 11) ) ) return false;
    return true;
}
function CNPJ(str){
    cnpj = str;
        if(cnpj == '') return false;
        
        if (cnpj.length != 14)
            return false;
    
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
         
        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
            
        return true;
}

function EMAIL(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email) === false){
        return false;
    }else{
        return true;
    }
}
function TELEFONE(telefone){
    if (!telefone || telefone.length <8 || telefone.length>9  ){
        return false;
    } else {
        return true;
    }

}

module.exports = function(str,tipo) {
    switch (tipo) {
        case 'CPF':
            return CPF(str);

        case 'CNPJ':
            return CNPJ(str);
        
        case 'EMAIL':
            return EMAIL(str);

        case 'CEP':
            return CEP(str);
        case 'PHONE':
            console.log('phone')
            return TELEFONE(str);
    
        default:
            return false;
    }
}
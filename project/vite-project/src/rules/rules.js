import {defineRule} from 'vee-validate';

defineRule('positive', value => {
    if (value > 0){ return true}
    else{ return 'Número deve ser positivo!'}
  });

  defineRule('matchPasswords' , (value , [target]) => {
    if (value === target) {
        return true;
      }
      return "As senhas não são iguais";
  })

  defineRule('isRequired' , value => {
    if (value && value.trim()) {
        return true;
      }
      return "Este campo é obrigatório";
  })
  
  defineRule('passwordLength' , value => {
    if (value.length >= 8) {
        return true;
      }
      return 'Senha deve conter ao menos 8 caracteres'
  })
  defineRule('validDate' , value => {
    if (Date.parse(value) < Date.now()) {
        return true;
      }
      return 'Data Inválida'
  })
  defineRule('estadoLength' , value => {
    if (value.length < 3) {
        return true;
      }
      return 'Insira apenas a sigla do estado'
  })
// Seleciona os elementos do formulário
const accountForm = document.getElementById('account-form');
const nameInput = document.getElementById('account-name');
const emailInput = document.getElementById('account-email');
const addressInput = document.getElementById('account-address');
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');

// Função para carregar as informações da conta (recupera da sessionStorage ou usa valores padrão)
function loadAccountInfo() {
  const account = getPropertyFromSessionStorage('account', {
    name: 'Fulano de Tal',
    email: 'fulano@example.com',
    address: 'Rua Exemplo, 123'
  });
  nameInput.value = account.name;
  emailInput.value = account.email;
  addressInput.value = account.address;
}

// Inicializa os dados do formulário
loadAccountInfo();

// Quando o botão "Editar" é clicado, habilita os campos para edição
editButton.addEventListener('click', () => {
  nameInput.disabled = false;
  emailInput.disabled = false;
  addressInput.disabled = false;
  editButton.classList.add('hidden');
  saveButton.classList.remove('hidden');
});

// Ao submeter o formulário, salva as informações e volta ao modo somente leitura
accountForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const updatedAccount = {
    name: nameInput.value,
    email: emailInput.value,
    address: addressInput.value
  };
  
  savePropertyInSessionStorage('account', updatedAccount);
  
  nameInput.disabled = true;
  emailInput.disabled = true;
  addressInput.disabled = true;
  saveButton.classList.add('hidden');
  editButton.classList.remove('hidden');
  
  alert('Informações atualizadas com sucesso!');
});

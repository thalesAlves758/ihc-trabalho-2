const accountForm = document.getElementById('account-form');
const nameInput = document.getElementById('account-name');
const emailInput = document.getElementById('account-email');
const addressInput = document.getElementById('account-address');
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');

function loadAccountInfo() {
  const account = getPropertyFromSessionStorage('account', {
    name: 'Clovis Oliveira',
    email: 'clovis@gmail.com',
    address: 'Rua X, 123'
  });
  nameInput.value = account.name;
  emailInput.value = account.email;
  addressInput.value = account.address;
}

loadAccountInfo();

editButton.addEventListener('click', () => {
  nameInput.disabled = false;
  emailInput.disabled = false;
  addressInput.disabled = false;
  editButton.classList.add('hidden');
  saveButton.classList.remove('hidden');
});

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

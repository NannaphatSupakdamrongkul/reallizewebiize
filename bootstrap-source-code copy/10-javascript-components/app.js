const modalElement = document.querySelector('#confirmModal');
const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

document.querySelector('#openWithJs').addEventListener('click', () => {
  modal.show();
});

modalElement.addEventListener('shown.bs.modal', () => {
  console.log('Modal opened at', new Date().toLocaleTimeString('th-TH'));
});


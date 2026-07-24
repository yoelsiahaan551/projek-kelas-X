document.addEventListener('DOMContentLoaded', () => {
  const formProfil = document.getElementById('form-profil');
  const ubahButton = document.getElementById('ubahButton');
  const simpanButton = document.getElementById('simpanButton');
  const logoutButton = document.getElementById('logout');
  const inputs = formProfil.querySelectorAll('input, select');
  const displayName = document.getElementById('displayName');

  inputs.forEach(input => input.disabled = true);
  simpanButton.disabled = true; 

  ubahButton.addEventListener('click', () => {
    inputs.forEach(input => input.disabled = false);
    ubahButton.disabled = true;
    simpanButton.disabled = false;
  });

  formProfil.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataProfil = {};
    inputs.forEach(input => {
      dataProfil[input.name] = input.value;
      input.disabled = true; 
    });

    localStorage.setItem('dataProfil', JSON.stringify(dataProfil));

    if (dataProfil.nama) {
      displayName.textContent = dataProfil.nama;
    }

    alert('Perubahan profil berhasil disimpan!');

    ubahButton.disabled = false;
    simpanButton.disabled = true;
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('dataProfil');
    localStorage.removeItem('keranjang');

    window.location.href = '../landing page/landingpage.html';
  });

  function loadProfil() {
    const savedData = JSON.parse(localStorage.getItem('dataProfil'));
    if (savedData) {
      inputs.forEach(input => {
        if (savedData[input.name]) {
          input.value = savedData[input.name];
        }
      });

      if (savedData.nama) {
        displayName.textContent = savedData.nama;
      }
    }
  }

  loadProfil();
});

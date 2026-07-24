document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-summary');
  const totalPriceElement = document.getElementById('total-price');
  const buyButton = document.getElementById('buy-button');
  const backButton = document.getElementById('btn-back');

  let checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];

  function renderCart() {
    cartContainer.innerHTML = '';
    if (checkoutItems.length === 0) {
      cartContainer.innerHTML = '<p class="text-gray-500">Keranjang kosong.</p>';
      totalPriceElement.textContent = 'Rp 0';
      return;
    }

    let total = 0;
    checkoutItems.forEach(item => {
      const hargaIDR = item.price * 16000;
      const subtotal = hargaIDR * item.jumlah;
      total += subtotal;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex justify-between text-sm text-gray-700';
      itemDiv.innerHTML = `
        <span>${item.title} (x${item.jumlah})</span>
        <span>${subtotal.toLocaleString('id-ID')}</span>
      `;
      cartContainer.appendChild(itemDiv);
    });

    totalPriceElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  }

  renderCart();

  buyButton.addEventListener('click', () => {
    const nama = document.getElementById('input-nama').value.trim();
    const alamat = document.getElementById('input-alamat').value.trim();
    const telepon = document.getElementById('input-telepon').value.trim();

    if (!nama || !alamat || !telepon) {
      alert('Harap isi semua data terlebih dahulu!');
      return;
    }

    if (checkoutItems.length === 0) {
      alert('Tidak ada item di checkout.');
      return;
    }

    alert('Pesanan anda diproses!');
    localStorage.removeItem('checkoutItems');
    window.location.href = '../homePage/beranda.html';
  });

  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = '../homePage/beranda.html';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const totalPriceElem = document.getElementById('total-price');
  const beliButton = document.getElementById('btn-beli');

  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
  }

  function renderCart() {
    cartContainer.innerHTML = '';

    if (keranjang.length === 0) {
      cartContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">Keranjang masih kosong</p>`;
      totalPriceElem.textContent = formatRupiah(0);
      return;
    }

    let totalHarga = 0;

    keranjang.forEach((produk, index) => {
      const hargaProduk = produk.price * produk.jumlah * 16000;
      totalHarga += hargaProduk;

      const item = document.createElement('div');
      item.className = 'bg-white p-4 rounded shadow flex gap-4 items-center justify-between';

      item.innerHTML = `
        <img src="${produk.image}" alt="${produk.title}" class="w-24 h-24 object-contain rounded" />
        <div class="flex-1">
          <h2 class="font-semibold text-lg">${produk.title}</h2>
          <p>Harga per item: ${formatRupiah(produk.price * 16000)}</p>
          <p>Subtotal: ${formatRupiah(hargaProduk)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-decrease bg-gray-300 px-2 py-1 rounded" data-index="${index}">-</button>
          <span class="w-8 text-center">${produk.jumlah}</span>
          <button class="btn-increase bg-gray-300 px-2 py-1 rounded" data-index="${index}">+</button>
        </div>
        <button data-index="${index}" class="btn-delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
      `;

      cartContainer.appendChild(item);
    });

    totalPriceElem.textContent = formatRupiah(totalHarga);

    cartContainer.querySelectorAll('.btn-delete').forEach(button => {
      button.addEventListener('click', e => {
        const idx = e.target.getAttribute('data-index');
        keranjang.splice(idx, 1);
        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        renderCart();
      });
    });

    cartContainer.querySelectorAll('.btn-increase').forEach(button => {
      button.addEventListener('click', e => {
        const idx = e.target.getAttribute('data-index');
        keranjang[idx].jumlah += 1;
        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        renderCart();
      });
    });

    cartContainer.querySelectorAll('.btn-decrease').forEach(button => {
      button.addEventListener('click', e => {
        const idx = e.target.getAttribute('data-index');
        if (keranjang[idx].jumlah > 1) {
          keranjang[idx].jumlah -= 1;
          localStorage.setItem('keranjang', JSON.stringify(keranjang));
          renderCart();
        }
      });
    });
  }

  renderCart();

  if (beliButton) {
    beliButton.addEventListener('click', () => {
      if (keranjang.length === 0) return;
      window.location.href = '../homePage/checkout.html';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-summary');
  const totalPriceElement = document.getElementById('total-price');
  const buyButton = document.getElementById('buy-button');
  const backButton = document.getElementById('btn-back');

  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  function renderCart() {
    cartContainer.innerHTML = ''; 
    if (keranjang.length === 0) {
      cartContainer.innerHTML = '<p class="text-gray-500">Keranjang kosong.</p>';
      totalPriceElement.textContent = 'Rp 0';
      return;
    }

    let total = 0;
    keranjang.forEach(item => {
      const hargaIDR = item.price * 16000; 
      const subtotal = hargaIDR * item.jumlah;
      total += subtotal;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex justify-between text-sm text-gray-700';
      itemDiv.innerHTML = `
        <span>${item.title} (x${item.jumlah})</span>
        <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
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
      alert('Harap isi semua data pengiriman yang wajib!');
      return;
    }

    if (keranjang.length === 0) {
      alert('Keranjang kosong, silakan pilih produk terlebih dahulu.');
      return;
    }

    alert('Pesanan berhasil dibuat!\nTerima kasih telah berbelanja di Tokaz.store.');
    localStorage.removeItem('keranjang');
    window.location.href = '../homePage/beranda.html';
  });

  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = '../homePage/beranda.html';
    });
  }
});






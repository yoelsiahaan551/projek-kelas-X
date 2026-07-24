const cartContainer = document.getElementById('cart-container');
const totalPriceElem = document.getElementById('total-price');
const beliBtn = document.getElementById('btn-beli');
const checkAll = document.getElementById('select-all'); 

let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

function formatRupiah(number) {
  return 'Rp ' + number.toLocaleString('id-ID');
}

function updateTotal() {
  let total = 0;
  const checkboxes = document.querySelectorAll('.checkbox-item');

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      const produk = keranjang[i];
      total += produk.price * produk.jumlah * 16000;
    }
  });

  totalPriceElem.textContent = formatRupiah(total);
}

function addCartEventHandlers() {
  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', e => {
      const idx = e.target.getAttribute('data-index');
      keranjang.splice(idx, 1);
      localStorage.setItem('keranjang', JSON.stringify(keranjang));
      renderCart();
    });
  });

  document.querySelectorAll('button[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      const action = button.getAttribute('data-action');

      if (action === 'tambah') {
        keranjang[index].jumlah++;
      } else if (action === 'kurang' && keranjang[index].jumlah > 1) {
        keranjang[index].jumlah--;
      }

      localStorage.setItem('keranjang', JSON.stringify(keranjang));
      renderCart();
    });
  });

  document.querySelectorAll('.checkbox-item').forEach(cb => {
    cb.addEventListener('change', () => {
      const all = document.querySelectorAll('.checkbox-item');
      const checked = document.querySelectorAll('.checkbox-item:checked');
      checkAll.checked = all.length === checked.length; 
      updateTotal();
    });
  });

  if (checkAll) {
    checkAll.addEventListener('change', () => {
      const allCheckboxes = document.querySelectorAll('.checkbox-item');
      allCheckboxes.forEach(cb => cb.checked = checkAll.checked);
      updateTotal();
    });
  }
}

function renderCart() {
  cartContainer.innerHTML = '';

  if (keranjang.length === 0) {
    cartContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">Keranjang masih kosong</p>`;
    totalPriceElem.textContent = formatRupiah(0);
    return;
  }

  keranjang.forEach((produk, index) => {
    const hargaProduk = produk.price * produk.jumlah * 16000;

    const item = document.createElement('div');
    item.className = 'bg-white p-4 rounded shadow flex gap-4 items-center justify-between';

    item.innerHTML = `
      <input type="checkbox" class="checkbox-item w-5 h-5 mr-2" data-index="${index}" checked>
      <img src="${produk.image}" alt="${produk.title}" class="w-24 h-24 object-contain rounded" />
      <div class="flex-1">
        <h2 class="font-semibold text-lg">${produk.title}</h2>
        <p>Harga per item: ${formatRupiah(produk.price * 16000)}</p>
        <div class="flex items-center gap-2 mt-2">
          <button data-action="kurang" data-index="${index}" class="bg-gray-300 px-2 py-1 rounded">-</button>
          <span class="font-medium">${produk.jumlah}</span>
          <button data-action="tambah" data-index="${index}" class="bg-gray-300 px-2 py-1 rounded">+</button>
        </div>
        <p class="mt-2">Subtotal: ${formatRupiah(hargaProduk)}</p>
      </div>
      <button data-index="${index}" class="btn-delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
    `;

    cartContainer.appendChild(item);
  });

  updateTotal();
  addCartEventHandlers();
}

if (beliBtn) {
  beliBtn.addEventListener('click', () => {
    const selected = [];
    document.querySelectorAll('.checkbox-item').forEach((cb, i) => {
      if (cb.checked) {
        selected.push(keranjang[i]);
      }
    });

    if (selected.length === 0) {
      alert("Pilih minimal 1 produk untuk checkout.");
      return;
    }

    beliBtn.disabled = true;
    beliBtn.textContent = "Memproses pembelian...";

    setTimeout(() => {
      localStorage.setItem('checkoutItems', JSON.stringify(selected));
      window.open("../homepage/checkout.html", "_blank", "width=600,height=600");

      keranjang = keranjang.filter((_, i) => !document.querySelectorAll('.checkbox-item')[i].checked);
      localStorage.setItem('keranjang', JSON.stringify(keranjang));
      renderCart();

      beliBtn.disabled = false;
      beliBtn.textContent = "Beli Sekarang";
    }, 2000);
  });
}

renderCart();

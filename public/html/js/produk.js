fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    const containerPencarian = document.getElementById('produkApi');
    const batasProduk = data.slice(6, 16); // Produk ke-7 sampai ke-11

    batasProduk.forEach(product => {
      const card = document.createElement('div');
      card.className = 'bg-white w-60 h-90 shadow-xl p-4 flex flex-col justify-between transform transition duration-300 hover:scale-105 cursor-pointer';

      const potonganJudul = potongTeks(product.title, 40); 
      card.innerHTML = `
        <div>
          <img src="${product.image}" alt="${product.title}" class="w-40 h-40 object-contain mx-auto ">
          <p class="title text-sm mt-2" title="${product.title}">${potonganJudul}</p>
          <p class="price text-sm font-bold">RP ${(product.price * 16000).toLocaleString('id-ID')}</p>
          <p class="cod text-sm font-bold text-[var(--primary-color)]">Bisa COD</p>
          <p class="sold text-blue-500">150 Terjual</p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 512 512">
              <path fill="currentColor" d="..."/>
            </svg>
           <p class="text-sm ">Jakarta</p>
          </div>
          <button class="h-8 px-4 border border-[var(--primary-color)] text-[var(--primary-color)] font-bold rounded-md text-sm hover:bg-[var(--primary-color)] transition">
            +Keranjang
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        localStorage.setItem('productId', JSON.stringify(product));
        window.location.href = '../landing page/detail.html'; 
      });

      containerPencarian.appendChild(card);

      const tombolKeranjang = card.querySelector('button');

tombolKeranjang.addEventListener('click', (e) => {
  e.stopPropagation(); 

  const produkbaru = {
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    jumlah: 1,
  };

  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  const produkLama = keranjang.find(item => item.id === produkbaru.id);
  if (produkLama) {
    produkLama.jumlah++;
  } else {
    keranjang.push(produkbaru);
  }

  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert('Produk berhasil ditambahkan ke keranjang');
});

    });
  })
  .catch(err => {
    console.error('Gagal mengambil data:', err);
  });

function potongTeks(teks, max) {
  return teks.length > max ? teks.slice(0, max) + '...' : teks;
}


function potongTeks(teks, maxLength) {
  return teks.length > maxLength ? teks.slice(0, maxLength) + '...' : teks;
}

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    const containerPencarian = document.getElementById('pilihanApi');
    const batasProduk = data.slice(6, 16); 

    batasProduk.forEach(product => {
      const card = document.createElement('div');
      card.className = 'bg-white w-60 h-90 shadow-xl p-4 flex flex-col justify-between transform transition duration-300 hover:scale-105';

      const potonganJudul = potongTeks(product.title, 40);

      card.innerHTML = `
        <div>
          <img src="${product.image}" alt="${product.title}" class="w-40 h-40 object-contain mx-auto">
          <p class="title text-sm mt-2" title="${product.title}">${potonganJudul}</p>
          <p class="price text-sm font-bold">RP ${(product.price * 16000).toLocaleString('id-ID')}</p>
          <p class="cod text-sm font-bold text-[var(--primary-color)]">Bisa COD</p>
          <p class="sold text-sm">150 Terjual</p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"/>
            </svg>
            <p class="text-sm">Jakarta</p>
          </div>
       <button class="h-8 px-4 border border-[var(--primary-color)] text-[var(--primary-color)] font-bold rounded-md text-sm hover:bg-[var(--primary-color)] hover:text-white transition">
             <a href="../html/keranjang.html">Keranjang</a>
            </button>
        </div>
      `;

      containerPencarian.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Gagal mengambil data:', err);
  });


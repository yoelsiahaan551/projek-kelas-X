document.addEventListener('DOMContentLoaded', () => {
  const produk = JSON.parse(localStorage.getItem('productId'));

  if (!produk) {
    alert('Produk tidak ditemukan!');
    window.location.href = '../homePage/beranda.html';
    return;
  }

  document.getElementById('product-image').src = produk.image;
  document.getElementById('product-title').textContent = produk.title;
  document.getElementById('product-category').textContent = produk.category;
  document.getElementById('product-description').textContent = produk.description;
  document.getElementById('product-price').textContent = `Rp ${(produk.price * 16000).toLocaleString('id-ID')}`;

  document.getElementById('buy-button').addEventListener('click', () => {
    const produkBaru = {
      id: produk.id,
      title: produk.title,
      image: produk.image,
      price: produk.price,
      jumlah: 1
    };

    localStorage.setItem('checkoutItems', JSON.stringify([produkBaru]));

    window.location.href = '../homePage/checkout.html';
  });
});

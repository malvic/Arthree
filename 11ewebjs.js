let currentIndex = 0;

// ==========================================
// LOGIKA MODAL STRUKTUR ORGANISASI
// ==========================================
const memberModal = document.getElementById("memberModal");
const modalRole = document.getElementById("modalRole");
const modalName = document.getElementById("modalName");
const modalSub = document.getElementById("modalSub");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");

// Fungsi Buka Modal
function openModal(role, name, sub, desc, imgUrl) {
  if (!memberModal) return;

  modalRole.innerText = role;
  modalName.innerText = name;
  modalSub.innerText = sub;
  modalDesc.innerText = desc;
  
  // Gambar placeholder default jika foto belum ada
  modalImg.src = imgUrl || 'https://via.placeholder.com/150';

  memberModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Kunci scroll layar utama
}

// Fungsi Tutup Modal
function closeModal() {
  if (!memberModal) return;
  memberModal.classList.remove("active");
  document.body.style.overflow = "auto"; // Aktifkan kembali scroll layar utama
}

// 1. Tutup modal jika area luar kotak (overlay) diklik
function closeModalOutside(event) {
  if (event.target === memberModal) {
    closeModal();
  }
}

// 2. Tutup modal jika tombol Escape (ESC) pada keyboard ditekan
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && memberModal && memberModal.classList.contains("active")) {
    closeModal();
  }
});

// ==========================================
// LOGIKA RENDER KARTU STRUKTUR ORGANISASI
// ==========================================
function renderStructureCards() {
  const container = document.querySelector(".structure-grid");
  if (!container || typeof dataPengurus === 'undefined') return;

  container.innerHTML = ""; // Bersihkan konten lama di HTML

  dataPengurus.forEach(item => {
    // 1. Jika kartu bertipe invisible (kartu kosong penyeimbang)
    if (item.isInvisible) {
      const invisibleCardHTML = `<div class="struct-card invisible-card"></div>`;
      container.innerHTML += invisibleCardHTML;
      return;
    }

    // 2. Berikan class khusus jika dia Wali Kelas
    const extraClass = item.isWaliKelas ? " wali-kelas" : "";

    // 3. Buat elemen HTML kartu biasa
    const cardHTML = `
      <div class="struct-card${extraClass}" onclick="openModal('${item.role}', '${item.name}', '${item.sub}', '${item.desc}', '${item.img}')">
        <span class="role">${item.role}</span>
        <h4>${item.name}</h4>
      </div>
    `;

    container.innerHTML += cardHTML;
  });
}

// Jalankan fungsi render saat halaman web selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
  renderStructureCards();
});

// *gallery function
// Mengambil elemen HTML
const galleryImg = document.getElementById("galleryImg");
const photoTitle = document.getElementById("photoTitle");
const photoDesc = document.getElementById("photoDesc");
const infoContainer = document.getElementById("infoContainer");
const galleryDots = document.getElementById("galleryDots");

// Fungsi untuk membuat elemen titik-titik indikator berdasarkan jumlah galleryData
function renderDots() {
  if (typeof galleryData === 'undefined' || galleryData.length === 0 || !galleryDots) return;
  
  galleryDots.innerHTML = ""; // Bersihkan container
  
  galleryData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === currentIndex) dot.classList.add("active");

    // Klik titik untuk langsung melompat ke foto terkait
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlide();
    });

    galleryDots.appendChild(dot);
  });
}

// Fungsi untuk memperbarui tampilan slide + titik aktif
function updateSlide() {
  if (typeof galleryData === 'undefined' || galleryData.length === 0) return;

  const currentData = galleryData[currentIndex];
  
  // Efek transisi halus saat ganti gambar
  if (galleryImg) {
    galleryImg.style.opacity = "0.2";
    setTimeout(() => {
      galleryImg.src = currentData.image; 
      galleryImg.style.opacity = "1";
    }, 150);
  }

  if (photoTitle) {
    photoTitle.innerText = currentData.title;
  }
  if (photoDesc) {
    photoDesc.innerText = currentData.desc;
  }

  // Update status titik aktif
  updateActiveDot();
}

// Fungsi untuk memperbarui kelas 'active' pada titik
function updateActiveDot() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Fungsi tombol panah kanan
function nextSlide() {
  if (typeof galleryData === 'undefined' || galleryData.length === 0) return;
  currentIndex = (currentIndex + 1) % galleryData.length;
  updateSlide();
}

// Fungsi tombol panah kiri
function prevSlide() {
  if (typeof galleryData === 'undefined' || galleryData.length === 0) return;
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
  updateSlide();
}

// Fungsi untuk buka/tutup deskripsi saat judul diklik
function toggleDesc() {
  if (infoContainer) {
    infoContainer.classList.toggle("open");
  }
}

// Langsung panggil saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
  renderDots();
  updateSlide();
});

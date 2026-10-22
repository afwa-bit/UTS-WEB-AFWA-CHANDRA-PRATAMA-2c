document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
        } else {
            themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
        }
    });

    // 2. Kalkulator Estimasi Biaya Proyek (Custom JS Function & DOM)
    const costForm = document.getElementById("costForm");
    const calcResult = document.getElementById("calcResult");
    const resultText = document.getElementById("resultText");

    costForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const basePrice = parseFloat(document.getElementById("projectType").value);
        const duration = parseInt(document.getElementById("projectDuration").value);

        if (isNaN(basePrice) || isNaN(duration)) return;

        // Logika perhitungan sederhana (misal: penambahan biaya jika durasi sangat singkat)
        let totalCost = basePrice;
        if (duration < 7) {
            totalCost *= 1.2; // Tambahan 20% untuk ekspres
        }

        // Format ke Rupiah
        const formattedCost = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(totalCost);

        resultText.innerHTML = `Estimasi Total Biaya: <strong>${formattedCost}</strong> (Estimasi waktu ${duration} hari).`;
        calcResult.classList.remove("d-none");
    });

    // 3. Filter Proyek Interaktif (DOM Manipulation)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Hapus kelas aktif dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove("active", "btn-dark"));
            filterButtons.forEach(btn => btn.classList.add("btn-outline-dark"));
            
            // Tambahkan kelas aktif ke tombol yang diklik
            this.classList.add("active", "btn-dark");
            this.classList.remove("btn-outline-dark");

            const filterValue = this.getAttribute("data-filter");

            projectItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // 4. Validasi Form Kontak Sederhana
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add("was-validated");
        } else {
            contactForm.classList.remove("was-validated");
            contactForm.reset();
            formAlert.classList.remove("d-none");
            setTimeout(() => {
                formAlert.classList.add("d-none");
            }, 4000);
        }
    });
});
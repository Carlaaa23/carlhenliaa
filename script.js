document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#login') {
                
                const wrapper = document.querySelector('.wrapper');
                if (wrapper) {
                    wrapper.classList.add('active-popup');
                    wrapper.classList.remove('active'); 
                }
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Simple scroll animation for sections ---
    const sections = document.querySelectorAll('.section'); 
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden-section'); // Add initial hidden state for animation
        sectionObserver.observe(section);
    });

    // --- Fungsionalitas Slider Portofolio ---
    const portfolioSlides = document.querySelectorAll('.portfolio-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0; // Index slide yang sedang aktif

    function showSlide(index) {
        if (!portfolioSlides.length) return; // Keluar jika tidak ada slide

        portfolioSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Pastikan tombol ada sebelum mencoba mengakses properti disabled
        if (prevButton) prevButton.disabled = (index === 0);
        if (nextButton) nextButton.disabled = (index === portfolioSlides.length - 1);
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentSlide < portfolioSlides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        });
    }

    // Tampilkan slide pertama saat halaman dimuat, hanya jika ada slide
    if (portfolioSlides.length > 0) {
        showSlide(currentSlide);
    }

    // --- Fungsionalitas MODAL Detail Proyek ---
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button'); // Tombol 'x' di dalam modal
    const viewProjectButtons = document.querySelectorAll('.view-project-btn'); // Tombol "Lihat Detail" di setiap project card

    // Elemen-elemen di dalam modal
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectImg = document.getElementById('modal-project-img');
    const modalProjectFullDesc = document.getElementById('modal-project-full-desc');
    const liveDemoButton = document.querySelector('.live-demo-button');

    
    const projectData = {
        project1: { 
            title: 'About Tilla',
            image: 'ft.jpg', 
            description: 'Hello! Its Mardhatilla! Im a Mathematics student at Bengkulu University and a passionate learner based in Bengkulu. I enjoy exploring the beauty of logic and problem-solving, and I love pushing myself to discover new knowledge and creative thinking in every challenge. Im known to be a adaptive, and enthusiastic person who is always ready to grow and contribute meaningfully.',
            EDUCATION: '2021 – 2024 <br>SMA Negeri 06 kota Bengkulu <br>2024 – Present <br>Bengkulu University, Mathematics',
            ACHIEVEMENTS: '"Juara 3 Lomba Sains Nasional 2023" <br> "Juara 3 Fisika Nasional 2021" <br> "Juara 2 History Nasional 2022"',
        },
        project2: { 
            title: 'About Carla',
            image: 'ft2.jpg', 
            description: 'Hi, Im Putrisyah Carla Najmazky — but just call me Carla, it feels warmer that way. Im a Mathematics and Science student at the University of Bengkulu, someone who may not collect medals, but often stands on stage as an event host, letting words flow where silence once lived. I love mathematics not just for its logic, but for its quiet beauty — the way it offers clarity when the world feels uncertain, and how, in every equation, there’s a gentle reminder that some answers only come with patience.',
            EDUCATION: '2018 - 2021 <br> MTS Bunayya Islamic School <br>2021 – 2024 <br>SMA Negeri 04 Rejang Lebong <br> 2024 – Present <br>Bengkulu University, Mathematics',
            ACHIEVEMENTS: '"Juara 3 Olimpiade Matematika SUMBAGSEL 2020" <br> "Peserta Matematika KSMO 2020"',
        },
        project3: { 
            title: 'About Hengki',
            image: 'ft3.jpg', 
            description: 'Saya Hengki Afriyan, mahasiswa Program Studi Matematika di Universitas Bengkulu dengan minat besar di dunia desain dan seni menggambar. Meskipun latar belakang akademik saya berfokus pada logika dan angka, passion saya ada pada visual dan kreativitas. Saya suka menuangkan ide dalam bentuk ilustrasi dan desain, baik digital maupun manual. Saya percaya bahwa seni dan logika bisa saling melengkapi kemampuan berpikir struktural dari matematika membantu saya lebih teliti dan detail dalam proses kreatif.',
            EDUCATION: '2021 – 2024 <br>SMA Negeri 10 Bengkulu Selatan <br>2024 – Present <br>Bengkulu University, Mathematics',
            ACHIEVEMENTS: '"Juara 2 Speech tingkat kabupaten 2023"',
        }
    };

    // Fungsi untuk membuka modal
    function openModal(projectId) {
        const project = projectData[projectId];
        if (project && projectModal && modalProjectTitle && modalProjectImg && modalProjectFullDesc) {
            modalProjectTitle.textContent = project.title;
            modalProjectImg.src = project.image;
            modalProjectFullDesc.innerHTML = `
                ${project.description || ''}
                <br><br>
                <ul>
                    ${project.EDUCATION ? `<li><strong>Pendidikan:</strong> <br>${project.EDUCATION}</li>` : ''}
                    ${project.ACHIEVEMENTS ? `<li><strong>Pencapaian:</strong> <br>${project.ACHIEVEMENTS}</li>` : ''}
                </ul>
            `;
            projectModal.classList.add('active'); // Tampilkan modal
            document.body.style.overflow = 'hidden'; // Nonaktifkan scroll body
        } else {
            console.warn(`Project data for ID "${projectId}" or required modal elements not found.`);
        }
    }

    // Fungsi untuk menutup modal
    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active'); // Sembunyikan modal
            document.body.style.overflow = 'auto'; // Aktifkan kembali scroll body
        }
    }

    // Event listener untuk setiap tombol "Lihat Detail"
    if (viewProjectButtons.length > 0) {
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const projectId = event.target.dataset.projectId; // Ambil ID proyek dari data-project-id
                openModal(projectId);
            });
        });
    }

    // Event listener untuk tombol close (x)
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Menutup modal jika klik di luar area modal content
    if (projectModal) {
        window.addEventListener('click', (event) => {
            if (event.target === projectModal) { // Gunakan '===' untuk perbandingan ketat
                closeModal();
            }
        });
    }

    // --- Fungsionalitas Login/Register (Terintegrasi) ---
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnLoginPopup = document.querySelector('.btnLogin-popup'); // Tombol 'Login' di navbar
    const iconClose = document.querySelector('.icon-close'); // Icon 'x' di form login/register

    // Mengaktifkan wrapper popup saat tombol login di navbar diklik
    if (btnLoginPopup) {
        btnLoginPopup.addEventListener('click', () => {
            if (wrapper) {
                wrapper.classList.add('active-popup');
                wrapper.classList.remove('active'); // Pastikan ini adalah form login (tinggi default)
            }
        });
    }});
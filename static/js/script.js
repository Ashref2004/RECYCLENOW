const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        const getLocationBtn = document.getElementById('get-location-btn');
        const locationInput = document.getElementById('location');
        
        getLocationBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                getLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        locationInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                        getLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Current Location';
                    },
                    (error) => {
                        alert('Unable to retrieve your location. Please enter manually.');
                        getLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Current Location';
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser. Please enter manually.');
            }
        });
        
        const wastePhotoInput = document.getElementById('waste-photo');
        const photoPreview = document.getElementById('photo-preview');
        
        wastePhotoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        const wasteReportForm = document.getElementById('waste-report-form');
        
        wasteReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            createConfetti();
            
            setTimeout(() => {
                alert('Thank you for your report! We will review it and take appropriate action.');
                this.reset();
                photoPreview.innerHTML = '';
            }, 1000);
        });
        
        function createConfetti() {
            const colors = ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }
        
        const scrollProgress = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });
        
        const backToTopBtn = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        const navbar = document.querySelector('.main-nav');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        const particlesContainer = document.getElementById('particles');
        
        function createParticles() {
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 10 + 5;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 10 + 10;
                const opacity = Math.random() * 0.5 + 0.1;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.opacity = opacity;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        createParticles();
        
        const animateOnScroll = () => {
            const observerOptions = {
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('section-content')) {
                            entry.target.classList.add('animated');
                        }
                        
                        if (entry.target.classList.contains('step')) {
                            entry.target.classList.add('animated');
                        }
                        
                        if (entry.target.classList.contains('example-item')) {
                            entry.target.classList.add('animated');
                        }
                        
                        if (entry.target.classList.contains('showcase-item')) {
                            entry.target.classList.add('animated');
                        }
                        
                        if (entry.target.classList.contains('footer-section')) {
                            entry.target.classList.add('animated');
                        }
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.section-content').forEach(el => observer.observe(el));
            document.querySelectorAll('.step').forEach(el => observer.observe(el));
            document.querySelectorAll('.example-item').forEach(el => observer.observe(el));
            document.querySelectorAll('.showcase-item').forEach(el => observer.observe(el));
            document.querySelectorAll('.footer-section').forEach(el => observer.observe(el));
        };
        
        window.addEventListener('load', () => {
            animateOnScroll();
            
            document.querySelector('.hero-content').style.animation = 'fadeInUp 1s ease-out forwards';
            
            document.querySelectorAll('.section-content')[0].classList.add('animated');
        });
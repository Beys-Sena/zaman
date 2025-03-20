// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Zaman makinesi animasyonu
    animateTimeMachine();
    
    // Dönem kartları etkileşimi
    setupPeriodCards();
    
    // Form gönderim kontrolü
    setupYearSelectionForm();
    
    // Responsive menü
    setupResponsiveMenu();
    
    // Sayfa kaydırma animasyonu
    setupSmoothScroll();
    
    // Popüler dönemler için rastgele bilgiler gösterme
    displayRandomFacts();
});

// Zaman makinesi animasyonu
function animateTimeMachine() {
    const timeMachine = document.querySelector('.time-machine');
    if (!timeMachine) return;
    
    // Hover efekti için event listener
    timeMachine.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(10deg)';
        this.style.transition = 'transform 0.5s ease';
    });
    
    timeMachine.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    // Saat İbrelerinin Hareketi
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    
    if (hourHand && minuteHand) {
        // Rastgele yönlerde dönüş
        setInterval(() => {
            const randomDegree = Math.floor(Math.random() * 360);
            hourHand.style.transform = `rotate(${randomDegree}deg)`;
            
            setTimeout(() => {
                const randomDegree2 = Math.floor(Math.random() * 360);
                minuteHand.style.transform = `rotate(${randomDegree2}deg)`;
            }, 500);
        }, 3000);
    }
}

// Dönem kartları için etkileşim
function setupPeriodCards() {
    const periodCards = document.querySelectorAll('.period-card');
    
    periodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Kart tıklaması
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const link = this.querySelector('a').getAttribute('href');
            
            if (link !== '#') {
                window.location.href = link;
            } else {
                alert(`Bu özellik çok yakında: ${title}`);
            }
        });
    });
}

// Yıl seçim formu
function setupYearSelectionForm() {
    const selectionForm = document.querySelector('.selection-form');
    
    if (selectionForm) {
        selectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const yearSelect = document.getElementById('year');
            const categorySelect = document.getElementById('category');
            
            if (yearSelect.value === '' || categorySelect.value === '') {
                alert('Lütfen bir yıl ve kategori seçin!');
                return;
            }
            
            // Form verilerini alıp başka sayfaya yönlendirme
            const yearValue = yearSelect.value;
            const categoryValue = categorySelect.value;
            
            // Burada normalde yönlendirme olurdu, şimdilik alert gösterelim
            alert(`Zaman yolculuğunuz planlandı!\nDönem: ${yearSelect.options[yearSelect.selectedIndex].text}\nKategori: ${categorySelect.options[categorySelect.selectedIndex].text}`);
            
            // Alternatif olarak şöyle bir yönlendirme yapılabilir:
            // window.location.href = `donem.html?year=${yearValue}&category=${categoryValue}`;
        });
    }
}

// Responsive menü
function setupResponsiveMenu() {
    // Mobil menü için gerekli HTML eklemesi (şu anda HTML'de yok, eklenebilir)
    const header = document.querySelector('header');
    
    if (header && window.innerWidth <= 768) {
        // Eğer mobil menü butonu yoksa ekleyelim
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            header.insertBefore(mobileMenuBtn, header.firstChild);
            
            const nav = document.querySelector('nav');
            nav.style.display = 'none'; // Başlangıçta gizli
            
            mobileMenuBtn.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                    nav.style.animation = 'fadeIn 0.3s ease forwards';
                } else {
                    nav.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        nav.style.display = 'none';
                    }, 300);
                }
            });
            
            // Animasyon için CSS ekleyelim
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-10px); }
                }
                .mobile-menu-btn {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Sayfa içi kaydırma
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA butonu için özel kaydırma
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const eraSelection = document.querySelector('.era-selection');
            if (eraSelection) {
                window.scrollTo({
                    top: eraSelection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Rastgele dönem bilgileri gösterme
function displayRandomFacts() {
    // Dönem kartları için ekstra bilgiler
    const periodFacts = {
        'Rönesans': [
            'Leonardo da Vinci\'nin "Mona Lisa" tablosu 1503-1519 yıllarında yapılmıştır.',
            'Michelangelo\'nun Sistine Şapeli tavan resmi 4 yılda tamamlanmıştır.',
            'Gutenberg matbaası 1450\'lerde icat edilmiştir.'
        ],
        '1920\'ler': [
            'Caz müziği 1920\'lerde "Roaring Twenties" dönemiyle popülerlik kazandı.',
            'Charleston dansı bu dönemin en popüler dans stiliydi.',
            'Art Deco sanat akımı bu dönemde doğmuştur.'
        ],
        '60\'lar': [
            'Beatles grubu 1960\'larda müzik dünyasını değiştirdi.',
            'Woodstock Festivali 1969\'da gerçekleşti.',
            'Op Art akımı bu dönemde popülerdi.'
        ],
        'Antik Yunan': [
            'Parthenon tapınağı MÖ 447-432 yıllarında inşa edilmiştir.',
            'İlk olimpiyat oyunları MÖ 776\'da düzenlenmiştir.',
            'Sokrates, Platon ve Aristo bu dönemin önemli filozoflarıydı.'
        ]
    };

    // Rastgele bilgileri göstermek için HTML ekleyelim
    const periodCards = document.querySelectorAll('.period-card');
    
    periodCards.forEach(card => {
        const title = card.querySelector('h4').textContent.split(' ')[0]; // İlk kelimeyi al
        
        if (periodFacts[title]) {
            // Tooltip ekleyelim
            const factIndex = Math.floor(Math.random() * periodFacts[title].length);
            const randomFact = periodFacts[title][factIndex];
            
            card.setAttribute('title', randomFact);
            
            // Bilgi ikonu ekleyelim
            const infoIcon = document.createElement('span');
            infoIcon.innerHTML = ' <i class="fas fa-info-circle"></i>';
            infoIcon.style.color = 'var(--primary-color)';
            infoIcon.style.cursor = 'pointer';
            
            card.querySelector('h4').appendChild(infoIcon);
            
            // Bilgi ikonuna tıklanınca
            infoIcon.addEventListener('click', function(e) {
                e.stopPropagation(); // Kart tıklaması tetiklenmesin
                
                // Rastgele yeni bir bilgi seçelim
                const newFactIndex = Math.floor(Math.random() * periodFacts[title].length);
                const newFact = periodFacts[title][newFactIndex];
                
                // Bilgi baloncuğu gösterelim
                showFactPopup(newFact, e.pageX, e.pageY);
            });
        }
    });
}

// Bilgi baloncuğu gösterme
function showFactPopup(fact, x, y) {
    // Varsa eski popup'ı kaldır
    const oldPopup = document.querySelector('.fact-popup');
    if (oldPopup) {
        oldPopup.remove();
    }
    
    // Yeni popup oluştur
    const popup = document.createElement('div');
    popup.className = 'fact-popup';
    popup.textContent = fact;
    
    // Stil ekle
    popup.style.position = 'absolute';
    popup.style.left = `${x}px`;
    popup.style.top = `${y - 80}px`;
    popup.style.background = 'white';
    popup.style.color = 'var(--dark-color)';
    popup.style.padding = '10px 15px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    popup.style.zIndex = '1000';
    popup.style.maxWidth = '250px';
    popup.style.animation = 'fadeIn 0.3s ease forwards';
    
    document.body.appendChild(popup);
    
    // 5 saniye sonra kapat
    setTimeout(() => {
        popup.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 5000);
    
    // Dışarı tıklandığında kapat
    document.addEventListener('click', function closePopup() {
        popup.remove();
        document.removeEventListener('click', closePopup);
    });
}

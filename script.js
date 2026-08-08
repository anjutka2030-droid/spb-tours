const MY_VK_LINK = "https://vk.me/club223133955"; 
const MY_MAX_LINK = "https://max.ru/u/f9LHodD0cOLDDAJK2ok8j8zggjrjuSi2a-rssd0Wd91-_QhO4SmZ6cPgoDU"; 
const MY_TG_LINK = "https://t.me/iva1n_f"; 
const MY_WA_LINK = "https://wa.me/qr/NNOEXECQMIRKC1"; 
let currentCategory = 'all'; 

function renderCatalog(filterCategory = 'all', searchQuery = '') { 
    const catalogContainer = document.getElementById('catalog'); 
    if (!catalogContainer) return; 
    catalogContainer.innerHTML = ""; 
    const query = searchQuery.toLowerCase().trim(); 
    excursions.forEach(tour => { 
        if (filterCategory !== 'all' && !tour.category.includes(filterCategory)) return; 
        if (query !== '') { 
            const matchTitle = tour.title.toLowerCase().includes(query); 
            const matchTrigger = tour.trigger.toLowerCase().includes(query); 
            if (!matchTitle && !matchTrigger) return; 
        } 
        const oldPriceHtml = (tour.priceOld && tour.priceOld !== tour.priceNew) ? `<div class="price-old">${tour.priceOld} ₽</div>` : ''; 
        const detailsHtml = (tour.priceLgt || tour.priceChd) ? `<div class="price-details">${tour.priceLgt ? `<span>Льг: ${tour.priceLgt} ₽</span>` : '<span></span>'}${tour.priceChd ? `<span>Дет: ${tour.priceChd} ₽</span>` : ''}</div>` : ''; 
        catalogContainer.innerHTML += `<div class="card" onclick="openModal(${tour.id})" style="cursor: pointer;"><img src="${tour.image}" alt="${tour.title}" class="card-img"><div class="card-content"><div class="card-title">${tour.title}</div><div class="card-trigger">${tour.trigger}</div><div class="price-container"><div style="font-size:10px; color:#1e3246; font-weight:600; margin-bottom:4px; padding-bottom:4px; border-bottom:1px dashed #e1eff7;">🕒 ${tour.schedule}</div>${oldPriceHtml}<div class="price-highlight">${tour.priceNew} ₽</div>${detailsHtml}</div><div class="card-buttons"><span class="btn-book">Подробнее</span></div></div></div>`; 
    }); 
}

function handleSearch() { renderCatalog(currentCategory, document.getElementById('search-input').value); } 
function filterCatalog(category) { currentCategory = category; renderCatalog(currentCategory, document.getElementById('search-input').value); const buttons = document.querySelectorAll('.btn-filter'); buttons.forEach(btn => { btn.classList.remove('active'); if (btn.getAttribute('onclick').includes(`'${category}'`)) btn.classList.add('active'); }); } 
function toggleMenu() { document.getElementById('sideMenu').classList.toggle('active'); document.getElementById('menuOverlay').classList.toggle('active'); } 
function toggleAccordion(element) { const item = element.parentElement; const isActive = item.classList.contains('active'); document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active')); if (!isActive) item.classList.add('active'); } 

function shareTour(id) { 
    const shareUrl = window.location.origin + window.location.pathname + '?tour=' + id; 
    navigator.clipboard.writeText(shareUrl).then(() => { 
        const shareBtn = document.getElementById('share-btn'); 
        if (shareBtn) { 
            shareBtn.innerText = "✅ Ссылка скопирована!"; shareBtn.style.backgroundColor = "#25d366"; shareBtn.style.color = "#ffffff"; 
            setTimeout(() => { shareBtn.innerText = "🔗 Поделиться ссылкой"; shareBtn.style.backgroundColor = "transparent"; shareBtn.style.color = "#5897ad"; }, 2000); 
        } 
    }).catch(err => { alert("Не удалось скопировать ссылку, скопируйте её из адресной строки."); }); 
}

function openModal(id) { 
    const tour = excursions.find(t => t.id === id); 
    if (!tour) return; 
    const modalContent = document.getElementById('modal-content'); 
    const message = encodeURIComponent("Здравствуйте! Хочу записаться на экскурсию: " + tour.title); 
    
    // Блок цен: сначала идет цена для подписчиков, а под ней сразу льготный и детский тарифы
    const pricesBlockHtml = `
        <div style="margin-top:15px; padding:12px; background:#f4f9fc; border-radius:8px;">
            <div style="font-size:15px; font-weight:bold; color:#ff6f00; margin-bottom:4px;">Цена для подписчиков: ${tour.priceNew} ₽</div>
            ${(tour.priceLgt || tour.priceChd) ? `
                <div style="font-size:12px; color:#1e3246; display:flex; gap:15px; border-top:1px dashed #e1eff7; padding-top:4px; margin-top:4px;">
                    ${tour.priceLgt ? `<span>Льг: ${tour.priceLgt} ₽</span>` : ''}
                    ${tour.priceChd ? `<span>Дет: ${tour.priceChd} ₽</span>` : ''}
                </div>` : ''}
        </div>`;
        
    modalContent.innerHTML = `<h2 style="font-size:18px; color:#1e3246; font-weight:bold;">${tour.title}</h2><div style="font-size:13px; color:#3a768c; font-weight:bold; margin-top:4px;">${tour.trigger}</div><img src="${tour.image}" alt="${tour.title}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-top:10px; display:block;"><div style="font-size:13px; color:#1e3246; background:#f4f9fc; padding:8px; border-radius:6px; margin-top:10px; font-weight:600;">📅 Расписание: ${tour.schedule}</div><div class="modal-desc-text" style="color: #1e3246 !important; white-space: pre-wrap; margin-top: 15px; font-size: 13px; line-height: 1.5;">${tour.description}</div>${pricesBlockHtml}<div style="margin-top:20px; padding-top:15px; border-top:1px solid #e1eff7;"><div style="font-size:13px; color:#1e3246; font-weight:600; margin-bottom:14px; line-height:1.4;">Для обсуждения и заказа экскурсии напишите мне в удобном мессенджере:</div><div class="modal-booking-grid"><a href="${MY_MAX_LINK}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none; text-align:center; padding:10px; text-decoration:none; display:inline-block; border-radius:6px;">MAX</a><a href="${MY_TG_LINK}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none; text-align:center; padding:10px; text-decoration:none; display:inline-block; border-radius:6px;">Telegram</a><a href="https://wa.me?phone=79674331077&text=${message}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none; text-align:center; padding:10px; text-decoration:none; display:inline-block; border-radius:6px;">WhatsApp</a>
<a href="${MY_VK_LINK}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none; text-align:center; padding:10px; text-decoration:none; display:inline-block; border-radius:6px;">ВКонтакте</a></div></div><button id="share-btn" onclick="shareTour(${tour.id})" style="margin: 15px auto 0 auto; background: transparent; border: 1px solid #5897ad; color: #5897ad; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; cursor: pointer; display: block; width: 100%; transition: all 0.2s ease;">Поделиться ссылкой 🔗</button><button onclick="closeModal()" style="width:100%; margin-top:15px; background: transparent; border:1.5px solid #5897ad; color:#5897ad; padding:12px; border-radius:8px; font-weight:bold; font-size:13px; cursor:pointer; transition: all 0.2s ease;">Назад к каталогу</button>`; 
    document.getElementById('modal').classList.add('active'); 
} 

function closeModal() { document.getElementById('modal').classList.remove('active'); window.history.replaceState({}, document.title, window.location.pathname); } 
window.addEventListener('click', function(event) { if (event.target === document.getElementById('modal')) closeModal(); }); 
window.onload = function() { renderCatalog(); const urlParams = new URLSearchParams(window.location.search); const tourId = urlParams.get('tour'); if (tourId) { setTimeout(() => { openModal(parseInt(tourId)); }, 300); } };

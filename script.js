// ==========================================================================
// ССЫЛКИ НА ВАШИ МЕССЕНДЖЕРЫ И СОЦСЕТИ
// ==========================================================================
const MY_VK_LINK = "https://vk.me/club223133955"; 
const MY_MAX_LINK = "https://max.ru/u/f9LHodD0cOLDDAJK2ok8j8zggjrjuSi2a-rssd0Wd91-_QhO4SmZ6cPgoDU";
const MY_TG_LINK = "https://t.me/iva1n_f";
const MY_WA_NUMBER = "https://wa.me/qr/NNOEXECQMIRKC17";

let currentCategory = 'all';

// ==========================================================================
// ФУНКЦИЯ ОТРИСОВКИ КАРТОЧЕК В КАТАЛОГЕ
// ==========================================================================
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

        catalogContainer.innerHTML += `
            <div class="card" onclick="openModal(${tour.id})" style="cursor: pointer;">
                <img src="${tour.image}" alt="${tour.title}" class="card-img">
                <div class="card-content">
                    <div class="card-title">${tour.title}</div>
                    <div class="card-trigger">${tour.trigger}</div>
                    <div class="price-container">
                        <div style="font-size:10px; color:#1e3246; font-weight:600; margin-bottom:4px; padding-bottom:4px; border-bottom:1px dashed #e1eff7;">🕒 ${tour.schedule}</div>
                        ${oldPriceHtml}
                        <div class="price-highlight">${tour.priceNew} ₽</div>
                        ${detailsHtml}
                    </div>
                    <div class="card-buttons">
                        <span class="btn-book">Подробнее</span>
                    </div>
                </div>
            </div>`;
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    renderCatalog(currentCategory, searchInput.value);
}

function filterCatalog(category) {
    currentCategory = category;
    const searchInput = document.getElementById('search-input');
    renderCatalog(currentCategory, searchInput.value);
    
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        }
    });
}

// ==========================================================================
// УПРАВЛЕНИЕ БУРГЕР-МЕНЮ И ГАРМОШКОЙ
// ==========================================================================
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    sideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

function toggleAccordion(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');
    
    // Закрываем другие вкладки при открытии новой
    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
    
    if (!isActive) {
        item.classList.add('active');
    }
}

// ==========================================================================
// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ЭКСКУРСИИ
// ==========================================================================
function openModal(id) {
    const tour = excursions.find(t => t.id === id);
    if (!tour) return;
    const modalContent = document.getElementById('modal-content');
    
    const message = encodeURIComponent("Здравствуйте! Хочу записаться на экскурсию: " + tour.title);
    const modalDetailsHtml = (tour.priceLgt || tour.priceChd) ? `<div style="font-size:12px; color:#1e3246; margin-top:8px; display:flex; gap:15px;">${tour.priceLgt ? `<span>Льг: ${tour.priceLgt} ₽</span>` : ''}${tour.priceChd ? `<span>Дет: ${tour.priceChd} ₽</span>` : ''}</div>` : '';
    
    modalContent.innerHTML = `
        <h2 style="font-size:18px; color:#1e3246; font-weight:bold;">${tour.title}</h2>
        <div style="font-size:13px; color:#3a768c; font-weight:bold; margin-top:4px;">${tour.trigger}</div>
        <img src="${tour.image}" alt="${tour.title}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-top:10px; display:block;">
        <div style="font-size:13px; color:#1e3246; background:#f4f9fc; padding:8px; border-radius:6px; margin-top:10px; font-weight:600;">📅 Расписание: ${tour.schedule}</div>
        <div class="modal-desc-text" style="color: #1e3246 !important;">${tour.description}</div>
        ${modalDetailsHtml}
        
        <div style="margin-top:20px; padding-top:15px; border-top:1px solid #e1eff7;">
            <div style="font-size:15px; font-weight:bold; color:#ff6f00; margin-bottom:6px;">Цена для подписчиков: ${tour.priceNew} ₽</div>
            <div style="font-size:13px; color:#1e3246; font-weight:600; margin-bottom:14px; line-height:1.4;">Для бронирования экскурсии напишите мне в удобном для вас мессенджере:</div>
            
            <div class="modal-booking-grid">
                <a href="${MY_MAX_LINK}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none;">MAX</a>
                <a href="${MY_TG_LINK}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none;">Telegram</a>
                <a href="https://wa.me{MY_WA_NUMBER}?text=${message}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none;">WhatsApp</a>
                <a href="${MY_VK_LINK}?ref_source=${message}" target="_blank" class="m-grid-btn" style="background-color: #5897ad; color: #ffffff !important; border: none;">ВКонтакте</a>
            </div>
        </div>
        <button onclick="closeModal()" style="width:100%; margin-top:15px; background: transparent; border:1.5px solid #5897ad; color:#5897ad; padding:12px; border-radius:8px; font-weight:bold; font-size:13px; cursor:pointer; transition: all 0.2s ease;">Назад к каталогу</button>`;
    
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) closeModal();
});

window.onload = function() {
    renderCatalog();
};

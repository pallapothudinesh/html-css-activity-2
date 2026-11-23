/**
 * Zenith Ultra Smartwatch - Interactive Client Script
 * Topic: Group 2, #10 - Technology Product Website (Activity 2)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const editionRadios = document.querySelectorAll('input[name="editionRadio"]');
  const radioCards = document.querySelectorAll('.radio-card');
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const selectedColorName = document.getElementById('selectedColorName');
  const summaryModel = document.getElementById('summaryModel');
  const summaryColor = document.getElementById('summaryColor');
  const summaryPrice = document.getElementById('summaryPrice');
  const orderForm = document.getElementById('orderForm');
  const orderConfirmation = document.getElementById('orderConfirmation');
  const selectEditionBtns = document.querySelectorAll('.select-edition-btn');

  // --- 1. Mobile Menu Toggle ---
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // --- 2. Edition Radio Selection in Customizer ---
  editionRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      radioCards.forEach(c => c.classList.remove('active'));
      const parentCard = radio.closest('.radio-card');
      if (parentCard) parentCard.classList.add('active');

      const val = radio.value;
      const cost = radio.getAttribute('data-cost');

      summaryModel.textContent = `Zenith ${val}`;
      summaryPrice.textContent = `$${cost} USD`;
    });
  });

  // --- 3. "Select Model" Buttons from Pricing Table ---
  selectEditionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const model = btn.getAttribute('data-model');
      const price = btn.getAttribute('data-price');

      // Find matching radio in form
      editionRadios.forEach(radio => {
        if (radio.value === model || (model === 'Sport' && radio.value === 'Sport')) {
          radio.checked = true;
          radioCards.forEach(c => c.classList.remove('active'));
          radio.closest('.radio-card')?.classList.add('active');
        }
      });

      summaryModel.textContent = `Zenith ${model}`;
      summaryPrice.textContent = `$${price} USD`;
    });
  });

  // --- 4. Color Swatch Selector ---
  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.getAttribute('data-color');
      selectedColorName.textContent = color;
      summaryColor.textContent = color;
    });
  });

  // --- 5. Order Form Submission ---
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const custName = document.getElementById('custName')?.value || 'Valued Customer';
      
      if (orderConfirmation) {
        orderConfirmation.classList.remove('hidden');
        orderConfirmation.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <strong>Pre-Order Confirmed for ${escapeHtml(custName)}!</strong>
            <p>Your ${summaryModel.textContent} (${summaryColor.textContent}) has been reserved. Tracking information will be emailed shortly.</p>
          </div>
        `;
        orderConfirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      orderForm.reset();
    });
  }

  // --- 6. Scroll Active Nav Link ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
});

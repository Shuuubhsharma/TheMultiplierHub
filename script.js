// CUSTOMIZE: Replace these EmailJS values with your own account settings.
const EMAILJS_PUBLIC_KEY = "B4OhUZPZYQPznAc0G";
const EMAILJS_SERVICE_ID = "6nosgxa";
const EMAILJS_TEMPLATE_ID = "jkhvtfl";

function hasPlaceholderConfig() {
  return (
    !EMAILJS_PUBLIC_KEY === "B4OhUZPZYQPznAc0G"||
    EMAILJS_PUBLIC_KEY === "B4OhUZPZYQPznAc0G" ||
    !EMAILJS_SERVICE_ID === "service_6nosgxa" ||
    !EMAILJS_TEMPLATE_ID === "template_jkhvtfl"
  );
}

function showFormMessage(message, tone) {
  formMessage.textContent = message;
  formMessage.classList.remove('hidden');
  formMessage.classList.remove(
    'border-emerald-500/70',
    'bg-emerald-500/15',
    'border-rose-500/70',
    'bg-rose-500/10'
  );

  if (tone === 'success') {
    formMessage.classList.add('border-emerald-500/70', 'bg-emerald-500/15');
    return;
  }

  formMessage.classList.add('border-rose-500/70', 'bg-rose-500/10');
}

const form = document.getElementById('lead-form');
const formMessage = document.getElementById('form-message');

if (window.emailjs && !hasPlaceholderConfig()) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  formMessage.classList.add('hidden');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const templateParams = {
    fullName: form.fullName.value.trim(),
    mobile: form.mobile.value.trim(),
    whatsapp: form.whatsapp.checked ? 'Yes' : 'No',
    email: form.email.value.trim(),
    location: form.location.value.trim(),
    requirement: form.requirement.value.trim(),
  };

  // ACTION: EMAIL_FORM_SETUP
  if (!window.emailjs) {
    showFormMessage('Email service failed to load. Please reload the page and try again.', 'error');
    return;
  }

  if (hasPlaceholderConfig()) {
    showFormMessage('Form setup is incomplete. Add your EmailJS public key in script.js before using this form.', 'error');
    return;
  }

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function () {
      showFormMessage('Thank you! Our team will call you within 24 hours with personalized offer.', 'success');
      form.reset();
    })
    .catch(function (error) {
      showFormMessage('Unable to send your request right now. Please check your EmailJS settings or try again later.', 'error');
      console.error('EmailJS submission error:', error);
    });
});

// Simple slideshow for service photos and video
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const indicators = Array.from(document.querySelectorAll('.slide-indicator'));
  const prevButton = document.getElementById('slide-prev');
  const nextButton = document.getElementById('slide-next');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('hidden', slideIndex !== index);
    });
    indicators.forEach((indicator, indicatorIndex) => {
      indicator.classList.toggle('bg-amber-500/90', indicatorIndex === index);
      indicator.classList.toggle('bg-amber-500/20', indicatorIndex !== index);
    });
    currentIndex = index;
  }

  prevButton.addEventListener('click', () => {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  });

  nextButton.addEventListener('click', () => {
    showSlide((currentIndex + 1) % slides.length);
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const index = Number(indicator.dataset.index);
      showSlide(index);
    });
  });

  showSlide(0);
})();

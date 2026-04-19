/* Initialize EmailJS with your user ID */
(function () { 
  // Replace this with your EmailJS user ID from https://www.emailjs.com/admin
  emailjs.init("B4OhUZPZYQPznAc0G");
})();

const form = document.getElementById('lead-form');
const serviceError = document.getElementById('service-error');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  serviceError.classList.add('hidden');
  formMessage.classList.add('hidden');

  const selectedServices = Array.from(form.querySelectorAll('input[name="services"]'))
    .filter((input) => input.checked)
    .map((input) => input.value);

  if (selectedServices.length === 0) {
    serviceError.classList.remove('hidden');
    serviceError.textContent = 'Select at least one service to proceed.';
    return;
  }

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
    profession: form.profession.value,
    services: selectedServices.join(', '),
    requirement: form.requirement.value.trim(),
    callTime: form.callTime.value,
    budget: form.budget.value.trim(),
    challenge: form.challenge.value.trim(),
  };

  const serviceId = "service_v3r5ndm";
  const templateId = "template_jkhvtfl";

  emailjs.send(serviceId, templateId, templateParams)
    .then(function () {
      formMessage.textContent = 'Thank you! Our team will call you within 24 hours with personalized offer.';
      formMessage.classList.remove('hidden');
      formMessage.classList.add('border-emerald-500/70', 'bg-emerald-500/15');
      form.reset();
    })
    .catch(function (error) {
      formMessage.textContent = 'Unable to send your request right now. Please check your EmailJS settings or try again later.';
      formMessage.classList.remove('hidden');
      formMessage.classList.add('border-rose-500/70', 'bg-rose-500/10');
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

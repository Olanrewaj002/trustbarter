//Display images logic
document.querySelectorAll('[data-product]').forEach(card => {
    const thumbs = Array.from(card.querySelectorAll('.thumb'));
    const imageDisplay = card.querySelector('.image-display');
    const images = thumbs.map(thumb => thumb.src);
    let index = 0;

    const updateImage = i => {
      imageDisplay.src = images[i];
      index = i;
    };

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => updateImage(i));
    });

    card.querySelector('.prev-btn').addEventListener('click', () => {
      updateImage((index - 1 + images.length) % images.length);
    });

    card.querySelector('.next-btn').addEventListener('click', () => {
      updateImage((index + 1) % images.length);
    });
  });

  
  // Contact seller logic
  document.querySelectorAll('.contactSellerBtn').forEach((button) => {
    // Find the closest card containing the button
    const card = button.closest('.bg-white, .bg-white\\/60'); // Escaped slash for querySelector
    
    if (!card) return;
  
    const contactInfo = card.querySelector('.contactInfo');
    const copyButton = card.querySelector('.copyContact');
    const sellerInfo = card.querySelector('.sellerInfo');
  
    // Toggle contact info on button click
    button.addEventListener('click', () => {
      if (contactInfo) {
        contactInfo.classList.toggle('hidden');
      }
    });
  
    // Copy contact number to clipboard
    if (copyButton && sellerInfo) {
      copyButton.addEventListener('click', () => {
        const contactNumber = sellerInfo.textContent.trim();
  
        navigator.clipboard.writeText(contactNumber).then(() => {
          alert('Contact number copied!');
        }).catch((err) => {
          console.error('Failed to copy: ', err);
        });
      });
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            
        });
    });
    
    
    const illustration = document.querySelector('.illustration img');
    if (illustration) {
        illustration.style.opacity = '0';
        illustration.style.transform = 'translateX(20px)';
        illustration.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            illustration.style.opacity = '1';
            illustration.style.transform = 'translateX(0)';
        }, 300);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const diamondText = document.querySelector('.diamond-shine');
    
    
    function createSparkle() {
      const sparkle = document.createElement('span');
      sparkle.classList.add('sparkle');
      
      
      const textRect = diamondText.getBoundingClientRect();
      const x = Math.random() * textRect.width;
      const y = Math.random() * textRect.height;
      
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      
      diamondText.appendChild(sparkle);
      
      
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
    
    
    setInterval(createSparkle, 300);
  });


  document.querySelector('.glowing-btn').addEventListener('mouseenter', function() {
    this.style.boxShadow = "0 0 20px #00f2ff, 0 0 50px #00f2ff";
});

document.querySelector('.glowing-btn').addEventListener('mouseleave', function() {
    this.style.boxShadow = "none";
});

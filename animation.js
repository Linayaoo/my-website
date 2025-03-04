// Skills animations
function initSkillsAnimation() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    // Apply animation to skill boxes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation with delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // 100ms delay between each skill box
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBoxes.forEach(box => {
        box.classList.add('scale-in');
        observer.observe(box);
    });
}

// Add this to your initAnimations function
function initAnimations() {
    // Existing animation code...
    
    // Initialize skills animations
    initSkillsAnimation();
}

// Timeline animations function
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation with delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200); // 200ms delay between each timeline item
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add this to your existing initAnimations function
function initAnimations() {
    // Existing animation code...
    
    // Initialize timeline animations
    initTimelineAnimations();
}
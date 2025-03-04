document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initializePortfolio();
});

function initializePortfolio() {
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close mobile menu when clicking a menu item
    document.querySelectorAll('.menu a').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Highlight active menu item on scroll
    updateActiveMenuOnScroll();

    // Initialize projects
    loadProjects();

    // Initialize project filtering
    initProjectFilters();

    // Initialize animations
    initAnimations();

    // Initialize stat counters
    initStatCounters();

    // Initialize form handling
    initContactForm();
}

// Populate projects from data
function loadProjects() {
    // Sample project data
    const projects = [
        {
            id: 1,
            title: "POS System",
            description: "POS system for processing sales, managing inventory, and tracking transactions with real-time analytics.",
            image: "images/POS.png",
            tags: ["C#", "MS SQL", ".NET Core",],
        },
        {
            id: 2,
            title: "MUF Website",
            description: "Pharmaceutical website to provide medication information, online pharmacy services, and healthcare resources for patients and professionals.",
            image: "",
            tags: ["WordPress", "Hostinger"],
            webLink: "https://medicaunofarma.com/",
        },
        {
            id: 3,
            title: "Aerovest",
            description: "AeroVest is an innovative wearable technology designed to monitor heat stress and provide automated cooling for individuals working in high-temperature environments. It integrates real-time physiological and environmental data monitoring with an automatic fan system to help prevent heat-related illnesses.",
            image: "",
            tags: ["C++", "C#"],
            demoLink: "#",
            codeLink: "#"
        },
        {
            id: 4,
            title: "Smart Plant Watering System",
            description: "Smart plant watering system with Bluetooth control and Arduino, automating irrigation based on soil moisture levels.",
            image: "",
            tags: ["C++", "MIT App Invertor", "C#"],
            demoLink: "#",
            codeLink: "#"
        },
        {
            id: 5,
            title: "Bluetooth Remote Controlled Car",
            description: "Bluetooth remote-controlled car with Arduino for wireless navigation, speed control, and real-time maneuvering.",
            image: "",
            tags: ["C++",],
            demoLink: "#",
            codeLink: "#"
        },
        {
            id: 6,
            title: "I-Library management system",
            description: "The Self-Service School Library Management System is a modern library solution designed to streamline book borrowing, returning, and inventory management. Utilizing RFID technology, GSM modules, and a centralized database, the system enhances efficiency, reduces administrative workload, and improves user experience for National University students and staff.",
            image: "",
            tags: ["C++", "C#", "MS SQL"],
            demoLink: "#",
            codeLink: "#"
        },

        {
            id: 7,
            title: "Trash Segregator",
            description: "Mobile app connecting local restaurants with hungry customers.",
            image: "",
            tags: ["C++",],
            demoLink: "#",
            codeLink: "#"
        }
    ];

    // Get projects container and template
    const projectsGrid = document.querySelector('.projects-grid');
    const template = document.getElementById('project-template');

    // Initially show only 3 projects
    displayProjects(projects.slice(0, 3), projectsGrid, template);

    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        const currentCount = projectsGrid.children.length;
        const nextProjects = projects.slice(currentCount, currentCount + 3);
        
        if (nextProjects.length > 0) {
            displayProjects(nextProjects, projectsGrid, template);
        }
        
        // Hide button if all projects are displayed
        if (currentCount + nextProjects.length >= projects.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

function displayProjects(projects, container, template) {
    projects.forEach(project => {
        // Clone the template
        const projectCard = document.importNode(template.content, true);
        
        // Fill in the project data
        projectCard.querySelector('.project-title').textContent = project.title;
        projectCard.querySelector('.project-description').textContent = project.description;
        
        // Add tags
        const tagsContainer = projectCard.querySelector('.project-tags');
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'project-tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
        
        // Set links
        projectCard.querySelector('.demo').href = project.demoLink;
        projectCard.querySelector('.code').href = project.codeLink;
        
        // Add the card to the container with animation classes
        const card = projectCard.querySelector('.project-card');
        card.classList.add('scale-in');
        card.dataset.category = project.tags.join(' ');
        
        container.appendChild(projectCard);
        
        // Trigger animation after a brief delay
        setTimeout(() => {
            card.classList.add('active');
        }, 100);
    });
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 100);
                } else {
                    card.classList.remove('active');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function updateActiveMenuOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function initAnimations() {
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent');
                entry.target.style.setProperty('--percent', percent + '%');
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Add animation to navigation when scrolling
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });
}

function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                const increment = Math.ceil(count / 50);
                const duration = 2000; // 2 seconds
                const interval = duration / (count / increment);
                
                const counter = setInterval(() => {
                    current += increment;
                    
                    if (current >= count) {
                        target.textContent = count;
                        clearInterval(counter);
                    } else {
                        target.textContent = current;
                    }
                }, interval);
                
                statObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statObserver.observe(stat);
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.querySelector('.form-status');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#555';
        
        // Get form data
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);
        
        try {
            // Send form data to server
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = '#4CAF50';
                form.reset();
            } else {
                formStatus.textContent = data.message || 'Something went wrong. Please try again.';
                formStatus.style.color = '#f44336';
            }
        } catch (error) {
            formStatus.textContent = 'Could not connect to server. Please try again later.';
            formStatus.style.color = '#f44336';
            console.error('Error submitting form:', error);
        }
    });
}
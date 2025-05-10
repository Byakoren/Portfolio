// Attend que tout le HTML soit chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function () {
    // Sélection de tous les éléments nécessaires dans le DOM
    const sections = document.querySelectorAll('section');                  // Toutes les sections de la page
    const projects = document.querySelectorAll('.project');                 // Tous les projets
    const skills = document.querySelectorAll('.skill');                     // Toutes les compétences
    const certifications = document.querySelectorAll('.certification');     // Toutes les certifications
    const parcours = document.querySelectorAll('.parcours');                // Les sections de parcours
    const typingText = document.getElementById('typing-text');              // L'élément pour l'effet machine à écrire
    const chosenText = document.querySelector('.chosen-text');              // Texte choisi pour animation
    const fingerIcon = document.querySelector('.finger-icon');              // Icône du doigt animée
    const text = "Bienvenue sur le Portfolio de Thomas Gouez !";            // Texte à afficher en machine à écrire
    const sidebar = document.querySelector('.sidebar');                     // La barre de navigation latérale
    const hamburger = document.querySelector('.hamburger');                 // Le bouton hamburger
    let index = 0;                                                          // Compteur pour l'effet machine à écrire
    let typingInterval;                                                     // Variable pour stocker l'intervalle d'animation

    // Fonction pour fermer le menu
    const closeMenu = () => {
        sidebar.classList.remove('open');                                  // Retire la classe 'open' pour masquer la sidebar
    };

    // Ajoute un écouteur d'événement sur chaque lien du menu
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', closeMenu);                        // Ferme le menu lors du clic sur un lien
    });

    // Gestion du bouton hamburger
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');                                 // Alterne l'état du menu (ouvert/fermé)
    });

    // Configuration du défilement doux pour la navigation
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();                                       // Empêche le comportement par défaut du lien
            
            // Extrait l'ID de la section cible du href
            const targetId = this.getAttribute('href').substring(1);      
            const targetSection = document.getElementById(targetId);      // Récupère l'élément cible

            // Animation de défilement doux vers la section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,                        // Position de la section cible
                    behavior: 'smooth'                                   // Animation fluide
                });
            }
        });
    });

    // Gestion des clics en dehors du menu
    document.addEventListener('click', (e) => {
        // Vérifie si le clic est en dehors du menu et du bouton hamburger
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains('open')) {
            closeMenu();                                                                                                 // Ferme le menu
        }
    });

    // Fonction d'animation machine à écrire
    function typeWriter() {
        if (index < text.length) {                                     // Vérifie s'il reste des caractères à écrire
            typingText.innerHTML += text.charAt(index);                // Ajoute le caractère suivant
            index++;                                                   // Incrémente le compteur
            typingInterval = setTimeout(typeWriter, 100);              // Programme le prochain caractère
        } else {
            typingText.classList.add('blink-cursor');                  // Active l'animation du curseur
        }
    }

    // Configuration de l'observateur pour l'effet machine à écrire
    if (typingText) {
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {                           // Si l'élément devient visible
                    typingText.innerHTML = "";                        // Réinitialise le texte
                    typingText.classList.remove('blink-cursor');      // Désactive l'animation du curseur
                    index = 0;                                        // Réinitialise le compteur
                    clearTimeout(typingInterval);                     // Annule l'animation en cours
                    typeWriter();                                     // Démarre une nouvelle animation
                }
            });
        }, {
            threshold: 0.1                                  // Seuil de déclenchement à 10% de visibilité
        });
        textObserver.observe(typingText);                             // Démarre l'observation
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si l'élément n'a pas déjà la classe 'visible', ajoutez-la et marquez comme observé
                if (!entry.target.classList.contains('visible')) {
                    entry.target.classList.add('visible');
                    entry.target.setAttribute('data-observed', 'true'); // Marque comme observé
                }
            } else {
                // Retirez la classe uniquement si elle est observée et visible
                if (entry.target.getAttribute('data-observed') === 'true') {
                    entry.target.classList.remove('visible');
                    entry.target.setAttribute('data-observed', 'false'); // Marque comme non observé
                }
            }
        });
    }, {
        threshold: 0.1 // Ajuste le seuil selon tes préférences
    });
    

    // Application de l'observateur à tous les éléments animés
    sections.forEach(section => observer.observe(section));                         // Observe les sections
    skills.forEach(skill => observer.observe(skill));                               // Observe les compétences
    certifications.forEach(certification => observer.observe(certification));       // Observe les certifications
    projects.forEach(project => observer.observe(project));                         // Observe les projets
    parcours.forEach(parcours => observer.observe(parcours));                       // Observe les éléments du parcours

    // Gestion des effets de survol sur les projets
    projects.forEach(project => {
        project.addEventListener('mouseover', () => project.classList.add('zoom'));         // Active le zoom au survol
        project.addEventListener('mouseout', () => project.classList.remove('zoom'));       // Désactive le zoom à la sortie
    });

    // Configuration des animations conditionnelles
    if (chosenText) {                                                                   // Vérifie si l'élément existe
        chosenText.style.animation = 'move-up-down 2s ease-in-out infinite';            // Animation de rebond
        if (fingerIcon) {                                                               // Vérifie si l'icône existe
            fingerIcon.style.animation = 'move-up-down 2s ease-in-out infinite';        // Applique la même animation
        }
    }
});


// Initialise particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.3,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 600
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 250,
                "size": 0,
                "duration": 2,
                "opacity": 0,
                "speed": 3
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Configure le compteur de particules avec stats.js
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function () {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
};
requestAnimationFrame(update);


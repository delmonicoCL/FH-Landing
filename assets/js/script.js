// Función para agregar desplazamiento suave al hacer clic en los enlaces de la barra de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
// Función para mostrar los párrafos según la sección visible en la pantalla
function mostrarParrafos() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      const bounding = section.getBoundingClientRect();
  
      if (
        bounding.top >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        // La sección está completamente visible en la pantalla
        const parrafos = section.querySelectorAll('p');
        parrafos[0].classList.add('visible');
        
        // Verificar si ya se mostró el segundo párrafo
        if (!section.dataset.secondParaShown) {
          setTimeout(() => {
            parrafos[1].classList.add('visible');
            section.dataset.secondParaShown = true; // Marcar como mostrado
          }, 5000); // 5000 milisegundos = 5 segundos
        }
      } else {
        // La sección no está visible, oculta los párrafos
        const parrafos = section.querySelectorAll('p');
        parrafos.forEach(parrafo => {
          parrafo.classList.remove('visible');
        });
        // Resetear estado de segundo párrafo mostrado al salir de la sección
        section.dataset.secondParaShown = false;
      }
    });
  }
  
  // Llama a la función al cargar la página y al hacer scroll
  window.addEventListener('DOMContentLoaded', mostrarParrafos);
  window.addEventListener('scroll', mostrarParrafos);
  
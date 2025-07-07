document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("success-modal");
  const modalContent = document.getElementById("success-modal-content");
  const closeModal = document.getElementById("close-modal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Extraer datos para Make
    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // Enviar a Formspree
      const formspreeResponse = await fetch("https://formspree.io/f/mkgbaqwp", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      // Enviar también a Make Webhook
      const makeResponse = await fetch("https://hook.eu2.make.com/rghfz4uztbq6xw8gpmj2y58e68tt33uu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (formspreeResponse.ok && makeResponse.ok) {
        form.reset();
        modal.classList.remove("hidden");
        // Activar animación
        setTimeout(() => {
          modalContent.classList.remove("scale-95", "opacity-0");
          modalContent.classList.add("scale-100", "opacity-100");
        }, 10);
      } else {
        alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch (error) {
      alert("Error de red. Verifica tu conexión.");
    }
  });

  closeModal.addEventListener("click", () => {
    modalContent.classList.add("scale-95", "opacity-0");
    modalContent.classList.remove("scale-100", "opacity-100");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  });

  // Animación del título
  const title = document.getElementById("hero-title");
  const split = new SplitType("#hero-title", { types: "chars" });

  title.addEventListener("mouseenter", () => {
    gsap.to(split.chars, {
      color: "#2fffc3",
      stagger: 0.02,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  title.addEventListener("mouseleave", () => {
    gsap.to(split.chars, {
      color: "#ffffff",
      stagger: 0.02,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

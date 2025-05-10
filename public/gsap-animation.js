gsap.registerPlugin(ScrollTrigger);

// gsap for hero text
gsap.from(".h-text", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    scrollTrigger: {
    trigger: "#hero-content",
    start: "top 100%",
    }
});

// gsap for hero img
gsap.from(".hero-img", {
    y: 100,
    opacity: 0,
    duration: 2,
    ease: "power3.out"
});

// gsap for form
gsap.registerPlugin(ScrollTrigger);

gsap.to("#formContainer", {
    scrollTrigger: {
    trigger: "#formContainer",
    start: "top 80%", // when top of the container hits 80% of the viewport
    toggleActions: "play reverse play reverse"
    },
    opacity: 80,
    y: 0,
    duration: 2,
    ease: "power2.out"
}); 

// gsap for services
gsap.from(".services", {
    y: 180,
    opacity: 0,
    duration: 1.6,
    stagger: 0.2,
    scrollTrigger: {
    trigger: "#services",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});

// gsap for information elaboration section
gsap.from(".info-elab-text-1", {
    x: 200,
    opacity: 0,
    duration: 1.6,
    stagger: 0.2,
    scrollTrigger: {
    trigger: ".info-elab-text-1",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});

 // gsap for information elaboration section image
 gsap.from(".info-elab-img-1", {
    x: -200,
    opacity: 0,
    duration: 1.6,
    scrollTrigger: {
    trigger: ".info-elab-img-1",
    //toggleActions: "play reverse play reverse"
    }
});

// gsap for information elaboration section 2
gsap.from(".info-elaboration-container-2", {
    y: 200,
    opacity: 0,
    duration: 1.6,
    stagger: 0.5,
    scrollTrigger: {
    trigger: "#info-elaboration-container-2",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});

// gsap for sellers items
gsap.from("#sellers-items", {
    y: 200,
    opacity: 0,
    duration: 1.6,
    stagger: 0.5,
    scrollTrigger: {
    trigger: "#sellers-items",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});

// gsap for carousel
const track = document.getElementById("carousel-track");
gsap.to(track, {
  x: () => `-=${track.offsetWidth / 2}`, // move by half the total width
  duration: 20,
  ease: "none",
  repeat: -1,
});


// gsap for steps are easy
gsap.from(".step", {
    y: 180,
    opacity: 0,
    duration: 1.6,
    stagger: 0.2,
    scrollTrigger: {
    trigger: ".step",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});

// gsap for about us
gsap.from("#about", {
    y: 180,
    opacity: 0,
    duration: 1.6,
    stagger: 0.2,
    scrollTrigger: {
    trigger: "#about",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});

 // gsap for our business model
 gsap.from("#business-model", {
    y: 200,
    opacity: 0,
    duration: 2,
    stagger: 0.5,
    scrollTrigger: {
    trigger: "#business-model",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     

});

// gsap for core values
gsap.from("#core-values", {
    y: 180,
    opacity: 0,
    duration: 1.6,
    stagger: 0.2,
    scrollTrigger: {
    trigger: "#core-values",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});


 // gsap for form
 gsap.from(".form", {
    y: 180,
    opacity: 0,
    duration: 2,
    //stagger: 0.5,
    scrollTrigger: {
    trigger: ".form",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     

});

 // gsap for footer cta
 gsap.from(".footer-cta", {
    x: 200,
    opacity: 0,
    duration: 2,
    stagger: 0.5,
    scrollTrigger: {
    trigger: ".footer-cta",
    start: "top 100%",
    //toggleActions: "play reverse play reverse"
    }     
});


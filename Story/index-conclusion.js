// index-conclusion.js
// This file is a stripped-down version of index.js for the conclusion page.
// It does NOT contain any logic for redirecting to welcome.html or computer animations.

$(function () {
    var controller = new ScrollMagic.Controller();

    // Only background color transitions and story box animations
    new ScrollMagic.Scene({triggerElement: "#parallax1", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", 1, {backgroundColor: "pink", duration: 1, ease: "none"}))
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax2", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", 1, {backgroundColor: "orange", duration: 1, ease: "none"}))
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax3", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", 1, {backgroundColor: "pink", duration: 1, ease: "none"}))
        .addTo(controller);

    // Animate story boxes
    $(".p").each(function() {
        var tween = gsap.to(this, {
            duration: 1.5,
            y: -50,
            autoAlpha: 1, 
            ease: "power2.out"
        });

        new ScrollMagic.Scene({
            triggerElement: this,     
            triggerHook: 0.9,         
            reverse: true             
        })
        .setTween(tween)              
        .addTo(controller);           
    });
});

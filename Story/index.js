$(function () {
    var controller = new ScrollMagic.Controller();
        // build scenes
    new ScrollMagic.Scene({triggerElement: "#parallax1", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", 1, {backgroundColor: "pink", duration: 1, ease: "none"}))
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax2", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", 1, {backgroundColor: "orange", duration: 1, ease: "none"}))
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax3", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", 1, {backgroundColor: "pink", duration: 1, ease: "none"}))
        .addTo(controller);


    $(function() { 
        var controller = new ScrollMagic.Controller();

        $(".p").each(function() {
            var randomX = (Math.random() - 0.5) * 40;
            
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

    var computerTL = gsap.timeline();
    computerTL
        .set("#screenGlow", {opacity: 1})

        .to("#zapLine", {opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.inOut"})
        .to("#zapLine", {scaleY: 100, opacity: 0, duration: 0.4, ease: "power2.out"})

        .to("#screen", {opacity: 1, duration: 0.2 })
        .to("#screen", {opacity: 0.4, duration: 0.05})
        .to("#screen", { opacity: 1, duration: 0.1 })

        .to("#screenGlow", {opacity: 0, duration: 0.5})

        // Fade in the mc.html iframe inside the screen
        .to("#mc-iframe", {opacity: 1, pointerEvents: "auto", duration: 0.3})
        // Expand iframe to fill viewport
        .to("#mc-iframe", {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            duration: 0.5,
            ease: "power2.inOut"
        })
        // Fade out the computer image, scan lines, etc.
        .to(["#computer", "#scanLines", "#screen", "#screenGlow"], {
            opacity: 0,
            duration: 0.3
        }, "-=0.3");


    new ScrollMagic.Scene({
        triggerElement: "#pinned",
        triggerHook: 0,
        duration: "200%"
    })
    .setPin("#pinned")
    .setTween(computerTL)
    .addTo(controller);
    });
})


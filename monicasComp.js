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
            
            var tween = gsap.from(this, {
                duration: 1,
                y: 50,
                autoAlpha: 0, 
                ease: "power2.out"
            });

            new ScrollMagic.Scene({
                triggerElement: this,     
                triggerHook: 0.8,         
                reverse: true             
            })
            .setTween(tween)              
            .addTo(controller);           
        });

    var computerTL = gsap.timeline();
    computerTL.to("#screen", {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
    });

    new ScrollMagic.Scene({
        triggerElement: "#pinned",
        triggerHook: 0,
        duration: "100%"
    })
    .setPin("#pinned")
    .setTween(computerTL)
    .addTo(controller);
    });
})


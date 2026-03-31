window.onbeforeunload = function () { window.scrollTo(0, 0); }

$(function () {
    var controller = new ScrollMagic.Controller();

    // 1. Background Color Transitions
    new ScrollMagic.Scene({triggerElement: "#parallax1", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", {backgroundColor: "pink", ease: "none"}))
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax2", duration: "100%", triggerHook: 0.5})
        .setTween(gsap.to("body", {backgroundColor: "orange", ease: "none"}))
        .addTo(controller);

    // 2. Paragraph Reveal Animation
    $(".p").each(function() {
        gsap.set(this, { autoAlpha: 0 }); // Ensure they start invisible
        
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

    // 3. The Master Computer & Zoom Timeline
    new ScrollMagic.Scene({
        triggerElement: "#pinned",
        triggerHook: 0,
        duration: "400%"
    })
    .setPin("#pinned")
    .addTo(controller);

    const masterTL = gsap.timeline();

    masterTL
            // Stage A: Power On (Fast)
        .to("#zapLine", {opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.inOut"})
        .to("#zapLine", {scaleY: 100, opacity: 0, duration: 0.4, ease: "power2.out"})
        .to("#screen", {opacity: 1, duration: 0.2 })
        .to("#screen", {opacity: 0.4, duration: 0.05}) // Flicker
        .to("#screen", {opacity: 1, duration: 0.1 })
        .to("#loginScreen", {
            opacity: 1,
            duration: 1,
            onStart: function(){
                $("#screenGlow").css("opacity", "1");
            },
            onComplete: function() {
                $("#loginScreen").css("pointer-events", "auto");
                $("#loginBtn").css("pointer-events", "auto");
            }
        })
        .to("#screen", {opacity: 0.8, duration: 0.5}, "-=0.8");

    new ScrollMagic.Scene({
        triggerElement: "#pinned",
        triggerHook: 0,
        duration: "300%"
    })
    .setTween(masterTL)
    .addTo(controller);

            // Stage B: The Big Zoom (Tied to scroll)
    $('#loginBtn').on('click', function(){
        gsap.to("body", {backgroundColor: "#000", duration: 0.5 });
        gsap.to("#interfaceLayer", { 
            display: "block",
            opacity: 1, 
            duration: 1, 
            onStart: function(){
                $(".main, .header").css("visibility", "hidden");
                $("body").css("overflow", "hidden");
            },
            onComplete: function() {
                window.dispatchEvent(new Event('computer_is_on'));
            }
        });
    });
});


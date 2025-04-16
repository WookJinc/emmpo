// 새로고침시 상단으로  
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

$(window).on('load', function () {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 300);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

     // 섹션 타이틀 split(공통) 
     const splitWords = new SplitType("[data-split='true']", {
        types: "chars",
        tagName: "span"
    })

    // hover 애니메이션
    $('.hover-wrap').each(function () {
        let $this = $(this);
        let upCharTextMotion = gsap.timeline({
            paused: true
        });

        upCharTextMotion
            .to($this.find('.line1 .char'), {
                yPercent: -100,
                opacity: 1,
                duration: 0.3,
                stagger: 0.02
            })
            .to($this.find('.line2 .char'), {
                yPercent: -100,
                opacity: 1,
                duration: 0.3,
                stagger: 0.02
            });

        $this.hover(
            function () {
                upCharTextMotion.restart();
            },
            function () {
                upCharTextMotion.reverse();
            }
        );
    });

    //  down 애니메이션
    downAniEl = document.querySelectorAll("[data-motion='down']")
    downAniEl.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element.dataset.parent,
                start: element.dataset.start || '0% 50%',
                end: '100% 100%',
            },
            y: (index, target) => target.dataset.y || -1000,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element.dataset.parent,
                        start: '0% 100%',
                        end: '100% 10%',
                        scrub: true,
                    },
                    y: 30,
                    ease: "none"
                });
            },
        })
    });

    //  up 애니메이션
    downUpEl = document.querySelectorAll("[data-motion='up']")
    downUpEl.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element.dataset.parent,
                start: '0% 50%',
                end: '100% 100%',
            },
            y: (index, target) => target.dataset.y || -1000,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            onComplete: () => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element.dataset.parent,
                        start: '0% 100%',
                        end: '100% 0%',
                        scrub: true,
                    },
                    y: 30,
                    ease: "none"
                });
            },
        })
    });

    // preload
    const preload = document.querySelector('.preload');
    const preloadImage = document.querySelector('.preload .img-wrapper img');
    const preloadPercent = document.querySelector('.preload .percent');

    preloadMotion = gsap.timeline({
        onComplete: () => {
            headerMotion.restart();
            careerMotion.restart();
        }
    })
    preloadMotion
        .set(preloadImage, {
            transfromOrigin: 'center center',
            y: 330,
            scale: 2.75
        })
        .to(preloadPercent, {
            innerText: 100,
            duration: 2.5,
            snap: {
                innerText: 1
            },
            ease: 'power2.inOut',
            onUpdate: () => {
                preloadPercent.innerText = Math.round(preloadPercent.innerText);
            },
            onComplete: () => {
                gsap.to('.preload .text-area', {
                    opacity: 0,
                    delay: 1,
                    ease: 'power2.inOut'
                })
            }
        })
        .to(preloadImage, {
            opacity: 1,
            delay: 1,
            duration: 2.5,
            onStart: () => {
                gsap.to(preloadImage, {
                    transfromOrigin: 'center center',
                    y: 0,
                    scale: 1,
                    duration: 2.5,
                })
            },
            onComplete: () => {
                gsap.to(preloadImage, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        gsap.set(preload, {
                            visibility: 'hidden',
                            opacity: '0'
                        });
                    }
                });
            }
        });

    // header
    headerMotion = gsap.timeline({
            paused: true
        })
        .from("#header", {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "circ.out"
        })

    // sc-career
    careerMotion = gsap.timeline({
        paused: true,
    })
    careerMotion
        .from(".sc-career .main-group .title .char", {
            transformOrigin: '50% 0%',
            y: -50,
            opacity: 0,
            scaleY: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "circ.out"
        })
        .from(".sc-career .main-group .desc .char", {
            transformOrigin: '50% 0%',
            y: -50,
            opacity: 0,
            scaleY: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "circ.out",
        }, ">")
        .from(".sc-career .main-group .desc-sub .char", {
            transformOrigin: '50% 0%',
            y: -50,
            opacity: 0,
            scaleY: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "circ.out",
        }, ">")

    // sc-explore-where
    gsap.from(".sc-explore-where .title-group .title .char", {
        scrollTrigger: {
            trigger: '.sc-explore-where',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });
    
    gsap.from(".sc-explore-where .related-group .title .char", {
        scrollTrigger: {
            trigger: '.sc-explore-where .related-group',
            start: '0% 90%',
            end: "100% 100%",
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });
    
    gsap.from('.sc-explore-where .related-group .img-wrapper', {
        scrollTrigger: {
            trigger: '.sc-explore-where .related-group',
            start: '0% 50%',
            end: '100% 100%',
            // markers: true,
        },
        y: (index, target) => target.dataset.y || -1000,
        opacity: 0,
        duration: 1.5,
        stagger: 0.5,
        ease: "power3.out"
    });

    // sc-explore-exciting
    gsap.from(".sc-explore-exciting .title .char", {
        scrollTrigger: {
            trigger: '.sc-explore-exciting',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });

    $('.sc-explore-exciting .item').click(function () {
        idx = $(this).index();
        $(this).addClass('show').siblings().removeClass('show');

        $('.sc-explore-exciting .bg .img-wrapper').eq(idx).addClass('active').siblings().removeClass('active')
    })

    // sc-discover
    gsap.from(".sc-discover .title .char", {
        scrollTrigger: {
            trigger: '.sc-discover',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });

    // sc-science
    scienceMotion = gsap.timeline({})
    scienceMotion
        .from(".sc-science .title .char", {
            scrollTrigger: {
                trigger: '.sc-science',
                start: '0% 90%',
                end: '100% 100%',
                // markers: true,
            },
            stagger: 0.02,
            scaleY: 0,
            transformOrigin: '50% 0%',
            opacity: 0,
            duration: 0.4,
            ease: "circ.out"
        })

    // sc-person
    gsap.from(".sc-person .title .char", {
        scrollTrigger: {
            trigger: '.sc-person',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });

    gsap.from(".sc-person .sub .char", {
        scrollTrigger: {
            trigger: '.sc-person .sub',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });


    // sc-talent
    gsap.from(".sc-talent .title .char", {
        scrollTrigger: {
            trigger: '.sc-talent',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });

    gsap.from(".sc-talent .text-area-3 p .char", {
        scrollTrigger: {
            trigger: '.sc-talent .text-area-3',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });

    // sc-community
    communityMotion = gsap.timeline({})
    communityMotion
        .from(".sc-community .title .char", {
            scrollTrigger: {
                trigger: '.sc-community',
                start: '0% 90%',
                end: '100% 100%',
                // markers: true,
            },
            stagger: 0.02,
            scaleY: 0,
            transformOrigin: '50% 0%',
            opacity: 0,
            duration: 0.4,
            ease: "circ.out"
        })
        .from(".sc-community .desc .char", {
            scrollTrigger: {
                trigger: '.sc-community',
                start: '0% 90%',
                end: '100% 100%',
                // markers: true,
            },
            stagger: 0.02,
            scaleY: 0,
            transformOrigin: '50% 0%',
            opacity: 0,
            duration: 0.4,
            ease: "circ.out"
        })
        .to(".sc-community .img-wrapper .img-left", {
            scrollTrigger: {
                trigger: '.sc-community .img-wrapper',
                start: '0% 90%',
                end: '100% 100%',
                // markers: true,
                scrub: true,
            },
            x: 15,
            duration: 3,
            ease: "circ.out"
        })
        .to(".sc-community .img-wrapper .img-right", {
            scrollTrigger: {
                trigger: '.sc-community .img-wrapper',
                start: '0% 90%',
                end: '100% 100%',
                // markers: true,
                scrub: true,
            },
            x: -15,
            duration: 3,
            ease: "circ.out"
        });

    // sc-social
    gsap.from(".sc-social .title .char", {
        scrollTrigger: {
            trigger: '.sc-social',
            start: '0% 90%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });

    // 수평 이벤트
    socialHoriMotion = gsap.from(".sc-social .img-wrapper", {
        scrollTrigger: {
            trigger: ".sc-social .sticky-wrapper",
            start: "0% 0%",
            end: "100% 100%",
            // markers: true,
            scrub: true,
        },
        xPercent: 100,
        ease: "none"
    })

    $(".sc-social .img-area").each(function (idx) {
        gsap.to($(this), {
            scrollTrigger: {
                trigger: $(this),
                start: "0% 100%",
                end: "100% 0%",
                containerAnimation: socialHoriMotion,
                // markers: true,
            },
            rotation: (idx % 2 == 0) ? 30 : -30
        })
    })

    // footer 
    gsap.from("#footer .title .char", {
        scrollTrigger: {
            trigger: '#footer',
            start: '0% 50%',
            end: '100% 100%',
            // markers: true,
        },
        stagger: 0.02,
        scaleY: 0,
        transformOrigin: '50% 0%',
        opacity: 0,
        duration: 0.4,
        ease: "circ.out"
    });
})
'use strict';
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');

        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Interactive Dot Background for Hero Section
        const heroCanvas = document.getElementById('hero-canvas');
        const heroCtx = heroCanvas.getContext('2d');
        const heroSection = document.querySelector('.hero');

        const heroState = {
            w: 0,
            h: 0,
            dpr: Math.max(1, Math.min(2, window.devicePixelRatio || 1)),
            mouseX: -99999,
            mouseY: -99999,
            particles: []
        };

        function resizeHeroCanvas() {
            const rect = heroSection.getBoundingClientRect();
            heroState.w = rect.width;
            heroState.h = rect.height;

            heroCanvas.width = Math.floor(heroState.w * heroState.dpr);
            heroCanvas.height = Math.floor(heroState.h * heroState.dpr);
            heroCanvas.style.width = heroState.w + 'px';
            heroCanvas.style.height = heroState.h + 'px';

            heroCtx.setTransform(heroState.dpr, 0, 0, heroState.dpr, 0, 0);

            buildHeroParticles();
        }

        function buildHeroParticles() {
            heroState.particles = [];

            const spacing = 28;

            const cols = Math.ceil(heroState.w / spacing);
            const rows = Math.ceil(heroState.h / spacing);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const baseX = x * spacing;
                    const baseY = y * spacing;

                    heroState.particles.push({
                        baseX,
                        baseY,
                        x: baseX,
                        y: baseY,
                        vx: 0,
                        vy: 0,
                        r: 1.6 + Math.random() * 0.8,
                        a: 0.12 + Math.random() * 0.18
                    });
                }
            }
        }

        function onHeroMouseMove(e) {
            const rect = heroSection.getBoundingClientRect();
            heroState.mouseX = e.clientX - rect.left;
            heroState.mouseY = e.clientY - rect.top;
        }

        function onHeroMouseLeave() {
            heroState.mouseX = -99999;
            heroState.mouseY = -99999;
        }

        heroSection.addEventListener('mousemove', onHeroMouseMove);
        heroSection.addEventListener('mouseleave', onHeroMouseLeave);

        function stepHero() {
            if (motionPreference.matches || document.hidden) { setTimeout(stepHero, 500); return; }
            heroCtx.clearRect(0, 0, heroState.w, heroState.h);

            const influenceRadius = 140;
            const influenceRadius2 = influenceRadius * influenceRadius;

            const strength = 900;
            const returnForce = 0.02;
            const damping = 0.86;

            for (const p of heroState.particles) {
                const dxm = p.x - heroState.mouseX;
                const dym = p.y - heroState.mouseY;
                const d2 = dxm * dxm + dym * dym;

                if (d2 < influenceRadius2) {
                    const d = Math.sqrt(d2) || 0.001;
                    const t = 1 - d / influenceRadius;
                    const push = strength * t * t;

                    p.vx += (dxm / d) * push * 0.001;
                    p.vy += (dym / d) * push * 0.001;
                }

                const dx = p.baseX - p.x;
                const dy = p.baseY - p.y;
                p.vx += dx * returnForce;
                p.vy += dy * returnForce;

                p.vx *= damping;
                p.vy *= damping;

                p.x += p.vx;
                p.y += p.vy;

                heroCtx.globalAlpha = p.a;
                heroCtx.beginPath();
                heroCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                heroCtx.fillStyle = '#c0c0c0';
                heroCtx.fill();
            }

            requestAnimationFrame(stepHero);
        }

        // Initialize hero canvas
        resizeHeroCanvas();
        stepHero();

        // Re-resize on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHeroCanvas, 100);
        });

        // Interactive backgrounds for other sections
        function createInteractiveBackground(section, canvas) {
            const ctx = canvas.getContext('2d');

            const state = {
                w: 0,
                h: 0,
                dpr: Math.max(1, Math.min(2, window.devicePixelRatio || 1)),
                mouseX: -99999,
                mouseY: -99999,
                particles: []
            };

            function resize() {
                const rect = section.getBoundingClientRect();
                state.w = rect.width;
                state.h = rect.height;

                canvas.width = Math.floor(state.w * state.dpr);
                canvas.height = Math.floor(state.h * state.dpr);
                canvas.style.width = state.w + 'px';
                canvas.style.height = state.h + 'px';

                ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

                buildParticles();
            }

            function buildParticles() {
                state.particles = [];

                const spacing = 28;

                const cols = Math.ceil(state.w / spacing);
                const rows = Math.ceil(state.h / spacing);

                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        const baseX = x * spacing;
                        const baseY = y * spacing;

                        state.particles.push({
                            baseX,
                            baseY,
                            x: baseX,
                            y: baseY,
                            vx: 0,
                            vy: 0,
                            r: 1.6 + Math.random() * 0.8,
                            a: 0.12 + Math.random() * 0.18
                        });
                    }
                }
            }

            function onMouseMove(e) {
                const rect = section.getBoundingClientRect();
                state.mouseX = e.clientX - rect.left;
                state.mouseY = e.clientY - rect.top;
            }

            function onMouseLeave() {
                state.mouseX = -99999;
                state.mouseY = -99999;
            }

            section.addEventListener('mousemove', onMouseMove);
            section.addEventListener('mouseleave', onMouseLeave);

            function step() {
                const bounds = section.getBoundingClientRect();
                if (motionPreference.matches || document.hidden || bounds.bottom < 0 || bounds.top > innerHeight) { setTimeout(step, 500); return; }
                ctx.clearRect(0, 0, state.w, state.h);

                const influenceRadius = 140;
                const influenceRadius2 = influenceRadius * influenceRadius;

                const strength = 900;
                const returnForce = 0.02;
                const damping = 0.86;

                for (const p of state.particles) {
                    const dxm = p.x - state.mouseX;
                    const dym = p.y - state.mouseY;
                    const d2 = dxm * dxm + dym * dym;

                    if (d2 < influenceRadius2) {
                        const d = Math.sqrt(d2) || 0.001;
                        const t = 1 - d / influenceRadius;
                        const push = strength * t * t;

                        p.vx += (dxm / d) * push * 0.001;
                        p.vy += (dym / d) * push * 0.001;
                    }

                    const dx = p.baseX - p.x;
                    const dy = p.baseY - p.y;
                    p.vx += dx * returnForce;
                    p.vy += dy * returnForce;

                    p.vx *= damping;
                    p.vy *= damping;

                    p.x += p.vx;
                    p.y += p.vy;

                    ctx.globalAlpha = p.a;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = '#c0c0c0';
                    ctx.fill();
                }

                requestAnimationFrame(step);
            }

            resize();
            step();

            return resize;
        }

        // Initialize interactive backgrounds for all marked sections
        const interactiveSections = document.querySelectorAll('.interactive-bg');
        const resizeFunctions = [];

        interactiveSections.forEach(section => {
            const canvas = section.querySelector('.section-canvas');
            if (canvas) {
                const resizeFn = createInteractiveBackground(section, canvas);
                resizeFunctions.push(resizeFn);
            }
        });

        // Re-resize all sections on window resize
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeFunctions.forEach(fn => fn());
            }, 100);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: motionPreference.matches ? 'auto' : 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const wasActive = button.classList.contains('active');

                // Close all FAQ items
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.setAttribute('aria-expanded', 'false');
                });
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.classList.remove('active');
                });

                // Open clicked item if it wasn't already open
                if (!wasActive) {
                    button.classList.add('active');
                    button.setAttribute('aria-expanded', 'true');
                    button.nextElementSibling.classList.add('active');
                }
            });
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: motionPreference.matches ? 'auto' : 'smooth'
            });
        });

        // Mobile menu toggle (basic implementation)
        document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });

        // Testimonial Carousel
        let currentTestimonial = 0;
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const totalTestimonials = testimonialSlides.length;

        function rotateTestimonials() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            const offset = -currentTestimonial * 100;
            testimonialTrack.style.transform = `translateX(${offset}%)`;
        }

        // Auto-rotate every 5 seconds
        if (testimonialTrack && totalTestimonials > 1) setInterval(() => { if (!motionPreference.matches && !document.hidden) rotateTestimonials(); }, 5000);

        // Interactive Service Areas Map
        async function loadMapScript(src) {
            await new Promise((resolve,reject) => {
                const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.head.appendChild(script);
            });
        }
        async function initializeServiceMap() {
            try {
                await Promise.all([loadMapScript('/assets/js/d3.v7.min.js'),loadMapScript('/assets/js/topojson-client.min.js')]);
            } catch {
                document.getElementById('map-loading').textContent='The interactive map is unavailable. Service areas are listed above.';
                return;
            }
            const cities = [
                { name: "Victoria",        lat: 48.4284, lon: -123.3656, island: true },
                { name: "Campbell River",  lat: 50.0244, lon: -125.2475, island: true },
                { name: "Vancouver",       lat: 49.2827, lon: -123.1207, highlight: true },
            ];

            if (typeof d3 === 'undefined') {
                console.warn('D3.js not loaded, skipping map');
                document.getElementById('map-loading').innerHTML = 'Map unavailable (D3.js required)';
                return;
            }

            if (typeof topojson === 'undefined') {
                console.warn('TopoJSON not loaded, skipping map');
                document.getElementById('map-loading').innerHTML = 'Map unavailable (TopoJSON required)';
                return;
            }

            window.resolveQuantumMapStatus = 'libs-loaded';

            const tooltip = document.getElementById('tooltip');
            const container = document.getElementById('map-container');
            const svgEl = d3.select('#map');

            let worldData;
            try {
                worldData = await d3.json('assets/data/countries-50m.json');
            } catch(e) {
                try {
                    worldData = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
                } catch(e2) {
                    document.getElementById('map-loading').innerHTML = 'Failed to load map data.';
                    return;
                }
            }

            const countries = topojson.feature(worldData, worldData.objects.countries);
            window.resolveQuantumMapStatus = 'data-loaded';
            const canada = countries.features.find(f => f.id === '124');
            const usa = countries.features.find(f => f.id === '840');
            if (!canada) { document.getElementById('map-loading').innerHTML = 'Map error.'; return; }

            const w = container.clientWidth;
            const h = container.clientHeight;
            svgEl.attr('viewBox', `0 0 ${w} ${h}`);

            const geoWest = -128.5, geoEast = -122.6, geoSouth = 48.0, geoNorth = 51.0;

            function mercY(lat) {
                return -Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2));
            }

            const yMin = mercY(geoNorth);
            const yMax = mercY(geoSouth);
            const xMin = geoWest * Math.PI / 180;
            const xMax = geoEast * Math.PI / 180;

            const geoW = xMax - xMin;
            const geoH = yMax - yMin;

            const scale = Math.min(w / geoW, h / geoH) * 0.95;
            const xOffset = (w - geoW * scale) / 2 - xMin * scale;
            const yOffset = (h - geoH * scale) / 2 - yMin * scale;

            const projection = d3.geoMercator()
                .scale(scale)
                .translate([xOffset, yOffset]);

            const path = d3.geoPath().projection(projection);

            svgEl.append('defs').append('clipPath').attr('id', 'map-clip')
                .append('rect').attr('width', w).attr('height', h);

            svgEl.append('rect').attr('width', w).attr('height', h).attr('fill', '#f7fafc');

            const mapGroup = svgEl.append('g').attr('clip-path', 'url(#map-clip)');

            if (usa) {
                mapGroup.append('path').datum(usa).attr('d', path).attr('class', 'land-context');
            }

            mapGroup.append('path').datum(canada).attr('d', path).attr('class', 'land');

            const pinGroup = mapGroup.append('g');

            // Coastline labels
            mapGroup.append('text')
                .attr('x', w * 0.48)
                .attr('y', h * 0.58)
                .attr('fill', '#cbd5e0')
                .attr('font-size', '22')
                .attr('font-weight', '600')
                .attr('opacity', '0.6')
                .text('Vancouver Island');

            mapGroup.append('text')
                .attr('x', w * 0.72)
                .attr('y', h * 0.32)
                .attr('fill', '#cbd5e0')
                .attr('font-size', '20')
                .attr('font-weight', '600')
                .attr('opacity', '0.6')
                .text('British Columbia');

            mapGroup.append('text')
                .attr('x', w * 0.86)
                .attr('y', h * 0.82)
                .attr('fill', '#cbd5e0')
                .attr('font-size', '20')
                .attr('font-weight', '600')
                .attr('opacity', '0.6')
                .text('Washington');

            cities.forEach((city, i) => {
                const coords = projection([city.lon, city.lat]);
                if (!coords) return;
                const [x, y] = coords;

                const outerR = city.highlight ? 8 : 6;
                const innerR = city.highlight ? 3 : 2.2;

                const g = pinGroup.append('g')
                    .attr('class', 'city-pin')
                    .attr('transform', `translate(${x}, ${y})`)
                    .style('opacity', 0);

                g.append('circle')
                    .attr('class', 'pulse')
                    .attr('cx', 0).attr('cy', 0).attr('r', 4)
                    .style('animation-delay', `${i * 200}ms`);

                g.append('circle')
                    .attr('class', 'pin-outer')
                    .attr('cx', 0).attr('cy', 0).attr('r', outerR);

                g.append('circle')
                    .attr('class', 'pin-inner')
                    .attr('cx', 0).attr('cy', 0).attr('r', innerR);

                let lx = 14, ly = 4;
                const n = city.name;
                if (n === 'Victoria')       { lx = 14;  ly = 16; }
                if (n === 'Vancouver')      { lx = 14;  ly = 5; }
                if (n === 'Campbell River') { lx = 14;  ly = -12; }

                g.append('text')
                    .attr('class', 'city-label' + (city.highlight ? ' highlight' : ''))
                    .attr('x', lx)
                    .attr('y', ly)
                    .text(n);

                g.on('mouseenter', () => {
                    g.select('.pin-outer').transition().duration(150).attr('r', outerR + 2.5);
                    g.select('.pin-inner').transition().duration(150).attr('r', innerR + 1);

                    tooltip.querySelector('.name').textContent = n + (city.island ? ', Vancouver Island' : ', BC');
                    tooltip.querySelector('.coords').textContent =
                        `${Math.abs(city.lat).toFixed(4)}°N, ${Math.abs(city.lon).toFixed(4)}°W`;

                    const svgRect = svgEl.node().getBoundingClientRect();
                    const scaleX = svgRect.width / w;
                    const scaleY = svgRect.height / h;

                    let tipLeft = (svgRect.left + x * scaleX - 70);
                    let tipTop = (svgRect.top + y * scaleY - 48);

                    // keep tooltip in viewport
                    const tipWidth = 160;
                    const tipHeight = 42;
                    const margin = 8;
                    if (tipLeft < margin) tipLeft = margin;
                    if (tipLeft + tipWidth > window.innerWidth - margin) tipLeft = window.innerWidth - tipWidth - margin;
                    if (tipTop < margin) tipTop = svgRect.top + y * scaleY + 18;

                    tooltip.style.left = tipLeft + 'px';
                    tooltip.style.top = tipTop + 'px';
                    tooltip.classList.add('visible');
                });

                g.on('mouseleave', () => {
                    g.select('.pin-outer').transition().duration(150).attr('r', outerR);
                    g.select('.pin-inner').transition().duration(150).attr('r', innerR);
                    tooltip.classList.remove('visible');
                });

                setTimeout(() => {
                    g.transition().duration(400)
                        .ease(d3.easeBackOut.overshoot(1.5))
                        .style('opacity', 1);
                }, 300 + i * 70);
            });

            document.getElementById('map-loading').classList.add('hide');
            window.resolveQuantumMapStatus = 'rendered';
        }
        const mapObserver=new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                mapObserver.disconnect();
                initializeServiceMap().catch(() => { document.getElementById('map-loading').textContent='Service areas are listed above.'; });
            }
        }, {rootMargin:'200px'});
        mapObserver.observe(document.getElementById('service-areas-map'));

        // Sample Report Viewer
        let currentPage = 1;
        const totalPages = 7;
        const pages = document.querySelectorAll('.document-page');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const currentPageSpan = document.getElementById('current-page');

        function updatePage() {
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));

            // Show current page
            pages[currentPage - 1].classList.add('active');

            // Update page counter
            currentPageSpan.textContent = currentPage;

            // Update button states
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }

        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePage();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePage();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentPage > 1) {
                currentPage--;
                updatePage();
            } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
                currentPage++;
                updatePage();
            }
        });

        // Complete Measurements Carousel
        let currentMeasurement = 0;
        const measurementTrack = document.querySelector('#measurements-track');
        const measurementSlides = document.querySelectorAll('#measurements-track .measurement-slide');
        const indicatorDots = document.querySelectorAll('#complete-measurements .indicator-dot');
        const totalMeasurements = measurementSlides.length;

        function updateMeasurementCarousel(index) {
            currentMeasurement = index;
            const offset = -currentMeasurement * 100;
            measurementTrack.style.transform = `translateX(${offset}%)`;

            // Update indicator dots
            indicatorDots.forEach((dot, i) => {
                if (i === currentMeasurement) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextMeasurement() {
            const next = (currentMeasurement + 1) % totalMeasurements;
            updateMeasurementCarousel(next);
        }

        // Auto-rotate every 6 seconds
        setInterval(() => { if (!motionPreference.matches && !document.hidden) nextMeasurement(); }, 6000);

        // Click indicators to jump to specific slide
        indicatorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateMeasurementCarousel(index);
            });
        });

        // Property Assessments Carousel
        let currentProperty = 0;
        const propertyTrack = document.querySelector('#property-track');
        const propertySlides = document.querySelectorAll('#property-track .measurement-slide');
        const propertyDots = document.querySelectorAll('#property-indicators .indicator-dot');
        const totalProperty = propertySlides.length;

        function updatePropertyCarousel(index) {
            currentProperty = index;
            const offset = -currentProperty * 100;
            propertyTrack.style.transform = `translateX(${offset}%)`;

            // Update indicator dots
            propertyDots.forEach((dot, i) => {
                if (i === currentProperty) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextProperty() {
            const next = (currentProperty + 1) % totalProperty;
            updatePropertyCarousel(next);
        }

        // Auto-rotate every 6 seconds
        setInterval(() => { if (!motionPreference.matches && !document.hidden) nextProperty(); }, 6000);

        // Click indicators to jump to specific slide
        propertyDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updatePropertyCarousel(index);
            });
        });

// First-party lead-intent hooks. No analytics is loaded without a configured service.
// A cross-origin Google Forms submission cannot be verified by the parent page.
document.addEventListener('click', event => {
    const link=event.target.closest('a');
    if (!link) return;
    const href=link.getAttribute('href') || '';
    const action=href.startsWith('tel:') ? 'phone_click' : href.startsWith('mailto:') ? 'email_click' : link.dataset.contactAction;
    if (action) window.dispatchEvent(new CustomEvent('resolve:contact',{detail:{action}}));
});

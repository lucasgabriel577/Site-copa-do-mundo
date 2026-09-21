import React, { useRef } from 'react';
import { motion, MotionConfig, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

function Reveal({ children, className }) {
    const target = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress: progress } = useScroll({ target, offset: ['start end', 'end end'] });
    const y = useTransform(progress, [0, 0.65, 1], [55, 0, 0]);
    return <div ref={target} className={className}><motion.div style={reduced ? {} : { y }}>{children}</motion.div></div>;
}

function Hero() {
    const section = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
    const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 45, restDelta: 0.0001 });
    const imageScale = useTransform(progress, [0, 1], [1.04, 1.5]);
    const imageY = useTransform(progress, [0, 1], ['0%', '-5%']);
    const titleY = useTransform(progress, [0, 0.5], [0, -130]);
    const titleOpacity = useTransform(progress, [0, 0.15, 0.5], [1, 1, 0]);
    const captionOpacity = useTransform(progress, [0, 0.4, 0.65], [0, 0, 1]);
    const captionY = useTransform(progress, [0.4, 0.75], [65, 0]);
    return <section ref={section} className="scroll-film" aria-labelledby="hero-title">
        <div className="film-stage">
            <motion.img className="stadium-image" src="img/stadium-mono.png" alt="Bola no gramado de um estádio iluminado à noite" fetchPriority="high" style={reduced ? {} : { scale: imageScale, y: imageY }} />
            <div className="film-shade" aria-hidden="true" />
            <div className="film-topline"><span>CANADÁ / MÉXICO / EUA</span><span>COPA DO MUNDO</span></div>
            <motion.div className="film-title" style={reduced ? {} : { y: titleY, opacity: titleOpacity }}><h1 id="hero-title">COPA DO<br />MUNDO<span>2026</span></h1></motion.div>
            <motion.div className="film-caption" aria-hidden="true" style={reduced ? { display: 'none' } : { opacity: captionOpacity, y: captionY }}><p>48 seleções.<br />104 partidas.<br />3 países.</p></motion.div>
            <div className="film-bottom"><a href="#sobre">SOBRE A COPA <span>↓</span></a><span>2026</span></div>
            <div className="frame-track" aria-hidden="true"><motion.span style={{ scaleY: reduced ? 0 : scrollYProgress }} /></div>
        </div>
    </section>;
}

function Trophy() {
    const section = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
    const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 45, restDelta: 0.0001 });
    const rotation = useTransform(progress, [0, 0.5, 1], [-12, 0, 10]);
    const scale = useTransform(progress, [0, 0.5, 1], [0.82, 1.02, 1.13]);
    const y = useTransform(progress, [0, 1], [45, -35]);
    const firstOpacity = useTransform(progress, [0, 0.24, 0.42], [1, 1, 0]);
    const firstY = useTransform(progress, [0.28, 0.5], [0, -65]);
    const secondOpacity = useTransform(progress, [0.48, 0.68, 1], [0, 1, 1]);
    const secondY = useTransform(progress, [0.45, 0.65], [65, 0]);
    return <section ref={section} className="trophy-chapter" aria-label="A taça da Copa do Mundo">
        <div className="trophy-stage">
            <div className="trophy-stories">
                <motion.div className="trophy-story" style={reduced ? {} : { opacity: firstOpacity, y: firstY }}>
                    <span className="section-label">O TROFÉU</span>
                    <h2>A taça da<br />Copa do Mundo.</h2>
                    <p>Criada pelo escultor italiano Silvio Gazzaniga, a taça atual foi entregue pela primeira vez em 1974. Duas figuras humanas sustentam o globo, sobre uma base com anéis de malaquita.</p>
                    <span className="trophy-footnote">Ouro de 18 quilates. Uma história desde 1974.</span>
                </motion.div>
                <motion.div className="trophy-story trophy-details" style={reduced ? {} : { opacity: secondOpacity, y: secondY }}>
                    <span className="section-label">A TAÇA EM DETALHES</span>
                    <h2>36,8 cm.<br />6,175 kg.</h2>
                    <p>O troféu substituiu a Taça Jules Rimet, que ficou em definitivo com o Brasil depois do tricampeonato de 1970.</p>
                    <p>Desde então, o mesmo desenho acompanha as celebrações dos campeões mundiais.</p>
                </motion.div>
            </div>
            <div className="trophy-visual"><span className="trophy-year" aria-hidden="true">1974</span><motion.img className="trophy-image" src="img/R.png" alt="Taça da Copa do Mundo em ouro, com base verde de malaquita" width="420" height="800" style={reduced ? {} : { rotate: rotation, scale, y }} /></div>
            <a className="trophy-source" href="https://www.fifa.com/en/articles/100-great-world-moments-qatar-2022-new-trophy-introduced-1974" target="_blank" rel="noreferrer">História do troféu · FIFA ↗</a>
        </div>
    </section>;
}

export function HomePage() {
    return <MotionConfig reducedMotion="user">
        <Hero />
        <section id="sobre" className="worldcup-about">
            <Reveal className="about-heading"><span className="section-label">SOBRE A COMPETIÇÃO</span><h2>A Copa do Mundo<br />de futebol.</h2></Reveal>
            <Reveal className="about-copy"><p>Organizada pela FIFA, a Copa do Mundo reúne seleções nacionais em uma competição disputada a cada quatro anos. A primeira edição aconteceu no Uruguai, em 1930.</p><p>A edição de 2026 marca a ampliação para 48 seleções e a organização conjunta de Canadá, México e Estados Unidos, com jogos distribuídos por 16 cidades-sede.</p><a className="content-link" href="historia.html">Leia a história da competição <span>↗</span></a></Reveal>
        </section>
        <Trophy />
        <section className="cup-format" aria-labelledby="format-title">
            <Reveal className="format-intro"><span className="section-label">EDIÇÃO 2026</span><h2 id="format-title">Como funciona<br />o torneio.</h2><p>São 12 grupos de quatro seleções. Os dois primeiros de cada grupo e os oito melhores terceiros colocados avançam para a fase eliminatória, que começa com 32 equipes.</p></Reveal>
            <div className="format-numbers"><div><strong>48</strong><span>seleções</span></div><div><strong>104</strong><span>partidas</span></div><div><strong>16</strong><span>cidades-sede</span></div></div>
            <div className="host-countries"><span>PAÍSES-SEDE</span><figure><img src="https://flagcdn.com/w160/ca.png" alt="Bandeira do Canadá" width="64" height="40" loading="lazy" /><figcaption>Canadá</figcaption></figure><figure><img src="https://flagcdn.com/w160/mx.png" alt="Bandeira do México" width="64" height="40" loading="lazy" /><figcaption>México</figcaption></figure><figure><img src="https://flagcdn.com/w160/us.png" alt="Bandeira dos Estados Unidos" width="64" height="40" loading="lazy" /><figcaption>Estados Unidos</figcaption></figure></div>
            <a className="content-source" href="https://www.fifa.com/en/articles/article-fifa-world-cup-2026-mexico-canada-usa-new-format-tournament-football-soccer" target="_blank" rel="noreferrer">Formato da competição · FIFA ↗</a>
        </section>
        <section className="video-section"><div className="video-heading"><h2>Vinheta da Copa 2026.</h2><span>VÍDEO</span></div><div className="video-frame"><iframe src="https://www.youtube.com/embed/Y8CbMkfu-qU" title="Vinheta da Copa do Mundo 2026" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></section>
    </MotionConfig>;
}

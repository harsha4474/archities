import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Float, Text3D, Center } from '@react-three/drei';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            archities
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['About', 'Services', 'Portfolio', 'Process', 'Testimonials', 'Contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1, color: '#DC143C' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-light-gray hover:text-crimson-red transition-colors font-medium"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="hidden md:block bg-gradient-to-r from-deep-red to-crimson-red text-white px-6 py-3 rounded-full font-semibold glow-red"
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-light-gray"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark"
          >
            <div className="px-4 py-4 space-y-3">
              {['About', 'Services', 'Portfolio', 'Process', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-light-gray hover:text-crimson-red transition-colors py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Professional 3D Architectural Visualization Component
const ArchitecturalRoom3D = () => {
  const groupRef = useRef();
  const [wireframeProgress, setWireframeProgress] = useState(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Slow rotation for professional presentation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.3;
    }

    // Animate wireframe to solid transition (repeating cycle)
    const progress = (Math.sin(time * 0.3) + 1) / 2; // 0 to 1
    setWireframeProgress(progress);
  });

  // Create blueprint-style grid helper
  const BlueprintGrid = () => {
    const gridRef = useRef();

    return (
      <group ref={gridRef}>
        {/* Main grid floor */}
        <gridHelper args={[12, 24, '#DC143C', '#4A4A4A']} position={[0, -1, 0]} />

        {/* Vertical grid on back wall */}
        <gridHelper
          args={[8, 16, '#DC143C', '#4A4A4A']}
          position={[0, 2, -4]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    );
  };

  // Professional dimension lines
  const DimensionLines = () => {
    return (
      <group>
        {/* Floor dimension line */}
        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-3, -0.9, 3, 3, -0.9, 3])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#D4AF37" linewidth={2} />
        </line>
      </group>
    );
  };

  return (
    <group ref={groupRef}>
      <BlueprintGrid />
      <DimensionLines />

      {/* Professional Architectural Room Structure */}
      <group position={[0, 0, 0]}>
        {/* Floor - Professional Material */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10, 10, 10]} />
          <meshStandardMaterial
            color="#2A2A2A"
            metalness={0.7}
            roughness={0.3}
            wireframe={wireframeProgress < 0.3}
            opacity={wireframeProgress < 0.3 ? 0.6 : 1}
            transparent
          />
        </mesh>

        {/* Back Wall - Wireframe to Solid Transition */}
        <mesh position={[0, 2, -4]} castShadow>
          <boxGeometry args={[10, 6, 0.2, 4, 4, 1]} />
          <meshStandardMaterial
            color="#F5F5F5"
            metalness={0.2}
            roughness={0.8}
            wireframe={wireframeProgress < 0.5}
            opacity={wireframeProgress < 0.5 ? 0.7 : 1}
            transparent
          />
        </mesh>

        {/* Left Wall */}
        <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[8, 6, 0.2, 4, 4, 1]} />
          <meshStandardMaterial
            color="#F5F5F5"
            metalness={0.2}
            roughness={0.8}
            wireframe={wireframeProgress < 0.5}
            opacity={wireframeProgress < 0.5 ? 0.7 : 1}
            transparent
          />
        </mesh>

        {/* Right Wall */}
        <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[8, 6, 0.2, 4, 4, 1]} />
          <meshStandardMaterial
            color="#F5F5F5"
            metalness={0.2}
            roughness={0.8}
            wireframe={wireframeProgress < 0.5}
            opacity={wireframeProgress < 0.5 ? 0.7 : 1}
            transparent
          />
        </mesh>

        {/* Ceiling with detail */}
        <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <planeGeometry args={[10, 8, 5, 5]} />
          <meshStandardMaterial
            color="#E0E0E0"
            metalness={0.1}
            roughness={0.9}
            wireframe={wireframeProgress < 0.4}
            opacity={wireframeProgress < 0.4 ? 0.5 : 1}
            transparent
          />
        </mesh>

        {/* Professional Furniture - L-Shaped Sofa */}
        <group position={[-1, -0.4, 1]}>
          {/* Main section */}
          <mesh castShadow>
            <boxGeometry args={[2.5, 0.6, 1.2]} />
            <meshStandardMaterial
              color="#DC143C"
              metalness={0.3}
              roughness={0.7}
              wireframe={wireframeProgress < 0.6}
              opacity={wireframeProgress < 0.6 ? 0.8 : 1}
              transparent
            />
          </mesh>
          {/* L section */}
          <mesh position={[1.2, 0, -1.1]} castShadow>
            <boxGeometry args={[1.2, 0.6, 1]} />
            <meshStandardMaterial
              color="#8B0000"
              metalness={0.3}
              roughness={0.7}
              wireframe={wireframeProgress < 0.6}
              opacity={wireframeProgress < 0.6 ? 0.8 : 1}
              transparent
            />
          </mesh>
          {/* Cushions */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-0.8 + i * 0.8, 0.4, 0.5]} castShadow>
              <boxGeometry args={[0.6, 0.3, 0.6]} />
              <meshStandardMaterial
                color="#FF6B6B"
                metalness={0.1}
                roughness={0.9}
                wireframe={wireframeProgress < 0.7}
              />
            </mesh>
          ))}
        </group>

        {/* Designer Coffee Table with Glass Top */}
        <group position={[0.5, -0.5, 2.5]}>
          {/* Glass top */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.8, 0.05, 1]} />
            <meshPhysicalMaterial
              color="#D4AF37"
              metalness={0.95}
              roughness={0.05}
              transmission={0.9}
              thickness={0.5}
              wireframe={wireframeProgress < 0.65}
            />
          </mesh>
          {/* Legs */}
          {[[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].map((pos, i) => (
            <mesh key={i} position={[pos[0], 0, pos[1]]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
              <meshStandardMaterial
                color="#1A1A1A"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>

        {/* Modern TV Unit / Cabinet */}
        <group position={[0, 0.3, -3.7]}>
          <mesh castShadow>
            <boxGeometry args={[4, 1.2, 0.5]} />
            <meshStandardMaterial
              color="#2C2C2C"
              metalness={0.6}
              roughness={0.4}
              wireframe={wireframeProgress < 0.55}
              opacity={wireframeProgress < 0.55 ? 0.8 : 1}
              transparent
            />
          </mesh>
          {/* Gold accent strip */}
          <mesh position={[0, 0.61, 0.1]} castShadow>
            <boxGeometry args={[4, 0.05, 0.1]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.9}
              roughness={0.1}
              emissive="#D4AF37"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>

        {/* Pendant Lights - Modern Design */}
        {[-2, 0, 2].map((x, i) => (
          <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[x, 3.5, 1]}>
              {/* Cord */}
              <mesh>
                <cylinderGeometry args={[0.01, 0.01, 1.5, 8]} />
                <meshStandardMaterial color="#1A1A1A" />
              </mesh>
              {/* Shade */}
              <mesh position={[0, -0.9, 0]} castShadow>
                <coneGeometry args={[0.25, 0.4, 16]} />
                <meshStandardMaterial
                  color="#DC143C"
                  metalness={0.7}
                  roughness={0.3}
                  wireframe={wireframeProgress < 0.7}
                  emissive="#DC143C"
                  emissiveIntensity={wireframeProgress > 0.7 ? 0.5 : 0}
                />
              </mesh>
              {/* Light glow */}
              <pointLight
                position={[0, -1.1, 0]}
                intensity={wireframeProgress > 0.7 ? 0.8 : 0}
                distance={3}
                color="#FFD700"
                castShadow
              />
            </group>
          </Float>
        ))}

        {/* Side Table with Decor */}
        <group position={[3, -0.6, -1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.4, 0.4, 1.2, 24]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.8}
              roughness={0.2}
              wireframe={wireframeProgress < 0.6}
            />
          </mesh>
          {/* Vase on top */}
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 0.4, 16]} />
            <meshStandardMaterial
              color="#8B0000"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        </group>

        {/* Architectural Reference Points (Blueprint Style) */}
        {[
          [-4, -0.9, -3],
          [4, -0.9, -3],
          [-4, -0.9, 3],
          [4, -0.9, 3]
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#00BFFF"
              emissive="#00BFFF"
              emissiveIntensity={0.8}
              metalness={1}
              roughness={0}
            />
          </mesh>
        ))}

        {/* Floating Design Particles (CAD Nodes) */}
        {[...Array(30)].map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 4 + Math.sin(i * 0.5) * 1;
          return (
            <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={1}>
              <mesh
                position={[
                  Math.cos(angle) * radius,
                  1 + Math.sin(i * 0.3) * 2,
                  Math.sin(angle) * radius
                ]}
              >
                <octahedronGeometry args={[0.04, 0]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#DC143C" : i % 3 === 1 ? "#D4AF37" : "#00BFFF"}
                  emissive={i % 3 === 0 ? "#DC143C" : i % 3 === 1 ? "#D4AF37" : "#00BFFF"}
                  emissiveIntensity={0.6}
                  metalness={1}
                  roughness={0}
                />
              </mesh>
            </Float>
          );
        })}
      </group>

      {/* Professional Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[0, 6, 0]}
        angle={0.5}
        intensity={0.8}
        penumbra={0.5}
        castShadow
        color="#FFFFFF"
      />
      <pointLight position={[-4, 3, 2]} intensity={0.6} color="#DC143C" distance={8} />
      <pointLight position={[4, 3, -2]} intensity={0.6} color="#D4AF37" distance={8} />
      <pointLight position={[0, 4, 4]} intensity={0.5} color="#00BFFF" distance={6} />
    </group>
  );
};

// Hero Section with Professional Blueprint Overlay
const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 grid-background opacity-10"></div>

      {/* Professional Blueprint Overlay Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {/* Corner Technical Marks */}
        <div className="absolute top-4 left-4 text-electric-blue font-mono text-xs">
          <div>ARCHITIES © 2025</div>
          <div className="mt-1">SCALE: 1:50</div>
          <div>DRG NO: INT-001</div>
        </div>
        <div className="absolute top-4 right-4 text-electric-blue font-mono text-xs text-right">
          <div>MODERN LIVING SPACE</div>
          <div className="mt-1">3D VISUALIZATION</div>
          <div>AP & TELANGANA</div>
        </div>

        {/* Technical Border Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-crimson-red to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-metallic-gold to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-crimson-red to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-metallic-gold to-transparent"></div>

        {/* Dimension Line Indicators */}
        <svg className="absolute bottom-20 left-10 w-64 h-20" viewBox="0 0 200 50">
          <line x1="0" y1="25" x2="200" y2="25" stroke="#D4AF37" strokeWidth="1" />
          <line x1="0" y1="20" x2="0" y2="30" stroke="#D4AF37" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="30" stroke="#D4AF37" strokeWidth="1" />
          <text x="100" y="15" fill="#D4AF37" fontSize="8" textAnchor="middle">PREMIUM DESIGN</text>
        </svg>
      </div>

      {/* Professional 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[8, 5, 12]} fov={50} />
          <Suspense fallback={null}>
            <ArchitecturalRoom3D />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Where <span className="gradient-text">3D Vision</span> Meets
            <br />
            Architectural Mastery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-light-gray mb-8 font-light"
          >
            Award-Winning Interior Design Powered by Advanced 3D Visualization
            <br />
            <span className="text-lg text-metallic-gold">Serving Andhra Pradesh & Telangana with Professional Excellence</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-deep-red to-crimson-red text-white px-8 py-4 rounded-full font-semibold text-lg glow-red"
            >
              Get Free Consultation
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="glass border-2 border-crimson-red text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              View Our Work
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '500+', label: 'Projects Completed' },
              { number: '100%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="glass p-4 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-light-gray mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-light-gray"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            About <span className="gradient-text">archities</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-deep-red to-metallic-gold mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-crimson-red">
              Masterful Design Powered by Technology
            </h3>
            <p className="text-lg text-light-gray mb-6 leading-relaxed">
              Since 2014, <span className="text-metallic-gold font-semibold">archities</span> has pioneered the fusion of traditional
              interior design excellence with cutting-edge 3D visualization technology. Our professional-grade
              CAD and rendering software allows clients to <span className="text-electric-blue font-semibold">experience their space before a single brick is laid</span>.
            </p>
            <p className="text-lg text-light-gray mb-6 leading-relaxed">
              Our team of 25+ certified architects and designers utilizes industry-leading tools—AutoCAD, SketchUp Pro,
              3ds Max, and V-Ray—to create photorealistic renders and immersive walkthroughs. With over 500 completed
              projects across AP & Telangana, we blend <span className="text-crimson-red font-semibold">technical precision with artistic vision</span>.
            </p>
            <p className="text-lg text-light-gray mb-6 leading-relaxed">
              Every project begins with detailed technical drawings, evolves through 3D wireframe modeling, and culminates
              in stunning photorealistic visualization—ensuring zero surprises and 100% satisfaction.
            </p>

            <div className="glass p-6 rounded-xl border border-mid-gray mb-6">
              <h4 className="text-metallic-gold font-semibold mb-3 flex items-center gap-2">
                <span>🏆</span> Technical Capabilities
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>✓ Photorealistic 3D Renders</div>
                <div>✓ Virtual Reality Tours</div>
                <div>✓ CAD Technical Drawings</div>
                <div>✓ Material Visualization</div>
                <div>✓ Lighting Simulations</div>
                <div>✓ Real-time Modifications</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { label: 'BIM Technology', icon: '🔧' },
                { label: 'Sustainable Design', icon: '🌿' },
                { label: 'Smart Home Integration', icon: '💡' },
                { label: 'Timely Delivery', icon: '⏱️' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass px-5 py-3 rounded-full text-sm font-semibold border border-crimson-red flex items-center gap-2"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 glass-dark rounded-2xl p-4 border border-mid-gray"
          >
            {/* Professional Software Interface Mockup */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-xs font-mono text-electric-blue">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-crimson-red"></div>
                <div className="w-3 h-3 rounded-full bg-metallic-gold"></div>
                <div className="w-3 h-3 rounded-full bg-electric-blue"></div>
              </div>
              <div>archities_CAD_Studio.dwg</div>
            </div>

            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[3, 2, 4]} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
              <spotLight position={[0, 5, 0]} angle={0.3} intensity={0.5} />

              <Suspense fallback={null}>
                {/* Rotating architectural elements showcasing design software */}
                <group>
                  {/* Main building wireframe */}
                  <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                    <mesh rotation={[0, Math.PI / 4, 0]}>
                      <boxGeometry args={[2, 2.5, 2]} />
                      <meshStandardMaterial
                        color="#DC143C"
                        metalness={0.9}
                        roughness={0.1}
                        wireframe={true}
                        transparent
                        opacity={0.8}
                      />
                    </mesh>
                  </Float>

                  {/* Inner solid structure */}
                  <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <mesh rotation={[0, -Math.PI / 4, 0]} scale={0.8}>
                      <boxGeometry args={[2, 2.5, 2]} />
                      <meshPhysicalMaterial
                        color="#D4AF37"
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.6}
                        transmission={0.5}
                      />
                    </mesh>
                  </Float>

                  {/* Architectural grid reference */}
                  <gridHelper args={[4, 8, '#00BFFF', '#4A4A4A']} position={[0, -1.5, 0]} />

                  {/* CAD measurement points */}
                  {[
                    [-1, 1.5, -1], [1, 1.5, -1], [-1, 1.5, 1], [1, 1.5, 1],
                    [-1, -1.5, -1], [1, -1.5, -1], [-1, -1.5, 1], [1, -1.5, 1]
                  ].map((pos, i) => (
                    <mesh key={i} position={pos}>
                      <sphereGeometry args={[0.06, 16, 16]} />
                      <meshStandardMaterial
                        color="#00BFFF"
                        emissive="#00BFFF"
                        emissiveIntensity={1}
                      />
                    </mesh>
                  ))}

                  {/* Floating design elements */}
                  {[0, 1, 2].map((i) => (
                    <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={1}>
                      <mesh position={[Math.cos(i * 2) * 2.5, i - 1, Math.sin(i * 2) * 2.5]}>
                        <octahedronGeometry args={[0.15, 0]} />
                        <meshStandardMaterial
                          color={i === 0 ? "#DC143C" : i === 1 ? "#D4AF37" : "#00BFFF"}
                          metalness={1}
                          roughness={0}
                        />
                      </mesh>
                    </Float>
                  ))}
                </group>
              </Suspense>
            </Canvas>

            {/* Technical info overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-mono text-light-gray">
              <div>RENDER: Real-time</div>
              <div>QUALITY: Ultra</div>
              <div>SCALE: 1:100</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      title: 'Residential Interior',
      description: 'Transform your home into a personalized sanctuary with our bespoke residential design solutions.',
      icon: '🏠',
      features: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms']
    },
    {
      title: 'Commercial Spaces',
      description: 'Create impactful business environments that enhance productivity and brand identity.',
      icon: '🏢',
      features: ['Offices', 'Retail Stores', 'Restaurants', 'Hotels']
    },
    {
      title: 'Modular Kitchens',
      description: 'State-of-the-art modular kitchen designs combining aesthetics with functionality.',
      icon: '🔪',
      features: ['Custom Cabinets', 'Smart Storage', 'Premium Finishes', 'Appliances']
    },
    {
      title: 'Office Fitouts',
      description: 'Modern office spaces designed to inspire creativity and collaboration.',
      icon: '💼',
      features: ['Workstations', 'Meeting Rooms', 'Breakout Areas', 'Reception']
    },
    {
      title: 'Renovations',
      description: 'Breathe new life into existing spaces with our comprehensive renovation services.',
      icon: '🔨',
      features: ['Full Makeovers', 'Partial Updates', 'Restoration', 'Upgrades']
    },
    {
      title: '3D Visualization',
      description: 'Experience your space before it\'s built with photorealistic 3D renders and walkthroughs.',
      icon: '🎨',
      features: ['3D Renders', 'Virtual Tours', 'Material Selection', 'Design Previews']
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-charcoal to-black relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            Comprehensive interior design solutions tailored to your unique needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-8 rounded-2xl border border-mid-gray hover:border-crimson-red transition-all cursor-pointer group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-crimson-red">
                {service.title}
              </h3>
              <p className="text-light-gray mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-sm text-light-gray flex items-center">
                    <span className="text-metallic-gold mr-2">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: 'Modern Villa - Hyderabad',
      location: 'Jubilee Hills, Hyderabad',
      size: '3500 sq ft',
      timeline: '4 months',
      category: 'Residential',
      description: 'Luxurious modern villa featuring minimalist design with smart home integration.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop'
    },
    {
      title: 'Tech Office - Vijayawada',
      location: 'IT Hub, Vijayawada',
      size: '5000 sq ft',
      timeline: '3 months',
      category: 'Commercial',
      description: 'Contemporary office space designed for a leading tech company with collaborative zones.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    },
    {
      title: 'Luxury Apartment - Visakhapatnam',
      location: 'Beach Road, Visakhapatnam',
      size: '2200 sq ft',
      timeline: '2.5 months',
      category: 'Residential',
      description: 'Coastal-themed luxury apartment with panoramic ocean views.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    },
    {
      title: 'Boutique Restaurant - Hyderabad',
      location: 'Banjara Hills, Hyderabad',
      size: '3000 sq ft',
      timeline: '3 months',
      category: 'Commercial',
      description: 'Elegant restaurant interior blending traditional and contemporary design elements.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'
    },
    {
      title: 'Penthouse Suite - Hyderabad',
      location: 'Gachibowli, Hyderabad',
      size: '4000 sq ft',
      timeline: '5 months',
      category: 'Residential',
      description: 'Ultra-modern penthouse with floor-to-ceiling windows and rooftop terrace.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    },
    {
      title: 'Corporate Headquarters - Amaravati',
      location: 'Capital Region, Amaravati',
      size: '8000 sq ft',
      timeline: '6 months',
      category: 'Commercial',
      description: 'Prestigious corporate office with executive suites and conference facilities.',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
    },
    {
      title: 'Designer Home - Guntur',
      location: 'Brindavan Gardens, Guntur',
      size: '2800 sq ft',
      timeline: '3.5 months',
      category: 'Residential',
      description: 'Eclectic home design featuring bold colors and custom-made furniture.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    {
      title: 'Hotel Lobby - Tirupati',
      location: 'Temple Town, Tirupati',
      size: '4500 sq ft',
      timeline: '4 months',
      category: 'Commercial',
      description: 'Grand hotel lobby with traditional South Indian architectural elements.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
    },
    {
      title: 'Contemporary Villa - Warangal',
      location: 'Kazipet, Warangal',
      size: '3200 sq ft',
      timeline: '4 months',
      category: 'Residential',
      description: 'Sustainable villa design with natural materials and energy-efficient systems.',
      image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop'
    }
  ];

  return (
    <section id="portfolio" className="section-padding bg-charcoal relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            Explore our showcase of exceptional projects across AP & Telangana
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-xs text-metallic-gold font-semibold mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-light-gray mb-3">
                    {project.location}
                  </p>
                  <div className="flex gap-4 text-xs text-light-gray">
                    <span>📐 {project.size}</span>
                    <span>⏱️ {project.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-crimson-red transition-colors rounded-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark rounded-2xl max-w-4xl w-full overflow-hidden"
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-charcoal/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-crimson-red transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-8">
                <div className="text-sm text-metallic-gold font-semibold mb-2">
                  {selectedProject.category}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-lg text-light-gray mb-6">
                  {selectedProject.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass p-4 rounded-lg">
                    <div className="text-sm text-light-gray mb-1">Location</div>
                    <div className="font-semibold">{selectedProject.location}</div>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <div className="text-sm text-light-gray mb-1">Size</div>
                    <div className="font-semibold">{selectedProject.size}</div>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <div className="text-sm text-light-gray mb-1">Timeline</div>
                    <div className="font-semibold">{selectedProject.timeline}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We begin with understanding your vision, requirements, and budget through detailed discussions.',
      icon: '💬'
    },
    {
      number: '02',
      title: 'Concept & Sketch',
      description: 'Our designers create initial sketches and mood boards to visualize your space.',
      icon: '✏️'
    },
    {
      number: '03',
      title: '3D Modeling',
      description: 'Transform sketches into photorealistic 3D renders for complete visualization before execution.',
      icon: '🎨'
    },
    {
      number: '04',
      title: 'Execution',
      description: 'Our expert team brings the design to life with precision craftsmanship and quality materials.',
      icon: '🔨'
    },
    {
      number: '05',
      title: 'Reveal',
      description: 'Experience the transformation as we unveil your dream space, ready to be lived in.',
      icon: '✨'
    }
  ];

  return (
    <section id="process" className="section-padding bg-gradient-to-b from-black to-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            From concept to completion - a streamlined journey to your dream space
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-deep-red via-crimson-red to-metallic-gold transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`mb-12 md:mb-24 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass p-8 rounded-2xl border border-mid-gray hover:border-crimson-red transition-all"
                >
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-crimson-red">
                    {step.title}
                  </h3>
                  <p className="text-light-gray leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Number Circle */}
              <div className="hidden md:flex w-2/12 justify-center my-4 md:my-0">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-deep-red to-metallic-gold flex items-center justify-center text-2xl font-bold shadow-lg glow-red"
                >
                  {step.number}
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Jubilee Hills, Hyderabad',
      rating: 5,
      text: 'archities transformed our villa into a masterpiece. Their attention to detail and innovative 3D visualization made the entire process seamless. Highly recommend!',
      role: 'Homeowner'
    },
    {
      name: 'Priya Sharma',
      location: 'Banjara Hills, Hyderabad',
      rating: 5,
      text: 'The team at archities delivered beyond our expectations. Our office space is now modern, functional, and truly represents our brand. Exceptional work!',
      role: 'Business Owner'
    },
    {
      name: 'Venkat Reddy',
      location: 'Vijayawada',
      rating: 5,
      text: 'Professional, creative, and reliable. They completed our restaurant interior on time and within budget. The design has received countless compliments!',
      role: 'Restaurant Owner'
    },
    {
      name: 'Lakshmi Devi',
      location: 'Visakhapatnam',
      rating: 5,
      text: 'Our apartment renovation was handled with such care and expertise. The sustainable design elements they incorporated are both beautiful and eco-friendly.',
      role: 'Apartment Owner'
    },
    {
      name: 'Anil Reddy',
      location: 'Gachibowli, Hyderabad',
      rating: 5,
      text: 'From initial consultation to final reveal, archities maintained excellent communication. Our penthouse is now a stunning blend of luxury and comfort.',
      role: 'Property Developer'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="section-padding bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background h-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            Hear what our valued clients have to say about their experience
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-dark p-12 rounded-3xl border border-mid-gray"
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-3xl text-metallic-gold">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-light-gray text-center mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="text-center">
                <h4 className="text-xl font-bold text-crimson-red mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-light-gray">
                  {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-crimson-red w-8'
                    : 'bg-mid-gray hover:bg-light-gray'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-charcoal/80 hover:bg-crimson-red text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-charcoal/80 hover:bg-crimson-red text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setFormStatus('error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setFormStatus('error');
      return;
    }

    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      setFormStatus('');
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-charcoal to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            Ready to transform your space? Let's discuss your project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-2xl border border-mid-gray">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-light-gray">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-mid-gray rounded-lg focus:border-crimson-red focus:outline-none text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-light-gray">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-mid-gray rounded-lg focus:border-crimson-red focus:outline-none text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-light-gray">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-mid-gray rounded-lg focus:border-crimson-red focus:outline-none text-white"
                  placeholder="9876543210"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="projectType" className="block text-sm font-semibold mb-2 text-light-gray">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-charcoal border border-mid-gray rounded-lg focus:border-crimson-red focus:outline-none text-white"
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential Interior</option>
                  <option value="commercial">Commercial Space</option>
                  <option value="kitchen">Modular Kitchen</option>
                  <option value="office">Office Fitout</option>
                  <option value="renovation">Renovation</option>
                  <option value="consultation">3D Consultation</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-light-gray">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-charcoal border border-mid-gray rounded-lg focus:border-crimson-red focus:outline-none text-white resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400"
                >
                  Thank you! We'll get back to you soon.
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400"
                >
                  Please fill all required fields correctly.
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-deep-red to-crimson-red text-white px-8 py-4 rounded-full font-semibold text-lg glow-red"
              >
                Transform Your Space Today
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid gap-6">
              {[
                {
                  icon: '📍',
                  title: 'Visit Us',
                  info: 'Banjara Hills, Hyderabad, Telangana 500034'
                },
                {
                  icon: '📞',
                  title: 'Call Us',
                  info: '+91 9876543210'
                },
                {
                  icon: '📧',
                  title: 'Email Us',
                  info: 'hello@archities.in'
                },
                {
                  icon: '⏰',
                  title: 'Working Hours',
                  info: 'Mon - Sat: 9:00 AM - 7:00 PM'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="glass-dark p-6 rounded-xl border border-mid-gray hover:border-crimson-red transition-all flex items-center gap-4"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-crimson-red mb-1">{item.title}</h4>
                    <p className="text-light-gray">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="glass-dark p-4 rounded-2xl border border-mid-gray overflow-hidden">
              <div className="w-full h-64 bg-gradient-to-br from-mid-gray to-charcoal rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-light-gray">
                    Interactive Map<br />
                    <span className="text-sm">Hyderabad & Vijayawada Offices</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map((social, index) => (
                <motion.a
                  key={index}
                  href={`#${social}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full glass-dark border border-mid-gray hover:border-crimson-red flex items-center justify-center transition-colors"
                  aria-label={`Visit our ${social} page`}
                >
                  <span className="text-xl">
                    {social === 'facebook' && '📘'}
                    {social === 'instagram' && '📷'}
                    {social === 'linkedin' && '💼'}
                    {social === 'twitter' && '🐦'}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-mid-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">archities</h3>
            <p className="text-light-gray text-sm leading-relaxed">
              Transforming spaces across Andhra Pradesh and Telangana with innovative design and exceptional craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['About', 'Services', 'Portfolio', 'Process', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-light-gray hover:text-crimson-red transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {['Residential Interior', 'Commercial Spaces', 'Modular Kitchens', 'Office Fitouts', 'Renovations'].map((service) => (
                <li key={service}>
                  <span className="text-light-gray">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-white mb-4">We Serve</h4>
            <ul className="space-y-2 text-sm text-light-gray">
              <li>Hyderabad</li>
              <li>Vijayawada</li>
              <li>Visakhapatnam</li>
              <li>Guntur</li>
              <li>Warangal</li>
              <li>Tirupati</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-mid-gray pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-light-gray">
            © 2025 archities. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-light-gray hover:text-crimson-red transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-light-gray hover:text-crimson-red transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;

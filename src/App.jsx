import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function QuantumCore() {
  const core = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    core.current.rotation.y = t * 0.4
    core.current.rotation.x = Math.sin(t * 0.3) * 0.4
  })

  return (
    <group ref={core}>
      <Sphere args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color="#A855F7"
          emissive="#7C3AED"
          emissiveIntensity={1.7}
          metalness={0.7}
          roughness={0.15}
          transparent
          opacity={0.95}
        />
      </Sphere>

      <Sphere args={[1.8, 64, 64]}>
        <meshStandardMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>
    </group>
  )
}

function FloatingOrbs() {
  const orbs = new Array(8).fill(0)
  return (
    <group>
      {orbs.map((_, i) => {
        const angle = (i / orbs.length) * Math.PI * 2
        const radius = 3.8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={i} position={[x, Math.sin(i) * 0.5, z]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#22D3EE' : '#4ADE80'}
              emissive={i % 2 === 0 ? '#22D3EE' : '#4ADE80'}
              emissiveIntensity={1.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function App() {
  const navigate = useNavigate()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // listen for online / offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // redirect only when online
  useEffect(() => {
    if (!isOnline) return
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 3000)
    return () => clearTimeout(timer)
  }, [isOnline, navigate])

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, #1E40AF 0, #020617 55%, #000000 100%)',
        overflowX: 'hidden',
        overflowY: 'hidden',
        color: 'white',
        fontFamily: 'Orbitron, system-ui',
        position: 'relative',
      }}
    >
      {/* animated glow background */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.2, 0.5, 0.3],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-40%',
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.15), transparent 60%), radial-gradient(circle at 100% 100%, rgba(139,92,246,0.25), transparent 55%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      {/* main card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '2.5rem',
          padding: '2.6rem 3.4rem 3rem',
          borderRadius: '28px',
          background: 'rgba(15,23,42,0.9)',
          boxShadow: '0 0 50px rgba(59,130,246,0.45)',
          border: '1px solid rgba(148,163,184,0.4)',
          maxWidth: '1150px',
          width: '100%',
        }}
      >
        {/* left: 3D animation */}
        <div style={{ height: '460px' }}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            style={{ borderRadius: '22px' }}
          >
            <color attach="background" args={['#020617']} />
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Stars radius={90} depth={45} count={900} factor={4} />
            <QuantumCore />
            <FloatingOrbs />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.7}
            />
          </Canvas>
        </div>

        {/* right: logo + text + footer + offline error */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '0.25rem' }}
          >
            <img
              src="/unnamed.jpg"
              alt="QuantumYou logo"
              style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 45px rgba(59,130,246,1)',
                border: '5px solid rgba(248,250,252,0.98)',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.08 }}
          >
            QUANTUM
            <span
              style={{
                display: 'block',
                background:
                  'linear-gradient(120deg,#38BDF8,#A855F7,#F97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              YOU
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ fontSize: '1.02rem', opacity: 0.9 }}
          >
            A quantum‑inspired life simulator for kids and teens.
            Watch the Quantum Core spin while your future timelines load.
          </motion.p>

          {!isOnline && (
            <div
              style={{
                marginTop: '0.4rem',
                padding: '0.7rem 1rem',
                borderRadius: '999px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(248, 113, 113, 0.7)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#fecaca',
              }}
            >
              No internet connection. Connect to the internet to continue your
              Quantum journey.
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              fontSize: '0.9rem',
              opacity: 0.9,
              marginTop: '1.6rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>By Quantum AI Labs • Made with ❤️ in India</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="Flag of India"
              style={{
                width: '22px',
                height: '15px',
                borderRadius: '2px',
                boxShadow: '0 0 6px rgba(0,0,0,0.6)',
              }}
            />
          </motion.div>
        </div>

        {/* loading bar – only moves when online */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: isOnline ? '70%' : '0%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '15%',
            bottom: '0.9rem',
            height: '4px',
            borderRadius: '999px',
            overflow: 'hidden',
            background: 'rgba(15,23,42,0.9)',
            border: '1px solid rgba(148,163,184,0.4)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(90deg,#22C55E,#38BDF8,#A855F7,#F97316)',
              boxShadow: '0 0 10px rgba(56,189,248,0.8)',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

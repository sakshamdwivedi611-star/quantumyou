import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from './firebase'

export default function Onboarding() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setError('')
      setLoading(true)
      await signInWithPopup(auth, googleProvider)
      alert('Google sign‑in successful!')
      // later: navigate to dashboard
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false) // ensures button becomes clickable again
    }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    try {
      setError('')
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      alert('Email sign‑in successful!')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookLogin = () => {
    alert('Facebook login will be added after connecting Facebook developer app.')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background:
          'radial-gradient(circle at top, #0F172A 0, #020617 60%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'Orbitron, system-ui',
        color: 'white',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '960px',
          background: 'rgba(15,23,42,0.96)',
          borderRadius: '28px',
          padding: '2.8rem 3.2rem',
          boxShadow: '0 0 40px rgba(56,189,248,0.55)',
          border: '1px solid rgba(148,163,184,0.45)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: '2.5rem',
        }}
      >
        {/* Left side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Sign in to{' '}
            <span
              style={{
                background:
                  'linear-gradient(120deg,#38BDF8,#A855F7,#F97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              QuantumYou
            </span>
          </h1>

          <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
            Create your digital twin, save your progress, and unlock quantum
            timelines across all your devices.
          </p>

          <ul
            style={{
              fontSize: '0.85rem',
              opacity: 0.85,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>• Safe for children & teens</li>
            <li>• No financial questions for minors</li>
            <li>• 100% free to explore your Future You</li>
          </ul>
        </div>

        {/* Right side: login panel */}
        <div
          style={{
            background: 'rgba(15,23,42,0.9)',
            borderRadius: '22px',
            padding: '1.8rem 1.9rem',
            border: '1px solid rgba(148,163,184,0.45)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              marginBottom: '0.6rem',
            }}
          >
            Log in to continue
          </h2>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.7)',
              background: loading
                ? 'rgba(15,23,42,0.5)'
                : 'rgba(15,23,42,0.9)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background:
                  'conic-gradient(from 45deg, #EA4335, #FBBC05, #34A853, #4285F4, #EA4335)',
              }}
            />
            {loading ? 'Connecting to Google…' : 'Continue with Google'}
          </button>

          {/* Facebook (placeholder) */}
          <button
            type="button"
            onClick={handleFacebookLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '999px',
              border: '1px solid rgba(59,130,246,0.7)',
              background:
                'linear-gradient(120deg,#1D4ED8,#2563EB,#1D4ED8)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: 'white',
                color: '#1877F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
              }}
            >
              f
            </span>
            Continue with Facebook
          </button>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0.4rem 0',
            }}
          >
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'rgba(51,65,85,0.9)',
              }}
            />
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>OR</span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'rgba(51,65,85,0.9)',
              }}
            />
          </div>

          {/* Email login */}
          <form
            onSubmit={handleEmailLogin}
            style={{ display: 'grid', gap: '0.8rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.8rem', opacity: 0.8 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '0.65rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(148,163,184,0.7)',
                  background: 'rgba(15,23,42,0.95)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.8rem', opacity: 0.8 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '0.65rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(148,163,184,0.7)',
                  background: 'rgba(15,23,42,0.95)',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  marginTop: '0.2rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '999px',
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(248,113,113,0.7)',
                  fontSize: '0.75rem',
                  color: '#fecaca',
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '999px',
                border: 'none',
                background:
                  'linear-gradient(120deg,#22C55E,#38BDF8,#A855F7,#F97316)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 0 16px rgba(56,189,248,0.7)',
              }}
            >
              {loading ? 'Loading…' : 'Log in with Email'}
            </button>
          </form>

          <div
            style={{
              marginTop: '0.6rem',
              fontSize: '0.75rem',
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            By continuing, you agree to QuantumYou&apos;s simulation terms.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

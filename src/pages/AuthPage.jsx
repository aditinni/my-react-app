import React, { useState } from 'react';

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
  LinearProgress,
  CircularProgress,
  Fade,
} from '@mui/material';

import {
  Email,
  Lock,
  Person,
  AutoStories,
  Visibility,
  VisibilityOff,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/authService';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ error: '', success: '' });

  const navigate = useNavigate();

  const rules = [
    { label: '8+ chars', valid: formData.password.length >= 8 },
    { label: '1 number',  valid: /\d/.test(formData.password) },
    { label: '1 special', valid: /[ @$!%*?&]/.test(formData.password) },
  ];
  const strength = (rules.filter((r) => r.valid).length / rules.length) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && strength < 100) {
      setStatus({ error: 'Please fulfill all password requirements.', success: '' });
      return;
    }
    setLoading(true);
    setStatus({ error: '', success: '' });
    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password);
        navigate('/home');
      } else {
        await authService.register(formData.name, formData.email, formData.password);
        setStatus({ success: 'Account created successfully! Please login', error: '' });
        setIsLogin(true);
        setFormData({ ...formData, password: '' });
      }
    } catch (err) {
      setStatus({ error: err.message, success: '' });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStatus({ error: '', success: '' });
    setFormData({ name: '', email: '', password: '' });
  };

  // Quote changes between login / signup
  const quote = isLogin
    ? { pre: '"Every story', em: 'begins', post: 'with\na single word."' }
    : { pre: '"Every great', em: 'journey', post: 'starts with\none step."' };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      background: '#0C0C0F',
      overflow: 'hidden',
    }}>

      {/* ═══════════════════════════════
          LEFT PANEL — visible everywhere
      ═══════════════════════════════ */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'center', md: 'space-between' },
        alignItems: { xs: 'center', md: 'flex-start' },
        width: { xs: '100%', md: '44%' },
        minHeight: { xs: 'auto', md: '100vh' },
        py: { xs: 3.5, md: 6 },
        px: { xs: 3, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #13111A 0%, #1C1629 60%, #0F1521 100%)',
        borderBottom: { xs: '1px solid rgba(255,255,255,0.05)', md: 'none' },
        borderRight: { xs: 'none', md: '1px solid rgba(255,255,255,0.04)' },
        textAlign: { xs: 'center', md: 'left' },
        gap: { xs: 2.5, md: 0 },
      }}>

        {/* Ambient orb */}
        <Box sx={{
          position: 'absolute',
          width: { xs: 220, md: 420 },
          height: { xs: 220, md: 420 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,140,255,0.18) 0%, transparent 70%)',
          top: { xs: '-50px', md: '30%' },
          left: { xs: '-50px', md: '50%' },
          transform: { xs: 'none', md: 'translate(-50%, -50%)' },
          pointerEvents: 'none',
          filter: 'blur(12px)',
        }} />

        {/* Texture lines */}
        <Box sx={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)`,
          pointerEvents: 'none',
        }} />

        {/* ── Logo ── */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          zIndex: 1,
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: '10px',
            background: 'linear-gradient(135deg, #C4A8FF, #8B6FE8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(130,90,255,0.35)',
            flexShrink: 0,
          }}>
            <AutoStories sx={{ color: 'white', fontSize: 17 }} />
          </Box>
          <Typography sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.68rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            The Story Nook
          </Typography>
        </Box>

        {/* ── Animated quote ── */}
        <Box sx={{ zIndex: 1, width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'q-login' : 'q-signup'}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography sx={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: { xs: 'clamp(1.1rem, 4.5vw, 1.5rem)', md: 'clamp(1.8rem, 3vw, 2.8rem)' },
                fontWeight: 300,
                lineHeight: 1.3,
                color: 'rgba(255,255,255,0.92)',
                letterSpacing: '-0.01em',
                mb: { xs: 0, md: 2.5 },
                whiteSpace: 'pre-line',
              }}>
                {quote.pre}{'\n'}
                <Box component="span" sx={{ fontStyle: 'italic', color: '#C4A8FF' }}>
                  {quote.em}
                </Box>
                {' '}{quote.post}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Hairline rule — desktop only */}
          <Box sx={{
            display: { xs: 'none', md: 'block' },
            width: 40, height: 1,
            background: 'rgba(196,168,255,0.4)',
            mt: 0,
          }} />
        </Box>

        {/* Bottom label — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, zIndex: 1 }}>
          <Typography sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.15)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            est. {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>

      {/* ═══════════════════════════════
          RIGHT PANEL — form
      ═══════════════════════════════ */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2.5, sm: 5 },
        py: { xs: 4, md: 6 },
        background: '#0C0C0F',
        minHeight: { xs: 'auto', md: '100vh' },
      }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>

          {/* Eyebrow — slides on switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'ey-in' : 'ey-up'}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.22 }}
            >
              <Typography sx={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C4A8FF',
                mb: 1.5,
              }}>
                {isLogin ? '— Welcome back' : '— New member'}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Heading — fades up on switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'h-in' : 'h-up'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography sx={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.1,
                mb: 1,
                letterSpacing: '-0.01em',
                whiteSpace: 'pre-line',
              }}>
                {isLogin ? 'Sign in to my\nworld of stories' : 'Create your\naccount'}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Sub-heading — fades on switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'sub-in' : 'sub-up'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <Typography sx={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.28)',
                mb: 3.5,
                fontFamily: 'system-ui, sans-serif',
              }}>
                {isLogin ? 'Stories are waiting.' : 'Join a world of beautiful stories.'}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Alerts */}
          <Fade in={!!status.error}>
            <Box>
              {status.error && (
                <Alert severity="error" sx={{
                  mb: 2.5, borderRadius: '12px',
                  background: 'rgba(255,80,80,0.1)',
                  border: '1px solid rgba(255,80,80,0.2)',
                  color: '#FF9090',
                  '& .MuiAlert-icon': { color: '#FF9090' },
                }}>
                  {status.error}
                </Alert>
              )}
            </Box>
          </Fade>

          <Fade in={!!status.success}>
            <Box>
              {status.success && (
                <Alert severity="success" sx={{
                  mb: 2.5, borderRadius: '12px',
                  background: 'rgba(80,220,140,0.1)',
                  border: '1px solid rgba(80,220,140,0.2)',
                  color: '#80FFBA',
                  '& .MuiAlert-icon': { color: '#80FFBA' },
                }}>
                  {status.success}
                </Alert>
              )}
            </Box>
          </Fade>

          {/* Form — slides in on switch */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'form-login' : 'form-signup'}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <fieldset disabled={loading} style={{ border: 'none', padding: 0, margin: 0 }}>

                {!isLogin && (
                  <TextField
                    fullWidth required margin="normal"
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />
                )}

                <TextField
                  fullWidth required margin="normal"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />

                <TextField
                  fullWidth required margin="normal"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: 'rgba(255,255,255,0.5)' } }}
                        >
                          {showPassword
                            ? <VisibilityOff sx={{ fontSize: 18 }} />
                            : <Visibility sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />

                {!isLogin && (
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <LinearProgress
                      variant="determinate"
                      value={strength}
                      sx={{
                        height: 2, borderRadius: 10, mb: 2,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 10,
                          background: strength === 100
                            ? 'linear-gradient(90deg, #43E97B, #38F9D7)'
                            : 'linear-gradient(90deg, #C4A8FF, #8B6FE8)',
                        },
                      }}
                    />
                    <Stack direction="row" spacing={1.5}>
                      {rules.map((rule, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {rule.valid
                            ? <CheckCircle sx={{ fontSize: 12, color: '#43E97B' }} />
                            : <RadioButtonUnchecked sx={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }} />}
                          <Typography sx={{
                            fontSize: '0.68rem',
                            fontFamily: "'DM Mono', monospace",
                            color: rule.valid ? '#43E97B' : 'rgba(255,255,255,0.28)',
                            letterSpacing: '0.05em',
                          }}>
                            {rule.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}

                <Button
                  fullWidth type="submit" size="large"
                  variant="contained" disabled={loading}
                  sx={{
                    mt: 2, py: 1.75,
                    borderRadius: '14px',
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '0.02em',
                    background: 'linear-gradient(135deg, #9D78F2, #7254D4)',
                    boxShadow: '0 8px 24px rgba(130,90,255,0.3)',
                    border: '1px solid rgba(196,168,255,0.15)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 12px 32px rgba(130,90,255,0.45)',
                      background: 'linear-gradient(135deg, #AB8CF5, #8264E0)',
                    },
                    transition: 'all 0.25s ease',
                    '&:disabled': {
                      background: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {loading
                    ? <CircularProgress size={20} sx={{ color: 'rgba(255,255,255,0.6)' }} />
                    : isLogin ? 'Enter Library' : 'Create Account'}
                </Button>

              </fieldset>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', my: 3, gap: 2 }}>
            <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <Typography sx={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.18)',
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.1em',
            }}>
              OR
            </Typography>
            <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </Box>

          {/* Switch mode */}
          <Typography sx={{
            textAlign: 'center',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.28)',
            fontFamily: 'system-ui, sans-serif',
          }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <Button
              onClick={switchMode}
              sx={{
                ml: 0.75, fontWeight: 600, fontSize: '0.82rem',
                textTransform: 'none', fontFamily: 'system-ui, sans-serif',
                color: '#C4A8FF', p: 0, minWidth: 0, verticalAlign: 'baseline',
                '&:hover': { background: 'transparent', color: '#D8C4FF' },
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </Typography>

        </Box>
      </Box>
    </Box>
  );
}

const textFieldStyles = {
  mt: 1.5,
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.04)',
    transition: 'all 0.2s ease',
    '& fieldset': { border: '1px solid rgba(255,255,255,0.07)' },
    '&:hover': {
      background: 'rgba(255,255,255,0.06)',
      '& fieldset': { border: '1px solid rgba(196,168,255,0.2)' },
    },
    '&.Mui-focused': {
      background: 'rgba(196,168,255,0.06)',
      '& fieldset': { border: '1px solid rgba(196,168,255,0.4)' },
    },
    '& input': {
      color: 'rgba(255,255,255,0.88)',
      fontSize: '0.9rem',
      fontFamily: 'system-ui, sans-serif',
      '&::placeholder': { color: 'rgba(255,255,255,0.18)' },
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.25)',
    fontSize: '0.875rem',
    fontFamily: 'system-ui, sans-serif',
  },
  '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(196,168,255,0.7)' },
};
import React, { useState } from 'react';

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
  LinearProgress,
  CircularProgress,
  Divider,
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
  WavingHand,
} from '@mui/icons-material';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/authService';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({
    error: '',
    success: '',
  });

  const navigate = useNavigate();

  // Password validation
  const rules = [
    { label: '8+ chars', valid: formData.password.length >= 8 },
    { label: '1 number', valid: /\d/.test(formData.password) },
    { label: '1 special', valid: /[ @$!%*?&]/.test(formData.password) },
  ];

  const strength =
    (rules.filter((r) => r.valid).length / rules.length) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && strength < 100) {
      setStatus({
        error: 'Please fulfill all password requirements.',
        success: '',
      });
      return;
    }

    setLoading(true);
    setStatus({
      error: '',
      success: '',
    });

    try {
      if (isLogin) {
        await authService.login(
          formData.email,
          formData.password
        );

        navigate('/home');
      } else {
        await authService.register(
          formData.name,
          formData.email,
          formData.password
        );

        setStatus({
          success:
            'Account created successfully! Please login',
          error: '',
        });

        setIsLogin(true);

        setFormData({
          ...formData,
          password: '',
        });
      }
    } catch (err) {
      setStatus({
        error: err.message,
        success: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        px: 2,

        background:
          'linear-gradient(135deg, #fff7f0 0%, #f7ecff 45%, #eef4ff 100%)',
      }}
    >
      {/* Background blobs */}
      <Box
        sx={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: '#FFD6E8',
          filter: 'blur(90px)',
          top: -100,
          left: -100,
          opacity: 0.7,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: '#D7E8FF',
          filter: 'blur(90px)',
          bottom: -80,
          right: -80,
          opacity: 0.8,
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        style={{
          width: '100%',
          maxWidth: 460,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            overflow: 'hidden',

            p: { xs: 4, md: 5 },

            borderRadius: '32px',

            backdropFilter: 'blur(20px)',

            background: 'rgba(255,255,255,0.7)',

            border:
              '1px solid rgba(255,255,255,0.6)',

            boxShadow:
              '0 10px 40px rgba(130,120,255,0.12)',
          }}
        >
          {/* Top gradient line */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 6,

              background:
                'linear-gradient(90deg, #FF8DC7, #B388FF, #7BAEFF)',
            }}
          />

          {/* Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 4,
            }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,

                  mx: 'auto',
                  mb: 2,

                  borderRadius: '24px',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  background:
                    'linear-gradient(135deg, #FFB6D9, #C7B6FF)',

                  boxShadow:
                    '0 10px 30px rgba(199,182,255,0.35)',
                }}
              >
                <AutoStories
                  sx={{
                    color: 'white',
                    fontSize: 40,
                  }}
                />
              </Box>
            </motion.div>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#2B2B2B',
                mb: 1,
              }}
            >
              {isLogin
                ? 'Welcome Back 👋'
                : 'Create Account ✨'}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#7A7A7A',
                fontSize: '0.95rem',
              }}
            >
              {isLogin
                ? 'Continue your beautiful journey'
                : 'Join and start your magical story'}
            </Typography>
          </Box>

          {/* Alerts */}
          <Fade in={!!status.error}>
            <Box>
              {status.error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2,
                    borderRadius: '16px',
                  }}
                >
                  {status.error}
                </Alert>
              )}
            </Box>
          </Fade>

          <Fade in={!!status.success}>
            <Box>
              {status.success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2,
                    borderRadius: '16px',
                  }}
                >
                  {status.success}
                </Alert>
              )}
            </Box>
          </Fade>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <fieldset
              disabled={loading}
              style={{
                border: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {!isLogin && (
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person
                          sx={{
                            color: '#B388FF',
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />
              )}

              <TextField
                fullWidth
                required
                margin="normal"
                label="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email
                        sx={{
                          color: '#7BAEFF',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                required
                margin="normal"
                label="Password"
                type={
                  showPassword ? 'text' : 'password'
                }
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        sx={{
                          color: '#FF8DC7',
                        }}
                      />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              {/* Password Strength */}
              {!isLogin && (
                <Box
                  sx={{
                    mt: 2,
                    mb: 3,

                    p: 2,

                    borderRadius: '20px',

                    background:
                      'rgba(255,255,255,0.65)',

                    border:
                      '1px solid #EFEFEF',
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={strength}
                    sx={{
                      height: 8,
                      borderRadius: 10,
                      mb: 2,
                      bgcolor: '#ECECEC',

                      '& .MuiLinearProgress-bar': {
                        borderRadius: 10,

                        background:
                          strength === 100
                            ? 'linear-gradient(90deg, #43E97B, #38F9D7)'
                            : 'linear-gradient(90deg, #FF8DC7, #B388FF)',
                      },
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                  >
                    {rules.map((rule, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,

                          px: 1,
                          py: 0.5,

                          borderRadius: '999px',

                          background: rule.valid
                            ? '#ECFFF3'
                            : '#F7F7F7',
                        }}
                      >
                        {rule.valid ? (
                          <CheckCircle
                            sx={{
                              fontSize: 14,
                              color: '#43A047',
                            }}
                          />
                        ) : (
                          <RadioButtonUnchecked
                            sx={{
                              fontSize: 14,
                              color: '#BDBDBD',
                            }}
                          />
                        )}

                        <Typography
                          variant="caption"
                          sx={{
                            color: rule.valid
                              ? '#43A047'
                              : '#777',
                            fontWeight: 600,
                          }}
                        >
                          {rule.label}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.7,

                  borderRadius: '18px',

                  textTransform: 'none',

                  fontSize: '1rem',
                  fontWeight: 700,

                  background:
                    'linear-gradient(135deg, #FF8DC7, #B388FF)',

                  boxShadow:
                    '0 10px 25px rgba(179,136,255,0.35)',

                  '&:hover': {
                    transform:
                      'translateY(-2px)',

                    boxShadow:
                      '0 14px 30px rgba(179,136,255,0.45)',

                    background:
                      'linear-gradient(135deg, #FF74BB, #9D72FF)',
                  },

                  transition: '0.3s',
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'white',
                    }}
                  />
                ) : (
                  <>
                    <WavingHand
                      sx={{
                        mr: 1,
                        fontSize: 20,
                      }}
                    />

                    {isLogin
                      ? 'Enter Library'
                      : 'Create Account'}
                  </>
                )}
              </Button>
            </fieldset>
          </form>

          <Divider
            sx={{
              my: 3,
              color: '#AAA',
              fontSize: '0.85rem',
            }}
          >
            OR
          </Divider>

          {/* Bottom Text */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: '#666',
            }}
          >
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}

            <Button
              onClick={() => {
                setIsLogin(!isLogin);

                setStatus({
                  error: '',
                  success: '',
                });
              }}
              sx={{
                ml: 1,

                fontWeight: 700,

                textTransform: 'none',

                color: '#9D72FF',

                '&:hover': {
                  background: 'transparent',
                  color: '#7E57FF',
                },
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}

// INPUT FIELD STYLES
const textFieldStyles = {
  mt: 1.5,

  '& .MuiOutlinedInput-root': {
    borderRadius: '18px',

    background: '#F8F8FA',

    transition: '0.3s',

    '& fieldset': {
      border: 'none',
    },

    '&:hover': {
      background: '#F3F3F7',
    },

    '&.Mui-focused': {
      background: '#FFFFFF',
      boxShadow: 'none',

      '& fieldset': {
        border: 'none',
      },
    },
  },

  '& .MuiInputLabel-root': {
    color: '#888',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#777',
  },
};
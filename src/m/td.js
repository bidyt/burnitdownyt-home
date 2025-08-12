import { useState, useRef } from 'react';
import {Link} from "react-router-dom"
import emailjs from '@emailjs/browser';

const Contact= () => {
    const form = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [lastSubmitTime, setLastSubmitTime] = useState(0);

    // EmailJS configuration - use environment variables in production
    const EMAIL_CONFIG = {
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
        templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
        publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key'
    };

    const handleMediaKitDownload = () => {
        const link = document.createElement('a');
        link.href = 'Media-kit.pdf';
        link.download = 'MediaKit.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (ref) => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const validateBusinessForm = (formData) => {
        const name = formData.get('fullName')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();
        const honeypot = formData.get('website');

        // Honeypot check - if filled, likely spam
        if (honeypot) return { isValid: false, error: 'Form submission error' };

        // Basic business form validation
        if (!name || name.length < 2) {
            return { isValid: false, error: 'Please enter your full name' };
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { isValid: false, error: 'Please enter a valid email address' };
        }

        if (!message || message.length < 5) {
            return { isValid: false, error: 'Please enter a message' };
        }

        return { isValid: true };
    };

    const sendEmail = (e) => {
        e.preventDefault();
        
        // Simple rate limiting - prevent rapid submissions
        const now = Date.now();
        if (now - lastSubmitTime < 3000) { // 3 second cooldown
            setSubmitMessage('Please wait a moment before sending another message');
            return;
        }

        const formData = new FormData(form.current);
        const validation = validateBusinessForm(formData);
        
        if (!validation.isValid) {
            setSubmitMessage(validation.error);
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');
        setLastSubmitTime(now);

        // EmailJS sendForm returns a promise
        emailjs.sendForm(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            form.current,
            EMAIL_CONFIG.publicKey
        ).then(
            () => {
                setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                form.current.reset();
                setIsSubmitting(false);
                // Clear message after 5 seconds
                setTimeout(() => setSubmitMessage(''), 5000);
            },
            (error) => {
                console.error('Email error:', error);
                setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
                setIsSubmitting(false);
                // Clear message after 5 seconds
                setTimeout(() => setSubmitMessage(''), 5000);
            }
        );
    };

    // Safe icon components using Unicode/HTML entities
    const MenuIcon = () => <span style={{fontSize: '20px'}}>☰</span>;
    const CloseIcon = () => <span style={{fontSize: '20px'}}>✕</span>;
    const UserIcon = ({ isMobile = false }) => (<button
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: isMobile ? 'invert(1)' : 'none',
    }}
    aria-label="User"
  >
    <img src="user.png" alt="User Icon" style={{ width: '20px' }} />
  </button>
);

    const ShoppingBagIcon = () => (
  <button
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    aria-label="Shopping Bag"
  >
    <img src="shoppingbag.png" alt="Shopping Icon" style={{ width: '20px' }} />
  </button>
);

    const NavLinks = ({ isMobile = false, onItemClick }) => (
        <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
            <Link to="/#home"><button  className="nav-link">
                Home
            </button></Link>
            <Link to="/#shop"><button  className="nav-link">
                Shop
            </button></Link>
            <Link to="/#news"><button  className="nav-link">
                Latest News
            </button></Link>
            <Link to="/contact"><button  className="nav-link">
                Contact Us
            </button></Link>
            { isMobile && (
              <div className="mobile-user-icon">
            <UserIcon/>
            </div>
            )}
        </nav>
    )

    return (
        <>
            <style>{` * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background-color: #000;
                    color: white;
                    line-height: 1.6;
                }

                .container {
                    min-height: 100vh;
                    background-color: white;
                }
                .mobile-user-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 2rem;
                    gap: 0.5rem;
                    font-weight: 500;
                    background-color: transparent;
}
                @media (max-width: 768px) {
                      .header-right {
                        display: none;
                      }
                 }
                /* Header Styles */
                .header {
                    background-color: white;
                    border-bottom: 1px solid #e0e0e0;
                    padding: 0.8rem 0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .header-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: white;
                    position: relative;
                }

                 .desktop-nav {
                    display: none;
                    gap: 2.5rem;
                    background-color: white;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                      z-index: 10;
                }

                .nav-link {
                    background: none;
                    border: none;
                    color: Black;
                    background-color: white;
                    text-decoration: none;
                    font-size: 0.9rem;
                    cursor: pointer;
                    font-weight: 500;
                    transition: color 0.3s;
                    display: inline-flex;
                    align-items: center;
                    gap: 0rem;
                    white-space: nowrap;
                    padding: 0.5rem 1rem; 
                   
                }
                .nav-link:hover {
                    color: #000;
                    background-color: white;
                }
                
                .nav-link1.no-underline {
                   text-decoration: none;
                
                }
                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;
                    background-color: white;
                    flex: 1; /* Take up available space */
                    justify-content: flex-end;
                }

                .header-icon {
                    color: white;
                    background-color:white;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .header-icon:hover {
                    background-color: #f5f5f5;
                }

                .mobile-menu-btn {
                    background: none;
                    border: none;
                    color: #333;
                    cursor: pointer;
                    padding: 0.5rem;
                }

                /* Mobile Menu */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 10;
                    background-color: white;
                    z-index: 2000;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                }

                .mobile-menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .mobile-menu-header .logo {
                    color: white;
                }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    background-color: white;
                    color: white;
                }

                .mobile-nav .nav-link {
                    font-size: 1.1rem;
                    padding: 1rem 0;
                    border-bottom: white;
                    text-align: center;
                    color: black;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: #333;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                    /* === Contact Main === */
                 .contact-main {
                    background-color: white;
                    color: white;
                    padding: 3rem 1rem;
                    max-width: 800px;
                    margin: 0 auto;
                   }

                .contact-title {
                    text-align: center;
                    font-size: 2.8rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    color: #000;
                   }

                  /* Info‑cards container */
                .contact-info {
                     background-color: white;
                     color: black;
                     display: grid;
                     grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                     gap: 1.5rem;
                     margin-bottom: 3rem;
                   }
                .info-container {
                     display: grid; /* This helps manage spacing easily */
                     gap: 15px; /* The space between the stacked cards */
                    }
                /* Individual card */
                .info-card {
                    background-color: #f2f4f6;
                    border-radius: 0px;
                    padding: 1.5rem 1rem;
                    text-align: center;
                    /* Full width for mobile */
                   }
                @media (min-width: 768px) {
                         .info-container {
                              display: flex; /* Switch to flexbox for a horizontal layout */
                              gap: 20px; /* Adjust desktop spacing if needed */
                           }

                         .info-card {
                              flex: 1; /* This makes the cards take up equal width */
                           }
                        }

                          .info-icon {
                               font-size: 2rem;
                               margin-bottom: 0.5rem;
                               color: #333;
                            }

                          .info-heading {
                               font-size: 0.85rem;
                               letter-spacing: 1px;
                               margin-bottom: 0.25rem;
                               color: #555;
                              }

                          .info-text {
                               font-size: 1rem;
                               color: #222;
                               }

                         /* Contact form */
                          .contact-form {
                               display: flex;
                               flex-direction: column;
                               gap: 1.25rem;
                              }

                           .contact-form label {
                               display: flex;
                               flex-direction: column;
                               font-size: 0.75rem;
                               color: #555;
                              }

                          .contact-form input,
                          .contact-form textarea {
                                margin-top: 0.5rem;
                                padding: 0.75rem 1rem;
                                border: 1px solid #ccc;
                                border-radius: 4px;
                                font-size: 1rem;
                                color: #000;
                                background-color: #fff;
                              }

                          .submit-btn {
                                width: fit-content;
                                margin: 0 auto;
                                padding: 0.75rem 2rem;
                                background-color: #000;
                                color: #fff;
                                border: none;
                                border-radius: 4px;
                                font-size: 1rem;
                                font-weight: 500;
                                cursor: pointer;
                                transition: background-color 0.2s;
                               }

                          .submit-btn:hover {
                                background-color: #333;
                               }

                          .submit-btn:disabled {
                                background-color: #666;
                                cursor: not-allowed;
                               }

                          .form-message {
                                text-align: center;
                                padding: 0.75rem;
                                border-radius: 4px;
                                margin-top: 1rem;
                                font-size: 0.9rem;
                               }

                          .form-message.success {
                                background-color: #d4edda;
                                color: #155724;
                                border: 1px solid #c3e6cb;
                               }

                          .form-message.error {
                                background-color: #f8d7da;
                                color: #721c24;
                                border: 1px solid #f5c6cb;
                               }

                /* Responsive tweaks */
               @media (max-width: 480px) {
                    .contact-main {
                       padding: 2rem 0.5rem;
                      }
                    .submit-btn {
                       width: 60%;
                      }
                     }

                /* Footer */
                .footer {
                    background-color: black;
                    padding: 3rem 0 1rem;
                    color: black;
                }

                .footer-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .footer-nav {
                    display: flex;
                    flex-direction: column;
                    background:black;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    align-items: center;
                }

                .footer-nav .nav-link1 {
                    color: #ccc;
                    font-size: 0.9rem;
                    padding: 0.7rem 0;
                    width: 100%;
                    text-align: center;
                    background-color: black;
                    transition: color 0.3s, background-color 0.3s;
                    text-decoration: none;
                }

                .footer-nav .nav-link1:hover {
                    color: #fff;
                    background-color: black;
                    text-decoration: none;
                }

                .social-icons {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .social-icon {
                    width: 40px;
                    height: 40px;
                    background-color: #333;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    text-decoration: none;
                    transition: background-color 0.3s;
                    font-size: 1.1rem;
                    background-color: black;
                }

                .social-icon:hover {
                    background-color: #555;
                }
                button {
                    float: left;
                }

                .footer-text {
                    color: #666;
                    font-size: 0.85rem;
                    text-align: center;
                }
                a {
                    text-decoration:none;
                }
                    @media (min-width: 768px) {
                    .mobile-menu-btn {
                        display: none;
                    }

                    .desktop-nav, .header-right {
                        display: flex;
                    }
                        .footer-nav {
                        flex-direction: row;
                        justify-content: center;
                        flex-wrap: wrap;
                        gap: 2.5rem;
                        background-color: black;
                    }

                    .footer-nav .nav-link1 {
                        width: auto;
                        border-bottom: none;
                        padding: 0.5rem 0;
                        background-color: black;
                        text-decoration: none;

                    }

                    .footer-nav .nav-link1:hover {
                        background-color: black;
                        color: #black;
                        text-decoration: none;
                    }
                   
                  }
                @media screen and (min-width: 1024px) {
                     .submit-btn {
                        margin-left: 0;
                        text-align: left;
                        display: block;
                        }

                     .info-card {
                        width: 100%; /* expand the card to take more space */
                        max-width: 700px; /* you can increase this value */ /* slightly more spacing */
                      }              

                     .contact-info {
                        justify-content: center;
                        gap: 3rem;
                      }
                   }                  
                         .desktop-only {
                              display: inline-flex;
                        }

                          @media (max-width: 768px) {
                               .desktop-only {
                                    display: none !important;
                          }
                         }`} </style> 
            <div id="con" >
                <div className="container">

                {/* Header */}
                <header className="header" >
                    <div className="header-content">
                        <button 
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <MenuIcon />
                        </button>
                        
                        <NavLinks />
                        
                        <div className="header-right">
                            <div className="user-icon desktop-only">
                                <UserIcon />
                            </div>
  
                            <div className="header-icon">
                                <ShoppingBagIcon />
                            </div>
                        </div>

                        
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-menu-header">
                            <span className="logo">BURNITDOWNYT</span>
                            <button 
                                className="close-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <NavLinks isMobile={true} onItemClick={scrollToSection} />
                    </div>
                )}

                <main className="contact-main">
                    <h2 className="contact-title">Contact Us</h2>

                    {/* === Info Cards === */}
                    <div className="contact-info">
                        <div className="info-container">
                            <div className="info-card">
                                <div className="info-icon"><img src="address.png"/></div>
                                <h2 className="info-heading">ADDRESS</h2>
                                <h3 className="info-text">719 2nd Ave, New York NY 10016</h3>
                            </div>
                            <div className="info-card">
                                <div className="info-icon"><img src="phone.png"/></div>
                                <h2 className="info-heading">CONTACT US</h2>
                                <h3 className="info-text">+1 929 6129 615</h3>
                            </div>
                            <div className="info-card">
                                <div className="info-icon"><img src="email.png"/></div>
                                <h2 className="info-heading">EMAIL</h2>
                                <h3 className="info-text">burnitdownyt@gmail.com</h3>
                            </div>
                        </div>
                    </div>

                    {/* === Contact Form === */}
                    <form
                        ref={form}
                        className="contact-form"
                        onSubmit={sendEmail}
                    >
                        <label>
                            FULL NAME
                            <input type="text" placeholder="Your Name" name="fullName" required />
                        </label>
                        <label>
                            EMAIL ADDRESS
                            <input type="email" placeholder="Your Email" name="email" required />
                        </label>
                        <label>
                            MESSAGE
                            <textarea rows="5" placeholder="Your message" name="message" required />
                        </label>
                        
                        {/* Honeypot field - hidden from users, catches bots */}
                        <input type="text" name="website" style={{display: 'none'}} tabIndex="-1" />
                        
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                        
                        {submitMessage && (
                            <div className={`form-message ${submitMessage.includes('Thank you') || submitMessage.includes('success') ? 'success' : 'error'}`}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <nav className="footer-nav">
                            <Link to="/#home"><button  className="nav-link1">Home</button></Link>
                            <Link to="/#shop"><button  className="nav-link1">Shop</button></Link>
                            <a href="" target="_blank" rel="noopener noreferrer"><button className="nav-link1">2K Community</button></a>
                            <button onClick={handleMediaKitDownload} className="nav-link1">Media kit</button>
                            <Link to="/contact"><button className="nav-link1">Contact Us</button></Link>
                        </nav>
                        
                        <div className="social-icons">
                            <a href="" target="_blank" rel="noopener noreferrer" className="social-icon"><img src="instagram1.png"/></a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="social-icon"><img src="facebook1.png"/></a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="social-icon"><img src="youtube1.png"/></a>
                        </div>
                        
                        <p className="footer-text">© 2025 BURNITDOWNYT. All rights reserved.</p>
                    </div>
                </footer>
            </div>
            </div>
        </> 
    )
}

export default Contact;
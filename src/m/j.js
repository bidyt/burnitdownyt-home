
import { useState, useRef } from 'react';
import {Link, useLocation, useParams} from "react-router-dom"
const Product = () => {
    // Get data from navigation
    const { state } = useLocation();
    const { id } = useParams();
    
    // Use passed data or fallback to default
    const productData = state?.item;
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDiscountVisible, setIsDiscountVisible] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(true);
    
    // Refs for scrolling to sections
    const homeRef = useRef(null);
    const shopRef = useRef(null);
    const latestNewsRef = useRef(null);
    const scrollRef = useRef(null);
    
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
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

    // Safe icon components
    const MenuIcon = () => <span style={{fontSize: '20px'}}>☰</span>;
    const CloseIcon = () => <span style={{fontSize: '20px'}}>✕</span>;
    const UserIcon = ({ isMobile = false }) => (
        <button
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

    // Default product data (fallback)
    const defaultProduct = {
        id: 'wwe-undisputed-cena',
        name: "Tray Table",
        price: 1099.50,
        originalPrice: 2199.00,
        images: [
            "WWEBELTCENA.png",
            "contactformoreimages.png",
        ],
        description: "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks."
    };

    // Use passed product data or fallback to default
    const product = productData || defaultProduct;
    
    // Setup images array
    const images = [product.image || product.images?.[0] || "WWEBELTCENA.png"];
    if (product.secondaryImage) {
        images.push(product.secondaryImage);
    } else if (product.images?.[1]) {
        images.push(product.images[1]);
    } else {
        images.push("contactformoreimages.png");
    }

    // Parse prices - handle both string and number formats
    const parsePrice = (price) => {
        if (typeof price === 'string') {
            return parseFloat(price.replace(/[$,]/g, ''));
        }
        return typeof price === 'number' ? price : 0;
    };

    const productPrice = parsePrice(product.price);
    const productOriginalPrice = product.originalPrice ? parsePrice(product.originalPrice) : null;
    
    const [currentPrice, setCurrentPrice] = useState(productPrice);
    const [origPrice, setOrigPrice] = useState(productOriginalPrice);
    const [quantity, setQuantity] = useState(1);

    // Related Products Data
    const relatedProducts = [
        {
            id: 1,
            name: "WWE Winged Eagle Championship Belt",
            price: 899.50,
            originalPrice: 1799.00,
            image: "WIGNEDEAGLE_.png",
            badge: "NEW",
            discount: "-10%"
        },
        {
            id: 2,
            name: "WWE Big Gold World Heavyweight Championship",
            price: 1799.00,
            image: "WORLDTITLEE.png"
        },
        {
            id: 3,
            name: "WWE New World Heavyweight Championship Belt",
            price: 1999.00,
            image: "WORLDTITLE.png"
        },
        {
            id: 4,
            name: "WWE New NXT Championship",
            price: 1199.00,
            image: "NXTTITLE.png"
        },
        {
            id: 5,
            name: "WWE Spinner Championship with Custom name plate",
            price: 1699.00,
            image: "SPINNERBELTTT.png"
        },
        {
            id: 6,
            name: "Roman Reigns Tribal Chief Poster Autograph 2025",
            price: 699.00,
            image: "WWF-TITLEE.jpg"
        },
    ];
    
    const NavLinks = ({ isMobile = false, onItemClick }) => (
        <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
            {isMobile && (
                <div className="mobile-user-icon">
                    <UserIcon/>
                </div>
            )}
        </nav>
    );
    
    // Event Handlers
    const handleQuantityChange = (change) => {
        setQuantity(prev => {
            const newQty = Math.max(1, prev + change);
            setCurrentPrice(productPrice * newQty);
            if (productOriginalPrice) {
                setOrigPrice(productOriginalPrice * newQty);
            }
            return newQty;
        });
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const navigateToProduct = (productId) => {
        alert(`Navigating to product with ID: ${productId}`);
    };

    // Format price for display
    const formatPrice = (price) => {
        return typeof price === 'number' ? `$${price.toFixed(2)}` : price;
    };
    
    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background-color: white;
                    color: black;
                    line-height: 1.6;
                }

                .container {
                    min-height: 100vh;
                    background-color: white;
                }

                /* Discount Banner */
                .discount-banner {
                    background-color: #F5F5F5;
                    color: black;
                    text-align: center;
                    padding: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    position: relative;
                }
                .nav-arrow {
                    display: inline-block;
                    vertical-align: middle;
                    width: 14px;
                    height: 14px;
                    margin-left: 4px;
                
                }
               .related-products-section .more-products-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px; /* optional: adds spacing between text and image */
                }

                .related-products-section .nav-arrow {
                    width: 14px;
                    height: 14px;
                    margin-top: -2px; /* adjust as needed */
                    margin-left: -4px; /* or even negative if needed */
                    vertical-align: middle;
                }


                .discount-banner .discount-icon {
                    display: flex;
                    align-items: center;
                }     

                .discount-close {
                    position: absolute;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: black;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .discount-close:hover {
                    color: #666;
                }                 

                .shop-now {
                    color: #007bff;
                    text-decoration: underline;
                    font-weight: 500;
                    margin-left: -2px;
                    display: inline-flex;
                    align-items: center;
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
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 1rem;
                    background-color: white;
                    position: relative;
                }

                .mobile-menu-btn {
                    background: none;
                    border: 0;
                    color: #333;
                    cursor: pointer;
                    padding: 0.5rem;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;
                    background-color: white;
                    flex: 1;
                    justify-content: flex-end;
                }

                @media (max-width: 768px) {
                    .header-right {
                        display: none;
                    }
                }     

                .header-icon {
                    color: #333;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .header-icon:hover {
                    background-color: #f5f5f5;
                }

                .desktop-only {
                    display: block;
                }

                @media (max-width: 768px) {
                    .desktop-only {
                        display: none !important;
                    }
                }

                /* Mobile Image Navigation */
                .mobile-image-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%);
                    padding: 0 10px;
                    pointer-events: none;
                }

                .mobile-image-nav button {
                    background: white;
                    color: black;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    pointer-events: all;
                    font-size: 14px;
                }

                @media (min-width: 768px) {
                    .mobile-image-nav {
                        display: none;
                    }
                }
                    .header-right {
                        display: flex;
                    }

                    /* Add this rule to show the secondary image on larger screens */
                    .secondary-image {
                        display: block;
                    }


                /* Mobile Menu */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
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

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    background-color: white;
                    color: black;
                }

                .mobile-nav .nav-link {
                    font-size: 1.1rem;
                    padding: 1rem 0;
                    border-bottom: 1px solid #eee;
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

                /* Main Content */
                .main-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                    background: white;
                }

                /* Product Layout */
                /*.product-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 4rem;
                }*/
                   .product-layout {
                      display: grid;
                      grid-template-columns: auto 1fr;
                      gap: 3rem;
                      align-items: start;
                    }

                @media (min-width: 768px) {
                    .product-layout {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        gap: 3rem;
                        align-items: start;
                    }
                    
                    .product-images-section {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .product-info-section {
                        grid-column: 2;
                    }
                }
                    @media (max-width: 767px) {
                         /* switch to single column */
                    .product-layout {
                         display: block;
                         flex-direction: column;
                         gap: 1rem;
                    }
                    .product-images-section {
                          display: flex;
                          flex-direction: column;
                          align-items: center; 
                          justify-content: center;
                          padding: 1rem;     
                    }

                      /* hide the second thumbnail image */
                    .secondary-image {
                         display: none;
                    }

                    /* show arrows on the main image */
                    .mobile-image-nav {
                          display: flex;
                    }
                    
                    .badge-container.hide-badges {
                    display: none;
                }


                   /* make the main image fill the width */
                    .main-product-image {
                          width: 100%; !important;
                          max-width:600px;!important;
                          margin: 0 auto; 
                          height: 400px; !important;
                          display:block;  
                          position: relative;       /* let height expand as needed */
                          
                    }
                    .main-product-image img {
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                            object-position:center;
                            
                           
                    }
                }

                /* Product Images Section */
                .product-images-section {
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                @media (min-width: 768px) {
                     .main-product-image img {
                     content: url("WWEBELTCENA.png");
                     }
                 }

                .main-product-image {
                    position: relative;
                    width: 250px;
                    height: 330px;
                    background: #f8f9fa;
                    border-radius: 0px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .main-product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .badge-container {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    z-index: 10;
                }
                
                /* Hide badges when showing the contact image */
                .badge-container.hide-badges {
                    display: none;
                }

                .product-badge,
                .discount-badge {
                    position: static;
                    padding: 5px 6px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: bold;
                }

                .product-badge {
                    background: white;
                    color: black;
                }

                .discount-badge {
                    background: #08dc0f;
                    color: white;

                }

                .secondary-image {
                    position: relative;
                    width: 250px;
                    height: 330px;
                    background: #f8f9fa;
                    border-radius: 0px;
                    overflow: hidden;
                    flex-shrink: 0;
                    cursor: pointer;
                }

                .secondary-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                /* Product Info Section */
                .product-info-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .product-title {
                    font-size: 2.5rem;
                    font-weight: 500;
                    color: #111;
                    margin: 0;
                }

                .product-description {
                    color: #666;
                    line-height: 1.6;
                    font-size: 1rem;
                }

                .price-container {
                    display: flex;
                    align-items: baseline;
                    gap: 1rem;
                }

                .current-price {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #111;
                }

                .original-price {
                    font-size: 1rem;
                    color: #999;
                    text-decoration: line-through;
                }

                /* Product Controls */
                .product-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .quantity-wishlist-row {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .quantity-selector {
                    display: flex;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .quantity-btn {
                    background: quantity-btn;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    font-size: 16px;
                    color: #666;
                    transition: background 0.2s;
                }

                .quantity-btn:hover {
                    background: #f5f5f5;
                }

                .quantity-display {
                    border: none;
                    border-left: 1px solid #ddd;
                    border-right: 1px solid #ddd;
                    padding: 10px 15px;
                    text-align: center;
                    width: 60px;
                    font-size: 16px;
                    background:  #f5f5f5;
                }
                    .quantity-display::-webkit-outer-spin-button,
                    .quantity-display::-webkit-inner-spin-button {
                     -webkit-appearance: none;
                      margin: 0;
                     }

                .wishlist-button {
                    background: white;
                    border: 1px solid #black;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    transition: all 0.2s;
                    flex: 1;
                    justify-content: center;
                }

                .wishlist-button:hover,
                .wishlist-button.active {
                    border-color: #111;
                    background: #f9f9f9;
                }

                .add-to-cart-button {
                    background: #111;
                    color: white;
                    border: none;
                    padding: 15px 24px;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                    width: 100%;
                }

                .add-to-cart-button:hover {
                    background: #333;
                }

                /* Additional Info */
                .additional-info-section {
                    border-top: 1px solid #eee;
                    padding-top: 1.5rem;
                }

                .info-toggle-button {
                    background: none;
                    border: none;
                    width: 100%;
                    text-align: left;
                    font-size: 16px;
                    font-weight: 500;
                    padding: 0;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .info-content {
                    margin-top: 1rem;
                    color: #666;
                    line-height: 1.6;
                }

                .info-toggle-icon {
                    font-size: 18px;
                    color: #666;
                }

                /* Related Products Section */
                .related-products-section {
                    margin-top: 4rem;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #111;
                }

                .more-products-link {
                    background: none;
                    border: none;
                    color: black;
                    text-decoration: underline;
                    font-size: 14px;
                    cursor: pointer;
                }
                .section-header .more-products-link {
                    display: none;
                }

                /* Mobile more products button - shown below scroll container */
                .mobile-more-products {
                      display: flex;
                      justify-content: left;
                      margin-top: 1.5rem;
                      margin-bottom: 2rem;
                }

                .mobile-more-products .more-products-link {
                      display: flex;
                      align-items: left;
                      gap: 8px;
                      background: none;
                      border: none;
                      color: black;
                      text-decoration: underline;
                      font-size: 14px;
                      cursor: pointer;
                }
                .products-scroll-container {
                    position: relative;
                    overflow: hidden;
                    
                }

                .products-grid {
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    scrollbar-width: thin;
                    scrollbar-color: #ccc #f1f1f1;
                    padding-bottom: 1rem;
                }

                .products-grid::-webkit-scrollbar {
                    background: black;
                    height: 8px;
                }

                .products-grid::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }

                .products-grid::-webkit-scrollbar-thumb {
                    background: black;
                    border-radius: 4px;
                }

                .products-grid::-webkit-scrollbar-thumb:hover {
                   color: black;
                }

                .product-card {
                    flex: 0 0 250px;
                    background: white;
                    border-radius: 0px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.2s;
                    position: relative;
                }

                .product-card:hover {
                    transform: translateY(-4px);
                }

                .product-card-image {
                    width: 100%;
                    height: 80%;
                    background: #f8f9fa;
                    position: relative;
                    overflow: hidden;
                }

                .product-card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-container {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    z-index: 10;
                }

                .card-badge,
                .card-discount {
                    position: static;
                    padding: 5px 6px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: bold;
                }

                .card-badge {
                    background: white;
                    color: black;
                }

                .card-discount {
                    background: #08dc0f;
                    color: white;
                }

                .product-card-info {
                    padding: 1rem;
                }

                .product-card-title {
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                    color: #111;
                    line-height: 1.3;
                }

                .product-card-price {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .card-current-price {
                    font-weight: 600;
                    color: #111;
                }

                .card-original-price {
                    color: #999;
                    text-decoration: line-through;
                    font-size: 14px;
                }

                @media (min-width: 1024px) {
                    .product-card {
                        flex: 0 0 280px;
                    }
                    
                    .products-grid {
                        gap: 1.5rem;
                    }
                }

                /* Footer */
                .footer {
                    background-color: black;
                    padding: 3rem 0 1rem;
                    color: white;
                }

                .footer-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .footer-nav {
                    display: flex;
                    flex-direction: column;
                    background: black;
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
                    border: none;
                    cursor: pointer;
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
                    background-color: black;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    text-decoration: none;
                    transition: background-color 0.3s;
                    font-size: 1.1rem;
                }

                .social-icon:hover {
                    background-color: #555;
                }

                .footer-text {
                    color: #666;
                    font-size: 0.85rem;
                    text-align: center;
                }

                a {
                    text-decoration: none;
                }

                /* Responsive Design */
                @media (min-width: 768px) {
                    .mobile-menu-btn {
                        display: none;
                    }

                    .header-right {
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
                        color: #fff;
                        text-decoration: none;
                    }
                }
                        .product-card {
        flex: 0 0 280px;
    }
    @media (min-width: 1024px) {
    .product-card {
        flex: 0 0 280px;
    }
    .products-grid {
        gap: 1.5rem;
    }
    
    /* Show more products link in header on desktop */
    .section-header .more-products-link {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    /* Hide mobile more products button on desktop */
    .mobile-more-products {
        display: none;
    }
    @media screen and (orientation: landscape) and (max-height: 500px) {
            .product-images-section {
                height: 100%;
                max-height: none;
            }
            
            .secondary-image {
                height: 260px;
            }
            
            .mobile-image-nav button {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
        }

        /* Portrait orientation adjustments */
        @media screen and (orientation: portrait) {
            .product-images-section {
                height: 180vh;
                min-height: 400px;
            }
        }
}
            `}</style>

            <div className="container">
                {/* Discount Banner */}
                {isDiscountVisible && (
                    <div className="discount-banner">
                        <span className="discount-icon"><img src="ticket-percent.svg" alt="Discount" /></span>
                        10% off store—Limited time!
                        <Link to="/#shop"  className="shop-now">
                            <img src="shop.svg" alt="Arrow" />
                        </Link>
                        <button 
                            className="discount-close"
                            onClick={() => setIsDiscountVisible(false)}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Header */}
                <header className="header">
                    <div className="header-content">
                        <button 
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <MenuIcon />
                        </button>
                        
                        <div className="header-right">
                            <div className="user-icon desktop-only">
                                <UserIcon />
                            </div>
                        </div>

                        <div className="header-icon">
                            <ShoppingBagIcon />
                        </div>
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-menu-header">
                            <button 
                                className="close-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <CloseIcon />
                            </button>
                            <div>
                                <NavLinks isMobile={true} onItemClick={scrollToSection} />
                            </div>
                        </div>
                    </div>
                )}  

                {/* Main Content */}
                <main className="main-content">
                    {/* Product Section */}
                    <div className="product-layout">
                        {/* Product Images */}
                        <div className="product-images-section">
                            <div className="main-product-image">
                                {currentImageIndex === 1 ? (
                                <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                <img
                                src={product.images[currentImageIndex]}
                                alt={`${product.name} additional view`}
                                />
                                </a>
                                ) : (
                                <img src={images[currentImageIndex]} alt={product.name}/>
)}
                                <img src={images[currentImageIndex]} alt={product.name} />
                                <div className={`badge-container ${currentImageIndex === 1 ? 'hide-badges' : ''}`}>
                                    <div className="product-badge">NEW</div>
                                    <div className="discount-badge">-10%</div>
                                </div>
                                <div className="mobile-image-nav">
                                    <button onClick={prevImage} aria-label="Previous image"> &lsaquo;</button>
                                    <button onClick={nextImage} aria-label="Next image">&rsaquo;</button>
                                </div>
                            </div>
                            <div className="secondary-image"  onClick={() => setCurrentImageIndex(1)}>
                                <a href="" target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
>
                                    <img src="contactformoreimages.png" alt={`${product.name} additional view`} />
                                </a>
                            </div>
                        </div>

                        {/* Product Info  */}
                        <div className="product-info-section">
                            <h2 className="product-title">{product.name}</h2>
                            
                            <p className="product-description">{product.description}</p>
                            
                            <div className="price-container">
                                <span className="current-price">{typeof currentPrice === 'string' ? currentPrice : `$${currentPrice.toFixed(2)}`}</span>
                                {origPrice && (
    <span className="original-price">
        {typeof origPrice === 'string' ? origPrice : `$${origPrice.toFixed(2)}`}
    </span>)}
                            </div>

                            <div className="product-controls">
                                <div className="quantity-wishlist-row">
                                    <div className="quantity-selector">
                                        <button 
                                            className="quantity-btn" 
                                            onClick={() => handleQuantityChange(-1)}
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <input 
                                            type="number" 
                                            value={quantity} 
                                            readOnly
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="quantity-display"
                                            min="1"
                                            aria-label="Product quantity"
                                        />
                                        <button 
                                            className="quantity-btn" 
                                            onClick={() => handleQuantityChange(1)}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button
                                        className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                    >
                                        <img src="Heart.png" alt="Heart" style={{width: '16px'}} />
                                        Wishlist
                                    </button>
                                </div>

                                <button className="add-to-cart-button">
                                    Add to Cart
                                </button>
                            </div>

                            <div className="additional-info-section">
                                <button 
                                    className="info-toggle-button"
                                    onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                                    aria-expanded={showAdditionalInfo}
                                >
                                    Additional Info
                                    <span className="info-toggle-icon">
                                        {showAdditionalInfo ? <img src="down.png"/> : <img src="up.png"/>}
                                    </span>
                                </button>
                                {showAdditionalInfo && (
                                    <div className="info-content">
                                        <h4>Details</h4>
                                        <p>You can use the removable tray for serving. The design makes it easy to put the tray
                                            back after use since you place it directly on the table frame without having to fit it 
                                            into any holes.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <section className="related-products-section">
                        <div className="section-header">
                            <h2 className="section-title">You might also like</h2>
                            <Link to="/#shop" onClick={() => scrollToSection(shopRef)}><button className="more-products-link"><img src="button.svg"/></button></Link>
                        </div>
                        
                        <div className="products-scroll-container">
                            <div className="products-grid" ref={scrollRef}>
                                {relatedProducts.map((item) => (
                                    <div key={item.id} className="product-card" onClick={() => navigateToProduct(item.id)}>
                                        <div className="product-card-image">
                                            <img src={item.image} alt={item.name} />
                                            <div className="card-container">
                                            {item.badge && <div className="card-badge">{item.badge}</div>}
                                            {item.discount && <div className="card-discount">{item.discount}</div>}
                                            </div>
                                        </div>
                                        <div className="product-card-info">
                                            <h3 className="product-card-title">{item.name}</h3>
                                            <div className="product-card-price">
                                                <span className="card-current-price">${item.price.toFixed(2)}</span>
                                                {item.originalPrice && (
                                                    <span className="card-original-price">
                                                        ${item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            
                           
                        </div>
                         <div className="mobile-more-products">
        <Link to="/#shop"><button className="more-products-link">
            <img src="button.svg"/>
        </button></Link>
        </div>
                    </section>
                </main>
                
               

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <nav className="footer-nav">
                            <Link to="/#home" onClick={() => scrollToSection(homeRef)}><button onClick={() => scrollToSection(homeRef)} className="nav-link1">Home</button></Link>
                            <Link to="/#shop"><button onClick={() => scrollToSection(shopRef)} className="nav-link1">Shop</button></Link>
                            <a href="" target="_blank" rel="noopener noreferrer"><button className="nav-link1">2K Community</button></a>
                            <button onClick={handleMediaKitDownload} className="nav-link1">Media kit</button>
                            <Link to="/Contact"><button onClick={() => console.log('Contact Us clicked')} className="nav-link1">Contact Us</button></Link>
                        </nav>
                        
                        <div className="social-icons">
                            <a href=""  target="_blank" rel="noopener noreferrer" className="social-icon"><img src="instagram1.png"/></a>
                            <a href="" className="social-icon"  target="_blank" rel="noopener noreferrer"><img src="facebook1.png"/></a>
                            <a href="" className="social-icon"  target="_blank" rel="noopener noreferrer"><img src="youtube1.png"/></a>
                        </div>
                        
                        <p className="footer-text">© 2025 BURNITDOWNYT. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Product;
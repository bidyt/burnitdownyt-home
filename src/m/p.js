import { useState, useRef, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom"
const BIDapp = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDiscountVisible, setIsDiscountVisible] = useState(true);
    
    // Carousel state
    const [newsCurrentIndex, setNewsCurrentIndex] = useState(0);
    const [shopCurrentIndex, setShopCurrentIndex] = useState(0);
    
    // Items per page based on screen size
    const itemsPerPage = 4;
    const shopitemsPerPage = 12;

    // News data (using same images as requested)
    const newsItems = [
        { id: 1, image: "instagrampostcover1.jpg", label: "NEW" , link:""},
        { id: 2, image: "instagrampost2cover.webp", label: "NEW", link:""},
        { id: 3, image: "instagrampostcover3.jpg", label: "NEW", link:"" },
        { id: 4, image: "instagrampostcover4.jpg", label: "NEW", link:"" },
        { id: 5, image: "instagrampostcover1.jpg", label: "NEW", link:""},
        { id: 6, image: "instagrampost2cover.webp", label: "NEW", link:"" },
        { id: 7, image: "instagrampostcover3.jpg", label: "NEW", link:""},
        { id: 8, image: "instagrampostcover4.jpg", label: "NEW", link:"" },
        { id: 9, image: "instagrampostcover1.jpg", label: "NEW", link:"" },
        { id: 10, image: "instagrampost2cover.webp", label: "NEW", link:"" },
        { id: 11, image: "instagrampostcover3.jpg", label: "NEW", link:""},
        { id: 12, image: "instagrampostcover4.jpg", label: "NEW", link:"" }
    ];
    
    // Shop data (using existing products)
    const shopItems = [
        { id: 1, 
            image: "WWEBELTCENA.png", 
            title: "WWE Undisputed Championship with John Cena side plates", 
            price: "$2199.00", 
            badge: "HOT", 
            link:`/product/1` 
        },
        { id: 2, image: "WIGNEDEAGLE_.png", title: "WWE Winged Eagle Championship Belt", price: "$1799.00", badge: "HOT", link:`/product/2` },
        { id: 3, image: "SPINNERBELTTT.png", title: "WWE Spinner Championship with Custom name plate", price: "$1699.00", link:`/product/3` },
        { id: 4, image: "WORLDTITLEE.png", title: "WWE Big Gold World Heavyweight Championship", price: "$1799.00", link:`/product/4` },
        { id: 5, image: "UNDISPUTEDTITLE.png", title: "WWE Undisputed Championship with Custom name plate", price: "$1699.00"   , link:`/product/5` },
        { id: 6, image: "WORLDTITLE.png", title: "WWE New World Heavyweight Championship Belt", price: "$1999.00", badge: "HOT", link:`/product/6` },
        { id: 7, image: "CUSTOMSIDEPLATES.png", title: "Custom WWE Side Plates of any WWE Superstar / Custom Design", price: "$349.00", link:`/product/7` },
        { id: 8, image: "NXTTITLE.png", title: "WWE New NXT Championship", price: "$1199.00",   link:`/product/8` },
        { id: 9, image: "smoking-skull-title.jpg", title: "John Cena 2025 Farewell Tour Poster Autograph", price: "$599.00", link:`/product/9` },
        { id: 10, image: "WWF-TITLEE.jpg", title: "Roman Reigns Tribal Chief Poster Autograph 2025", price: "$699.00", badge: "HOT",    link:`/product/10` },
        { id: 11, image: "US-TITLEE.jpg", title: "WWE US Spinner Championship", price: "$1899.00", link:`/product/11` },
        { id: 12, image: "morebeltsbutton.png", title: "View More Belts", link: "" },
        { id: 13, image: "WWEBELTCENA.png", title: "WWE Undisputed Championship with John Cena side plates", price: "$2199.00", badge: "HOT", link:`/product/12` },
        { id: 14, image: "WIGNEDEAGLE_.png", title: "WWE Winged Eagle Championship Belt", price: "$1799.00", badge: "HOT", link:`/product/13` },
        { id: 15, image: "SPINNERBELTTT.png", title: "WWE Spinner Championship with Custom name plate", price: "$1699.00", link:`/product/14` },
        { id: 16, image: "WORLDTITLEE.png", title: "WWE Big Gold World Heavyweight Championship", price: "$1799.00",     link:`/product/15` },
        { id: 17, image: "UNDISPUTEDTITLE.png", title: "WWE Undisputed Championship with Custom name plate", price: "$1699.00", link:`/product/16` },
        { id: 18, image: "WORLDTITLE.png", title: "WWE New World Heavyweight Championship Belt", price: "$1999.00", badge: "HOT", link:`/product/17` },
        { id: 19, image: "CUSTOMSIDEPLATES.png", title: "Custom WWE Side Plates of any WWE Superstar / Custom Design", price: "$349.00", link:`/product/18` },
        { id: 20, image: "NXTTITLE.png", title: "WWE New NXT Championship", price: "$1199.00",  link:`/product/19` },
        { id: 21, image: "smoking-skull-title.jpg", title: "John Cena 2025 Farewell Tour Poster Autograph", price: "$599.00", link:`/product/20` },
        { id: 22, image: "WWF-TITLEE.jpg", title: "Roman Reigns Tribal Chief Poster Autograph 2025", price: "$699.00", badge: "HOT", link:`/product/21` },
        { id: 23, image: "US-TITLEE.jpg", title: "WWE US Spinner Championship", price: "$1899.00", link:`/product/22` },
        { id: 24, image: "morebeltsbutton.png", title: "View More Belts", link: ""}
    ];
    
    const newsPages = Math.ceil(newsItems.length / itemsPerPage);
    const shopPages = Math.ceil(shopItems.length / shopitemsPerPage);

    // Refs for scrolling to sections
    const homeRef = useRef(null);
    const shopRef = useRef(null);
    const latestNewsRef = useRef(null);
    const location = useLocation();

  useEffect(() => {
    if (location.hash === '#shop') {
      shopRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if (location.hash === '#news'){
      latestNewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    else if (location.hash === '#home'){
      homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const scrollToNewsPage = (pageIndex) => {
        setNewsCurrentIndex(pageIndex);
    };

    const scrollToShopPage = (pageIndex) => {
        setShopCurrentIndex(pageIndex);
    };

    const handleMediaKitDownload = () => {
        const link = document.createElement('a');
        link.href = '';
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsMobileMenuOpen(false);
    };

    // Get current items for display
    const getCurrentNewsItems = () => {
        const startIndex = newsCurrentIndex * itemsPerPage;
        return newsItems.slice(startIndex, startIndex + itemsPerPage);
    };

    const getCurrentShopItems = () => {
        const startIndex = shopCurrentIndex * shopitemsPerPage;
        return shopItems.slice(startIndex, startIndex + shopitemsPerPage);
    };

    // Safe icon components using Unicode/HTML entities
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

    const NavLinks = ({ isMobile = false, onItemClick }) => (
        <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
            <button onClick={() => onItemClick ? onItemClick(homeRef) : scrollToSection(homeRef)} className="nav-link">
                Home
            </button>
            <button onClick={() => onItemClick ? onItemClick(shopRef) : scrollToSection(shopRef)} className="nav-link ">
                →Shop
            </button>
            <button onClick={() => onItemClick ? onItemClick(latestNewsRef) : scrollToSection(latestNewsRef)} className="nav-link">
                →Latest News
            </button>
            <button onClick={handleMediaKitDownload} className="nav-link">
                Media Kit
            </button>
           <Link to="/Contact"><button onClick={() => console.log('Contact Us clicked')} className="nav-link">
                Contact Us
            </button></Link>
            {isMobile && (
                <div className="mobile-user-icon">
                    <UserIcon/>
                </div>
            )}
        </nav>
    );

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
                    background-color: #000;
                    color: white;
                    line-height: 1.6;
                }

                .container {
                    min-height: 100vh;
                    background-color: #000;
                }

                .nav-item {
                    display: inline-flex;
                    align-items: center;
                    gap: -122px;
                }
                .shop-link {
                     position: relative;
                     padding-right: 1.5rem; /* leave space for the arrow */
                     background-color: white;
                     border: none;
                     cursor: pointer;
                    }

/* inject your arrow as a background, positioned just off the right edge */
                .shop-link {
                     background-image: url('arrow-right.png');
                     background-repeat: no-repeat;
                     background-position: calc(100% + 4px) center;
                     background-size: 14px 14px;
}
                .nav-arrow {
                    margin-right: -45px;
                    vertical-align: middle;
                }
                .latest-news .section-container,
                .shop .section-container {
                    position: relative;
                }
                /* Pagination Dots */
                .pagination-dots {
                      position: absolute;   /* pull out of normal flow */
                      display: flex;
                      gap: 8px;
                      padding: 0;
                      margin: 0;
                }

                .pagination-dot {
                    width: 16px;
                    height: 16px;
                    border: none;
                    cursor: pointer;
                    background-color:white;
                    background-size: cover;
                    background-position: center;
                    transition: background-color 0.3s ease;
                }
                .pagination-dot.active {
                    background-image: url('/Elements.png');
                    
                }

                .pagination-dot.inactive {
                    background-image: url('/Elements2.png');
                }

                

                .shop .pagination-dot.active {
                    background-image: url('/Elements.png');
                }

                .shop .pagination-dot.inactive {
                    background-image: url('/Elements2.png');
                }
                .latest-news .pagination-dots {
                    top: 1.2rem;    /* adjust to taste */
                    right: 1.15rem;    /* adjust to taste */
                }

                  /* — Shop: centered under the grid — */
                 .shop .pagination-dots {
                     top: 1.2rem;          /* pull it below the grid */
                     right: 88%;                /* start at 50% */
    
                }
                @media (max-width: 767px) {
                  .latest-news .pagination-dots {
                     top: 1.2rem;    /* adjust to taste */
                     right: 2rem; 
                  }
                  .shop .pagination-dots {
                      top: 1.2rem;          /* pull it below the grid */
                      right: 1.5rem;
                      
                  }
                   .latest-news .section-title {
                       position: relative;    /* adjust to taste */
                       right: -1rem;
                   }
                    .shop .section-title {
                       position: relative;    /* adjust to taste */
                       right: -0.5rem;
                   }
                
                }
                /* Discount Banner */
                .discount-banner {
                    background-color: black;
                    color: white;
                    text-align: center;
                    padding: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.3rem;
                    position: relative;
                }

                .discount-banner .discount-icon {
                    display:flex;
                    align-items:center;
                }

                .discount-close {
                    position: relative;
                    right: -2rem;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .discount-close:hover {
                    color: #ccc;
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

                .logo {
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: #000;
                    text-decoration: none;
                    background-color: white;
                    flex: 1;
                    margin-left: 0.5rem;
                }

                .desktop-nav {
                    display: flex;
                    gap: 2rem;
                    align-items:center;
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
                    padding: 0.5rem 0;
                    font-weight: 600px;
                    transition: color 0.3s;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    display: inline-flex;
                    cursor: pointer;
                    white-space: nowrap;
                }
                    

                .nav-link img {
                    display: inline-block;
                    width: 1rem;
                    height: auto;
                    margin: 0;
                }

                .nav-link:hover {
                    color: #000;
                    background-color: white;
                }

                .nav-link1.no-underline {
                    text-decoration: none;
                }

                @media (max-width: 768px) {
                    .header-right {
                        display: none;
                    }
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;
                    background-color: white;
                    flex: 1;
                    justify-content: flex-end;
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
                    display: inline-flex;
                }

                @media (max-width: 768px) {
                    .desktop-only {
                        display: none !important;
                    }
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
                    align-items:center;
                    background-color: white;
                    color: white;
                }

                .mobile-nav .nav-link {
                    font-size: 1.1rem;
                    padding: 1.2rem 1rem;
                    border-bottom: white;
                    text-align: center;
                    align-items:center;
                    justify-content: center
                    color: black;
                    width: 100%;
                    max-width: 300px;
                    display:flex;
                    transition: background-color 0.3s;
                    margin:0;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: #333;
                    cursor: pointer;
                    padding: 0.5rem;
                }

                /* Hero Section */
                .hero {
                    background: #000;
                    padding: 2rem 0;
                    text-align: center;
                    position: relative;
                }

                .hero-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .hero-logo {
                    width: 100%;
                    max-width: 800px;
                    height: 400px;
                    margin: 0 auto;
                    background-color: black;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 1rem;
                }

                .hero-logo img {
                    width: 100%;
                    height: 76%;
                    display:block;
                    object-fit: cover;
                    object-position: center;
                }

                .tickets-btn {
                    position: absolute;
                    top: 2rem;
                    right: 8.8rem;
                    background-color: #fff;
                    color: #000;
                    border: none;
                    padding: 0.7rem 1.2rem;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 1s;
                    font-size: 0.9rem;
                }

                .tickets-btn:hover {
                    transform: translateY(-1px);
                }

                /* Latest News Section */
                .latest-news {
                    padding: 3rem 0;
                    background-color: white;
                }

                .section-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .section-title {
                    font-size: 1.8rem;
                    margin-bottom: 2rem;
                    color: #000;
                    font-weight: 600;
                    gap: 0.5rem;
                }

                .section-arrow {
                    font-size: 1.2rem;
                    color: #666;
                    cursor: pointer;
                    transition: color 0.3s;
                }

                .news-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    grid-auto-flow: row;
                }

                .news-card {
                    background-color: transparent;
                    border-radius: 0px;
                    overflow: hidden;
                    box-shadow: none;
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                    position: relative;
                }

                .news-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 16px rgba(255, 255,255,1);
                }

                .news-image {
                    width: 100%;
                    height: 420px;
                    object-fit: cover;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    font-size: 0.85rem;
                    border-bottom: none;
                }

                .news-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .news-content {
                    padding: 1.2rem;
                }

                .news-label {
                    background-color: white;
                    color: black;
                    padding: 0.25rem 0.6rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    display: inline-block;
                    margin-bottom: 0.7rem;
                    text-transform: uppercase;
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    z-index: 10;
                }

                .news-title {
                    font-size: 1rem;
                    margin: 0;
                    line-height: 1.4;
                    color: #000;
                    font-weight: 600;
                }

                /* Shop Section */
                .shop {
                    padding: 3rem 0;
                    background-color: white;
                }

                .shop .section-title {
                    color: #000;
                }

                .shop-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .product-card {
                    background-color: #fff;
                    border: 1px solid white;
                    border-radius: 0px;
                    overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                }

                .product-card:hover {
                    transform: translateY(-4px);
                }

                .product-image {
                    width: 100%;
                    height:400px;
                    background-color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    position: relative;
                    border-bottom: 1px solid white;
                    font-size: 0.85rem;
                }

                .product-image img {
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    object-position: center;
                }

                .hot-badge {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background-color: white;
                    color: black;
                    padding: 0.3rem 0.7rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    text-transform: uppercase;
                }

                .product-info {
                    padding: 1.2rem;
                }

                .product-title {
                    font-size: 1rem;
                    margin-bottom: 0.7rem;
                    line-height: 1.4;
                    color: #000;
                    font-weight: 500;
                }

                .product-price {
                    color: #000;
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                /* Brand Highlights */
                .brand-highlights {
                    padding: 3rem 0;
                    background-color: white;
                }

                .brand-highlights .section-title {
                    color: #000;
                    text-align: center;
                }

                .brand-subtitle {
                    color: #666;
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 1rem;
                }

                .highlights-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .highlight-card {
                    background-color: transparent;
                    border: none;
                    border-radius: 0;
                    padding: 0;
                    flex-direction: column;
                    display:flex;
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                }

                .highlight-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                }

                .highlight-icon {
                    width: 100%;
                    aspect-ratio: 1/1;
                    overflow: hidden;
                    display: block;
                    margin: 0;
                }

                .highlight-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position:center;
                    display: block;
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

                .footer-text {
                    color: #666;
                    font-size: 0.85rem;
                    text-align: center;
                }

                a {
                    text-decoration:none;
                }

                /* Responsive Design */
                @media (min-width: 768px) {
                    .mobile-menu-btn {
                        display: none;
                    }

                    .desktop-nav, .header-right {
                        display: flex;
                    }

                    .tickets-btn {
                        position: absolute;
                        top: 2rem;
                        right: 8.8rem;
                        margin-top: 0;
                    }

                    .hero-content {
                        padding: 0 2rem;
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
                 /* Mobile-specific styles */
                @media (max-width: 767px) {
                    /* Latest News: 4 across on mobile */
                    .latest-news .news-grid {
                        display: flex;
                        overflow-x: auto;
                        scroll-behavior: smooth;
                        gap: 1rem;
                        padding: 0 1rem;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none; /* IE/Edge */

                    }
                    .latest-news .news-grid::-webkit-scrollbar {
                        display:none;
                    }
                    
                    .latest-news .news-card {
                       flex: 0 0 280px; /* Fixed width, larger cards */
                        min-width: 280px;
                    }
                    
                    .latest-news .news-image {
                        height: 350px; /* Smaller height for mobile 4-column layout */
                    }
                    
                    .latest-news .news-label {
                        font-size: 0.75rem;
                        padding: 0.25rem 0.6rem;
                        top: 12px;
                        left: 12px;
                    }

                    /* Shop: 2 across on mobile */
                    .shop .shop-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                        padding: 0 0.5rem;
                    }

                    .latest-news {
                        border-bottom: none;
                        margin-bottom: 0;
                    }
                       
                    
                    .brand-highlights {
                        border-top: none;
                        margin-top: 0;
                    }
                    
                    .shop .product-card {
                        min-width: 0; /* Allows items to shrink */
                    }
                    
                    .shop .product-image {
                        height: 200px; /* Appropriate height for mobile 2-column layout */
                    }
                    
                    .shop .hot-badge {
                        font-size: 0.65rem;
                        padding: 0.2rem 0.5rem;
                        top: 8px;
                        left: 8px;
                    }
                    
                    .shop .product-info {
                        padding: 0.8rem;
                    }
                    
                    .shop .product-title {
                        font-size: 0.85rem;
                        line-height: 1.2;
                        margin-bottom: 0.5rem;
                    }
                    
                    .shop .product-price {
                        font-size: 0.95rem;
                    }
                }
                @media (max-width: 767px) and (orientation: landscape) {
                    .shop .product-image {
                        height: 380px; /* Appropriate height for mobile 2-column layout */
                    }
                }
                @media (min-width: 768px) and (max-width: 1023px) {
                    /* Tablet styles */
                    .news-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    .shop-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .news-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }

                    .shop-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }

                    .highlights-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }

                    .highlights-grid {
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                        gap: 1.5rem;
                    }
                       
}              
                }
            `}</style>

            <div className="container" id="home">
                {/* Discount Banner */}
                {isDiscountVisible && (
                    <div className="discount-banner">
                        <span className="discount-icon"><img src="ticket-percent-white.svg"/></span>
                        10% off store—Limited time!
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
                        <p className="logo">BURNITDOWNYT</p>
                        
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

                {/* Hero Section */}
                <section ref={homeRef} className="hero">
                    <div className="hero-content">
                        <div className="hero-logo">
                            <img className="hero-logo img" src="MANIA-HOMECOVER.jpg"/>
                        </div>
                        <button className="tickets-btn">Tickets</button>
                    </div>
                </section>

                {/* Latest News Section */}
                <section ref={latestNewsRef} className="latest-news" id="news">
                    <div className="section-container">
                        <h2 className="section-title">Latest News</h2>
                        
                        {/* News Pagination Dots */}
                        <div className="pagination-dots">
                            {Array.from({ length: newsPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToNewsPage(index)}
                                    className={`pagination-dot ${newsCurrentIndex === index ? 'active' : 'inactive'}`}
                                />
                            ))}
                        </div>

                        <div className="news-grid">
                            {getCurrentNewsItems().map((item) => (
                                <div key={item.id} className="news-card">
                                    <span className="news-label">{item.label}</span>
                                    <div className="news-image">
                                        <a href={item.link}><img src={item.image} alt="News" sr/></a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Shop Section */}
                <section ref={shopRef} className="shop" id="shop">
                    <div className="section-container">
                        <h2 className="section-title">Shop</h2>
                        
                        {/* Shop Pagination Dots */}
                        <div className="pagination-dots">
                            {Array.from({ length: shopPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToShopPage(index)}
                                    className={`pagination-dot ${shopCurrentIndex === index ? 'active' : 'inactive'}`}
                                />
                            ))}
                        </div>

                        <div className="shop-grid">
                            {getCurrentShopItems().map((item) => (
                                <div key={item.id} className="product-card">
                                    <div className="product-image">
                                        {item.badge && <span className="hot-badge">{item.badge}</span>}
                                        <Link to={item.link} state={{item}}><img src={item.image} alt={item.title}/></Link>
                                    </div>
                                    {item.title !== "View More Belts" && (
                                        <div className="product-info">
                                            <h3 className="product-title">{item.title}</h3>
                                            <div className="product-price">{item.price}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Brand Highlights */}
                <section className="brand-highlights">
                    <div className="section-container">
                        <h2 className="section-title">Brand Highlights</h2>
                        <p className="brand-subtitle">
                            Join our WWE 2K community group and explore some of our top brand highlights
                        </p>
                        <div className="highlights-grid">
                            <div className="highlight-card">
                                <div className="highlight-icon">
                                    <a href="" target="_blank" rel="noopener noreferrer"><img src="2k-logo.jpg" alt="2K Logo"/></a>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <div className="highlight-icon">
                                    <a href="" target="_blank" rel="noopener noreferrer"><img src="Youtube_bl.png" alt="YouTube"/></a>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <div className="highlight-icon">
                                    <a href="" target="_blank" rel="noopener noreferrer"><img src="W.png" alt="WWE"/></a>
                                </div>
                            </div>
                            <div className="highlight-card">
                                <div className="highlight-icon">
                                    <a href="Media-kit.pdf" download><img src="Mediakit.png" alt="Media Kit"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <nav className="footer-nav">
                            <button onClick={() => scrollToSection(homeRef)} className="nav-link1">Home</button>
                            <button onClick={() => scrollToSection(shopRef)} className="nav-link1">Shop</button>
                            <a href="" target="_blank" rel="noopener noreferrer"><button className="nav-link1">2K Community</button></a>
                            <button onClick={handleMediaKitDownload} className="nav-link1">Media kit</button>
                            <Link to="/Contact"><button onClick={() => console.log('Contact Us clicked')} className="nav-link1">Contact Us</button></Link>
                        </nav>
                        
                        <div className="social-icons">
                            <a href="" className="social-icon" target="_blank" rel="noopener noreferrer"><img src="instagram1.png"/></a>
                            <a href="" className="social-icon" target="_blank" rel="noopener noreferrer"><img src="facebook1.png"/></a>
                            <a href="" className="social-icon" target="_blank" rel="noopener noreferrer"><img src="youtube1.png"/></a>
                        </div>
                        
                        <p className="footer-text">© 2025 BURNITDOWNYT. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default BIDapp;
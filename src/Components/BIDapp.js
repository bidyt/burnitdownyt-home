import React, { useEffect, useState } from 'react';

const BIDapp = () => {
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mock data for demonstration purposes
   const mockNewsData = [
        {
            title: "165 New Stars Roster Reveal",
            urlToImage: "/2k25-1.jpg",
            url: "https://www.youtube.com/watch?v=EdYsk6HFPgY",
            duration: "4:45",
        },
        {
            title: "Current Male Roster Reveal",
            urlToImage: "/2k25-2.jpg",
            url: "https://www.youtube.com/watch?v=UNVNxNmYXn8",
            duration: "9:22",
        },
        {
            title: "Current Female Roster Reveal",
            urlToImage: "/2k25-3.jpg",
            url: "https://www.youtube.com/watch?v=HaNmPjuoCpQ&t=1s",
            duration: "5:38",
        },
        {
            title: "30 New Stars and 6 New Gimmicks",
            urlToImage: "/2k25-4.jpg",
            url: "https://www.youtube.com/watch?v=CBXgVaBFyeY",
            duration: "2:33",
        },
        {
            title: "Women's Money In The Bank Ladder Match",
            urlToImage: "/2k25-5.jpg",
            url: "https://www.youtube.com/watch?v=5RchjEwj5mM&t=1s",
            duration: "28:40",
        },
        {
            title: "John Cena vs Roman Reigns",
            urlToImage: "/2k25-6.jpg",
            url: "https://www.youtube.com/watch?v=IZJV-lUg9x4",
            duration: "16:24",
        }
    ];

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setNewsData(mockNewsData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSearch = () => {
        if (!search.trim()) {
            setNewsData(mockNewsData);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            const filteredData = mockNewsData.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            setNewsData(filteredData);
            setLoading(false);
        }, 500);
    };

    const navItems = ['NEWS', 'TICKETS', 'MEDIAKIT', 'SHOWS', 'SHOP'];

    // This component renders a single video card
    const VideoCard = ({ data }) => (
        <a href={data.url} target="_blank" rel="noopener noreferrer" className="video-card">
            <div className="video-card-image-container">
                <img
                    src={data.urlToImage}
                    alt={data.title}
                    className="video-card-image"
                />
                <div className="video-card-duration">{data.duration}</div>
            </div>
            <div className="video-card-content">
                <h3>{data.title}</h3>
                <p>Official</p>
            </div>
        </a>
    );

    // This component renders the navigation items for both desktop and mobile
    const NavLinks = ({ isMobile = false }) => (
        <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
            {navItems.map((item) => {
                if (item === 'MEDIAKIT') {
                    return (
                        <a
                            key={item}
                            href="Media-kit.pdf" // Using a sample PDF URL
                            download="mediakit.pdf"
                            className="nav-link"
                            onClick={() => isMobile && setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    );
                }
                return (
                    <button
                        key={item}
                        className="nav-link"
                        onClick={() => {
                            console.log(item, 'clicked');
                            if (isMobile) setIsMobileMenuOpen(false);
                        }}
                    >
                        {item}
                    </button>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* We inject a style tag to handle responsive design using standard CSS media queries */}
            <style>{`
                :root {
                    --main-red: #c41e3a;
                    --dark-bg: #000;
                    --primary-bg: #111;
                    --secondary-bg: #1a1a1a;
                    --tertiary-bg: #2a2a2a;
                    --border-color: #333;
                    --text-light: #fff;
                    --text-dark: #ccc;
                    --text-muted: #666;
                }

                body {
                    margin: 0;
                    background-color: var(--dark-bg);
                    color: var(--text-light);
                    font-family: 'Roboto', 'Arial', sans-serif;
                }

                .app-container {
                    background-color: var(--dark-bg);
                    min-height: 100vh;
                }

                /* Header Styles */
                .app-header {
                    background-color: var(--secondary-bg);
                    padding: 1rem 2rem;
                    border-bottom: 1px solid var(--border-color);
                }

                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 1800px;
                    margin: 0 auto;
                }
                
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo-img {
                    height: 40px;
                    border-radius: 4px;
                }

                .logo-title {
                    margin: 0;
                    font-size: 1.75rem;
                    font-weight: bold;
                    color: var(--main-red);
                    text-transform: uppercase;
                    font-family: 'League Gothic', Impact, sans-serif;
                }

                .desktop-nav {
                    display: none; /* Hidden on mobile */
                }
                
                .header-search-container {
                     display: none; /* Hidden on mobile */
                }

                .hamburger-btn {
                    background: none;
                    border: none;
                    color: var(--text-light);
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                }

                /* Mobile Menu Styles */
                .mobile-menu {
                    position: absolute;
                    top: 74px; /* Height of the header */
                    left: 0;
                    right: 0;
                    background: var(--secondary-bg);
                    border-bottom: 1px solid var(--border-color);
                    z-index: 1000;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .mobile-search-container {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                /* Common Nav Link Styles */
                .nav-link {
                    color: var(--text-light);
                    padding: 0.75rem 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 4px;
                    cursor: pointer;
                    background: transparent;
                    border: none;
                    text-decoration: none;
                    text-align: left;
                    transition: background-color 0.2s;
                }

                .nav-link:hover {
                    background-color: var(--tertiary-bg);
                }

                /* Search Input and Button Styles */
                .search-input {
                    padding: 0.75rem 1rem;
                    background: var(--tertiary-bg);
                    border: 1px solid #444;
                    border-radius: 4px;
                    color: var(--text-light);
                    font-size: 1rem;
                    flex-grow: 1;
                }

                .search-btn {
                    padding: 0.75rem 1.5rem;
                    background: var(--main-red);
                    color: var(--text-light);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: background-color 0.2s;
                }
                .search-btn:hover {
                    background-color: #e52d4a;
                }

                /* Main Content Area */
                .main-content {
                    padding: 2rem;
                    max-width: 1800px;
                    margin: 0 auto;
                }

                /* Latest Videos Section */
                .latest-videos-section {
                    margin-bottom: 2rem;
                }
                
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                
                .section-title {
                    margin: 0;
                    font-size: 1.75rem;
                    font-weight: bold;
                }

                .view-all-btn {
                    background: transparent;
                    color: var(--main-red);
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                }
                
                .videos-carousel {
                    overflow: hidden;
                    position: relative;
                }

                .videos-track {
                    display: flex;
                    gap: 1.5rem;
                    /* Animation for continuous scroll */
                    animation: scroll 40s linear infinite;
                    width: fit-content;
                }

                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .video-card {
                    background: var(--tertiary-bg);
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.2s;
                    min-width: 280px;
                    max-width: 320px;
                    flex-shrink: 0;
                    text-decoration: none;
                    color: var(--text-light);
                }
                .video-card:hover {
                    transform: translateY(-5px);
                }
                .video-card-image-container {
                    position: relative;
                }
                .video-card-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    display: block;
                }
                .video-card-duration {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 12px;
                }
                .video-card-content {
                    padding: 1rem;
                }
                .video-card-content h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1.3;
                }
                .video-card-content p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: var(--text-dark);
                }

                /* Main Grid Layout */
                .main-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                /* Merch Shop Card */
                .merch-card {
                    background: var(--main-red);
                    padding: 2rem;
                    border-radius: 8px;
                }
                .merch-card .tag {
                    margin: 0 0 0.5rem 0;
                    font-size: 1rem;
                    font-weight: 600;
                }
                .merch-card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 2rem;
                    font-weight: bold;
                }
                .merch-card p {
                    margin: 0 0 1.5rem 0;
                    font-size: 1rem;
                    opacity: 0.9;
                }
                .merch-card .shop-now-btn {
                    background: var(--text-light);
                    color: var(--main-red);
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 600;
                }

                /* Content Grid (Wrestlemania, etc.) */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                
                .content-card {
                    background: var(--secondary-bg);
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                }
                .content-card-image-container {
                    height: 200px;
                    background-color: var(--tertiary-bg);
                }
                .content-card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover; /* This makes the image cover the container */
                }
                .content-card-text {
                    padding: 1.5rem;
                }
                .content-card-text h4 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.25rem;
                }
                .content-card-text p {
                    margin: 0;
                    font-size: 1rem;
                    color: var(--text-dark);
                }

                /* Sidebar */
                .sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .event-preview-card {
                    background: var(--main-red);
                    padding: 1.5rem;
                    border-radius: 8px;
                }
                .event-preview-card .tag {
                    margin: 0 0 0.5rem 0;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .event-preview-card h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .latest-news-card {
                    background: var(--secondary-bg);
                    padding: 1.5rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                }
                .latest-news-card h3 {
                    margin: 0 0 1rem 0;
                }
                .news-items-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .news-item {
                    background: var(--tertiary-bg);
                    padding: 1rem;
                    border-radius: 4px;
                    border-left: 3px solid var(--main-red);
                }
                .news-item h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1rem;
                }
                .news-item p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: var(--text-dark);
                }

                .social-links {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                .social-link {
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                    text-decoration: none;
                    color: var(--text-light);
                }
                .social-link.facebook { background: #1877f2; }
                .social-link.youtube { background: #ff0000; }
                .social-link.instagram { background: #e4405f; }
                .social-link-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
                .social-link-title { margin: 0; font-size: 0.8rem; font-weight: 600; }
                .social-link-subtitle { margin: 0; font-size: 0.7rem; opacity: 0.8; }

                /* Footer */
                .app-footer {
                    background: var(--primary-bg);
                    padding: 3rem 2rem;
                    border-top: 1px solid var(--border-color);
                    margin-top: 3rem;
                }
                .footer-content {
                    max-width: 1800px;
                    margin: 0 auto;
                }
                .footer-brand h3 {
                     margin: 0 0 1rem 0;
                     font-size: 1.5rem;
                     color: var(--main-red);
                }
                .footer-brand p {
                     margin: 0;
                     color: var(--text-dark);
                     line-height: 1.5;
                }
                .footer-copyright {
                    border-top: 1px solid var(--border-color);
                    margin-top: 2rem;
                    padding-top: 2rem;
                    text-align: center;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }


                /* --- Media Queries for Responsive Design --- */

                /* Tablet and smaller desktops */
                @media (min-width: 768px) {
                    .content-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* Large desktops */
                @media (min-width: 1024px) {
                    .hamburger-btn {
                        display: none;
                    }
                    .desktop-nav {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        margin-left: 2rem;
                    }
                    .header-search-container {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-left: auto;
                    }
                    .main-grid {
                        grid-template-columns: 1fr 350px; /* Two columns for main content */
                    }
                    .content-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>

            <div className="app-container">
                {/* Header */}
                <header className="app-header">
                    <div className="header-content">
                        <div className="logo-container">
                            <img src="RBID.jpg" alt="Burn It Down Logo" className="logo-img" />
                            <h1 className="logo-title">BURNITDOWN</h1>
                        </div>

                        {/* Desktop Navigation and Search */}
                        <NavLinks />
                        <div className="header-search-container">
                            <input
                                type="text"
                                placeholder="Search Videos..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="search-input"
                            />
                            <button onClick={handleSearch} className="search-btn">Search</button>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            &#9776;
                        </button>
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <NavLinks isMobile={true} />
                        <div className="mobile-search-container">
                             <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="search-input"
                            />
                            <button onClick={handleSearch} className="search-btn">Search</button>
                        </div>
                    </div>
                )}

                <main className="main-content">
                    {/* Latest Videos Section */}
                    <section className="latest-videos-section">
                        <div className="section-header">
                            <h2 className="section-title">Latest Videos</h2>
                            <button className="view-all-btn">View All</button>
                        </div>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="videos-carousel">
                                <div className="videos-track">
                                    {[...newsData, ...newsData].map((item, index) => (
                                        <VideoCard key={index} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Main Content Grid */}
                    <div className="main-grid">
                        {/* Left Column */}
                        <div className="left-column">
                            <div className="merch-card">
                                <p className="tag">MERCH SHOP</p>
                                <h3>Gear Up Like a Champion</h3>
                                <p>Browse authentic WWE merch, apparel, and fan gear built for true super-fans.</p>
                                <button className="shop-now-btn">Shop Now</button>
                            </div>

                            <div className="content-grid" style={{marginTop: '2rem'}}>
                                <div className="content-card">
                                    <div className="content-card-image-container">
                                        <img src="WW.png" alt="WrestleMania" className="content-card-image" />
                                    </div>
                                    <div className="content-card-text">
                                        <h4>WrestleMania</h4>
                                        <p>Relive the grandest stage of them all</p>
                                    </div>
                                </div>
                                <div className="content-card">
                                    <div className="content-card-image-container">
                                        <img src="M.png" alt="Money in the Bank" className="content-card-image" />
                                    </div>
                                    <div className="content-card-text">
                                        <h4>Money in the Bank</h4>
                                        <p>Catch up on all the ladder match action</p>
                                    </div>
                                </div>
                                <div className="content-card">
                                    <div className="content-card-image-container">
                                        <img src="Champ.png" alt="Championship Highlights" className="content-card-image" />
                                    </div>
                                    <div className="content-card-text">
                                        <h4>Championship Highlights</h4>
                                        <p>Latest championship match highlights and updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="sidebar">
                            <div className="event-preview-card">
                                <p className="tag">EVENT PREVIEW FOR 7/14</p>
                                <h3>What will be the fallout from the latest championship match?</h3>
                            </div>
                            <div className="latest-news-card">
                                <h3>LATEST NEWS</h3>
                                <div className="news-items-container">
                                    <div className="news-item">
                                        <h4>Championship Match Results</h4>
                                        <p>2 hours ago</p>
                                    </div>
                                    <div className="news-item">
                                        <h4>Upcoming Events Schedule</h4>
                                        <p>4 hours ago</p>
                                    </div>
                                    <div className="news-item">
                                        <h4>Behind the Scenes Coverage</h4>
                                        <p>6 hours ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="social-links">
                                <a href="https://www.facebook.com/share/g/1BpZVnNsqr/?mibextid=wwXIfr" className="social-link facebook">
                                    <div className="social-link-icon"><img src="facebook.png"/></div>
                                    <p className="social-link-title">Facebook</p>
                                </a>
                                <a href="https://youtube.com/@burnitdownyt?si=ogbNfYLps54zRZQ1" className="social-link youtube">
                                    <div className="social-link-icon"><img src="youtube.png"/></div>
                                    <p className="social-link-title">YouTube</p>
                                </a>
                                <a href=" https://www.instagram.com/burnitdownyt?igsh=MTExOGNwOHJhZWYyYQ%3D%3D&utm_source=qr" className="social-link instagram">
                                    <div className="social-link-icon"><img src="instagram.png"/></div>
                                    <p className="social-link-title">Instagram</p>
                                </a>
                            </div>
                        </aside>
                    </div>
                </main>

                {/* Footer */}
                <footer className="app-footer">
                    <div className="footer-content">
                         <div className="footer-brand">
                            <h3 font-family = "League Gothic, Impact, sans-serif">BURNITDOWN</h3>
                            <p>Your ultimate destination for wrestling entertainment, news, and exclusive content.</p>
                        </div>
                        <div className="footer-copyright">
                            &copy; 2025 Burn It Down. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default BIDapp;
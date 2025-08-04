import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BIDapp from './Components/BIDapp';
import News from './Components/Contact.js';
import Tickets from './Components/tickets.js'
import Shows from './Components/Shows.js'

/*function App() {
  return (
     <Routes>
        <Route path="/" element={<BIDapp/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path="/tickets" element={<Tickets/>}></Route>
        <Route path="/shows" element={<Shows/>}></Route>
     </Routes>
  );
} 

export default App;
/*<nav claasName="nav">
            <ul style={{display:"flex", gap:"11px", alignItems:"left"}} class="navLinks">
                <li><a style={{fontWeight:600, fontSize:"17px"}}><button>NEWS</button></a></li>
                <li><a style={{fontWeight:600, fontSize:"17px",color:"white"}}><button>TICKETS</button></a></li>
                <li><a href="/Media-kit.pdf" target="_blank" rel="noopener noreferrer" download style={{fontWeight:600, fontSize:"17px",color:"white"}}><button>MEDIAKIT</button></a></li>
                <li><a style={{fontWeight:600, fontSize:"17px",color:"white"}}><button>SHOWS</button></a></li>
                <li><a style={{fontWeight:600, fontSize:"17px",color:"white"}}><button>SHOP</button></a></li>
            </ul>
            <div className='searchBar'>
                <input type='text' placeholder='Search News' value={search} onChange={handleInput}/>
                <button onClick={getData}>Search</button>
            </div>
        </nav>
        <div>
            <p className='head'>Youtube Videos</p>
        </div>
        <div className='categoryBtn'>
            <button onClick={userInput} value="sports">Sports</button>
            <button onClick={userInput} value="politics">Politics</button>
            <button onClick={userInput} value="entertainment">Entertainment</button>
            <button onClick={userInput} value="health">Health</button>
            <button onClick={userInput} value="fitness">Fitness</button>
        </div>

        <div>
        {newsData?  <Card data={newsData}/> : null}
            
        </div>
    </div> flex: '1',
                    justifyContent: 'center'
      /*              {/* Latest Videos Section }
            <section style={{ padding: '20px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{
                        margin: '0',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        Latest Videos
                    </h2>
                    <button style={{
                        background: 'transparent',
                        color: '#c41e3a',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        View All
                    </button>
                </div>


                {/* Video Grid }
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        color: '#666'
                    }}>
                        Loading...
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        paddingBottom: '20px'
                    }}>
                        {newsData.map((item, index) => (
                            <VideoCard key={index} data={item} />
                        ))}
                    </div>
                )}
            </section>*/
/* return (
    <div style={{
            background: '#000',
            minHeight: '100vh',
            color: 'white',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header }
            <header style={{
                background: '#1a1a1a',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #333'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{
                        marginRight: '20px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img 
                            src="/RBID.jpg" 
                            alt="RBID"
                            style={{
                                height: '40px',
                                width: 'auto',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                    <h1 style={{
                        margin: '0',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#D32F2F'
                    }}>
                         BURNITDOWN
                    </h1>
                </div>
        <nav style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    marginLeft: '40px',
                }}>
                    {['NEWS', 'TICKETS', 'MEDIAKIT', 'SHOWS', 'SHOP'].map((item, index) => (
                        <button
                            key={item}
                            style={{
                                background: index === 0 ?'#1a1a1a' : 'transparent',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                borderRadius: '4px'
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleInput}
                        style={{
                            padding: '8px 12px',
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '14px'
                        }}
                    />
                    <button
                        onClick={getData}
                        style={{
                            padding: '8px 16px',
                            background: '#c41e3a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Search
                    </button>
                </div>
            </header>

            {/* Latest Videos Section }
            <section style={{ 
                padding: '20px 0',
                maxWidth: '1800px',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '0 20px'
                }}>
                    <h2 style={{
                        margin: '0',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        Latest Videos
                    </h2>
                    <button style={{
                        background: 'transparent',
                        color: '#c41e3a',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        View All
                    </button>
                </div>
              {/* Video Grid with Auto-scroll }
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                        color: '#666'
                    }}>
                        Loading...
                    </div>
                ) : (
                    <div style={{
                        overflow: 'hidden',
                        position: 'relative',
                        margin: '0 20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            animation: 'scroll 20s linear infinite',
                            width: 'fit-content'
                        }}>
                            {[...newsData, ...newsData].map((item, index) => (
                                <VideoCard key={index} data={item} />
                            ))}
                        </div>
                        <style>
                            {`
                                @keyframes scroll {
                                    0% {
                                        transform: translateX(0);
                                    }
                                    100% {
                                        transform: translateX(-50%);
                                    }
                                }
                            `}
                        </style>
                    </div>
                )}
            </section>
                

            {/* Additional Content Sections }
            <section style={{
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 300px',
                gap: '20px',
                maxWidth: '1800px',
                margin: '0 auto'
            }}>
                {/* Left Column - Main Content }
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* Merch Shop Card }
                    <div style={{
                        background: '#c41e3a',
                        padding: '30px',
                        borderRadius: '8px'
                    }}>
                        <p style={{
                            margin: '0 0 10px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                            opacity: '0.9'
                        }}>
                            MERCH SHOP
                        </p>
                        <h3 style={{
                            margin: '0 0 15px 0',
                            fontSize: '28px',
                            fontWeight: 'bold'
                        }}>
                            Gear Up Like a Champion
                        </h3>
                        <p style={{
                            margin: '0 0 20px 0',
                            fontSize: '16px',
                            opacity: '0.9'
                        }}>
                            Browse authentic WWE merch, apparel, and fan gear built for true super-fans.
                        </p>
                        <button style={{
                            background: 'white',
                            color: '#c41e3a',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>
                            Shop Now
                        </button>
                    </div>

                    {/* Content Categories Grid }
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px'
                    }}>
                        <div style={{
                            background: '#1a1a1a',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #333'
                        }}>
                            <div style={{
                                height: '150px',
                                background: '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666'
                            }}>
                                Championship Image
                            </div>
                            <div style={{ padding: '15px' }}>
                                <h4 style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    Championship Highlights
                                </h4>
                                <p style={{
                                    margin: '0',
                                    fontSize: '14px',
                                    color: '#ccc'
                                }}>
                                    Latest championship match highlights and updates
                                </p>
                            </div>
                        </div>

                        <div style={{
                            background: '#1a1a1a',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #333'
                        }}>
                            <div style={{
                                height: '150px',
                                background: '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666'
                            }}>
                                Money in the Bank Image
                            </div>
                            <div style={{ padding: '15px' }}>
                                <h4 style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    Money in the Bank
                                </h4>
                                <p style={{
                                    margin: '0',
                                    fontSize: '14px',
                                    color: '#ccc'
                                }}>
                                    Catch up on all the ladder match action
                                </p>
                            </div>
                        </div>

                        <div style={{
                            background: '#1a1a1a',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #333'
                        }}>
                            <div style={{
                                height: '150px',
                                background: '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666'
                            }}>
                                WrestleMania Image
                            </div>
                            <div style={{ padding: '15px' }}>
                                <h4 style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    WrestleMania
                                </h4>
                                <p style={{
                                    margin: '0',
                                    fontSize: '14px',
                                    color: '#ccc'
                                }}>
                                    Relive the grandest stage of them all
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar }
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* Event Preview }
                    <div style={{
                        background: '#c41e3a',
                        padding: '20px',
                        borderRadius: '8px'
                    }}>
                        <p style={{
                            margin: '0 0 10px 0',
                            fontSize: '12px',
                            fontWeight: '600',
                            opacity: '0.9'
                        }}>
                            EVENT PREVIEW FOR 7/6
                        </p>
                        <h3 style={{
                            margin: '0',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            lineHeight: '1.2'
                        }}>
                            What will be the fallout from the latest championship match?
                        </h3>
                    </div>

                    {/* Latest News }
                    <div style={{
                        background: '#1a1a1a',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #333'
                    }}>
                        <h3 style={{
                            margin: '0 0 15px 0',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>
                            LATEST NEWS
                        </h3>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <div style={{
                                background: '#2a2a2a',
                                padding: '12px',
                                borderRadius: '4px',
                                borderLeft: '3px solid #c41e3a'
                            }}>
                                <h4 style={{
                                    margin: '0 0 4px 0',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    Championship Match Results
                                </h4>
                                <p style={{
                                    margin: '0',
                                    fontSize: '12px',
                                    color: '#ccc'
                                }}>
                                    2 hours ago
                                </p>
                            </div>
                            <div style={{
                                background: '#2a2a2a',
                                padding: '12px',
                                borderRadius: '4px',
                                borderLeft: '3px solid #c41e3a'
                            }}>
                                <h4 style={{
                                    margin: '0 0 4px 0',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    Upcoming Events Schedule
                                </h4>
                                <p style={{
                                    margin: '0',
                                    fontSize: '12px',
                                    color: '#ccc'
                                }}>
                                    4 hours ago
                                </p>
                            </div>
                            <div style={{
                                background: '#2a2a2a',
                                padding: '12px',
                                borderRadius: '4px',
                                borderLeft: '3px solid #c41e3a'
                            }}>
                                <h4 style={{
                                    margin: '0 0 4px 0',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    Behind the Scenes Coverage
                                </h4>
                                <p style={{
                                    margin: '0',
                                    fontSize: '12px',
                                    color: '#ccc'
                                }}>
                                    6 hours ago
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links }
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px'
                    }}>
                        <div style={{
                            background: '#1877f2',
                            padding: '15px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                fontSize: '20px',
                                marginBottom: '5px'
                            }}>
                                📘
                            </div>
                            <p style={{
                                margin: '0',
                                fontSize: '10px',
                                fontWeight: '600'
                            }}>
                                Facebook Group
                            </p>
                            <p style={{
                                margin: '0',
                                fontSize: '8px',
                                opacity: '0.8'
                            }}>
                                Join our community
                            </p>
                        </div>

                        <div style={{
                            background: '#ff0000',
                            padding: '15px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                fontSize: '20px',
                                marginBottom: '5px'
                            }}>
                                📺
                            </div>
                            <p style={{
                                margin: '0',
                                fontSize: '10px',
                                fontWeight: '600'
                            }}>
                                YouTube Channel
                            </p>
                            <p style={{
                                margin: '0',
                                fontSize: '8px',
                                opacity: '0.8'
                            }}>
                                Subscribe for content
                            </p>
                        </div>

                        <div style={{
                            background: '#e4405f',
                            padding: '15px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                fontSize: '20px',
                                marginBottom: '5px'
                            }}>
                                📷
                            </div>
                            <p style={{
                                margin: '0',
                                fontSize: '10px',
                                fontWeight: '600'
                            }}>
                                Instagram
                            </p>
                            <p style={{
                                margin: '0',
                                fontSize: '8px',
                                opacity: '0.8'
                            }}>
                                Follow for updates
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    
    
  );*/
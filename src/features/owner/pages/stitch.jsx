<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>VenueMaster - Professional Venue Management</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-container-high": "#e8e8e8",
                        "tertiary": "#000000",
                        "surface-container-highest": "#e2e2e2",
                        "surface-tint": "#5e5e5e",
                        "secondary-fixed": "#6ffbbe",
                        "secondary-container": "#6cf8bb",
                        "surface-container-lowest": "#ffffff",
                        "primary-fixed": "#e2e2e2",
                        "primary-fixed-dim": "#c6c6c6",
                        "on-surface-variant": "#4c4546",
                        "primary": "#000000",
                        "on-tertiary-fixed": "#191c1e",
                        "on-primary-container": "#848484",
                        "error-container": "#ffdad6",
                        "outline-variant": "#cfc4c5",
                        "on-primary-fixed-variant": "#474747",
                        "inverse-surface": "#303030",
                        "on-tertiary-container": "#818486",
                        "tertiary-fixed-dim": "#c4c7c9",
                        "on-secondary-fixed-variant": "#005236",
                        "on-secondary-fixed": "#002113",
                        "secondary-fixed-dim": "#4edea3",
                        "surface-container": "#eeeeee",
                        "on-secondary-container": "#00714d",
                        "surface-variant": "#e2e2e2",
                        "on-surface": "#1b1b1b",
                        "surface": "#f9f9f9",
                        "on-secondary": "#ffffff",
                        "on-primary": "#ffffff",
                        "surface-dim": "#dadada",
                        "surface-container-low": "#f3f3f3",
                        "surface-bright": "#f9f9f9",
                        "error": "#ba1a1a",
                        "inverse-on-surface": "#f1f1f1",
                        "tertiary-fixed": "#e0e3e5",
                        "primary-container": "#1b1b1b",
                        "on-error": "#ffffff",
                        "outline": "#7e7576",
                        "tertiary-container": "#191c1e",
                        "secondary": "#006c49",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-background": "#1b1b1b",
                        "background": "#f9f9f9",
                        "inverse-primary": "#c6c6c6",
                        "on-tertiary": "#ffffff",
                        "on-primary-fixed": "#1b1b1b",
                        "on-error-container": "#93000a"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px",
                        "md": "0.375rem"
                    },
                    spacing: {
                        "md": "12px",
                        "xxl": "32px",
                        "sm": "8px",
                        "lg": "16px",
                        "xs": "4px",
                        "xl": "24px"
                    },
                    fontFamily: {
                        sans: ['Public Sans', 'sans-serif'],
                        h1: ["Public Sans"],
                        body: ["Public Sans"],
                        h2: ["Public Sans"],
                        "body-sm": ["Public Sans"],
                        caption: ["Public Sans"]
                    },
                    fontSize: {
                        "h1": ["28px", {"lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "h2": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "caption": ["12px", {"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500"}]
                    }
                },
            },
        }
    </script>
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Public Sans', sans-serif; }
        .active-nav-item {
            background-color: white;
            color: #059669; /* emerald-600 */
            border-left: 4px solid #10b981; /* emerald-500 */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .dark .active-nav-item {
            background-color: #1e293b; /* slate-800 */
            color: #34d399; /* emerald-400 */
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen">
    <div id="root"></div>

    <!-- React and dependencies -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/history@5/umd/history.development.js"></script>
    <script src="https://unpkg.com/react-router@6.3.0/umd/react-router.development.js"></script>
    <script src="https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <script type="text/babel">
        const { useState, useEffect } = React;
        const { createRoot } = ReactDOM;
        const { MemoryRouter, Routes, Route, Link, useNavigate, useLocation } = ReactRouterDOM;

        // --- Shared Components ---

        const NavigationDrawer = () => {
            const location = useLocation();
            const navItems = [
                { label: 'Analytics', icon: 'leaderboard', path: '/' },
                { label: 'Bookings', icon: 'calendar_month', path: '/bookings' },
                { label: 'My Venues', icon: 'stadium', path: '/venues' },
                { label: 'Messages', icon: 'chat', path: '/messages' },
                { label: 'Finance', icon: 'payments', path: '/finance' },
                { label: 'Settings', icon: 'settings', path: '/settings' },
            ];

            return (
                <aside className="h-full w-64 fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col py-6 gap-2 z-50 hidden md:flex">
                    <div className="px-xl mb-xl flex items-center gap-md">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">stadium</span>
                        </div>
                        <span className="text-lg font-bold text-black dark:text-white uppercase tracking-tight">VenueMaster</span>
                    </div>
                    
                    <div className="px-xl mb-lg">
                        <div className="flex items-center gap-md p-md bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <img alt="Manager" className="w-10 h-10 rounded-full bg-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3oYBQtKqRnZYS2MnozZXaKwnUQh2HIJO4siXyP5m243w95dAvMOAILUeQw016AX_M838FlahaauLBuI79M1pSqh2xNlP2s8I0lNSXGTQCxcnd6IxoohBDyZwNy611NY4JhU62hT8s-A3CCqiCI9zPYnG80WGvDX_jbnvMeUfsMy19T5q5BjFsJo5XEvgvuXhlFzPe6zF6cDMGsd4UJ9q3kkk_Qr6tWzHMMHcQHAjDyfEx0IgwjHrurvtp2owH3frUhAvCvRzt9uQ" />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-black dark:text-white">Active Arena</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Venue Manager</span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link 
                                key={item.path} 
                                to={item.path} 
                                className={`mx-2 my-1 px-4 py-3 rounded-lg flex items-center gap-md transition-transform hover:translate-x-1 ${location.pathname === item.path ? 'active-nav-item' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            >
                                <span className="material-symbols-outlined" style={location.pathname === item.path ? {fontVariationSettings: "'FILL' 1"} : {}}>{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="px-4 mt-auto">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">System v2.4</p>
                            <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">Contact Help</button>
                        </div>
                    </div>
                </aside>
            );
        };

        const MobileBottomNav = () => {
            const location = useLocation();
            const navItems = [
                { label: 'Home', icon: 'home', path: '/' },
                { label: 'Bookings', icon: 'calendar_month', path: '/bookings' },
                { label: 'Venues', icon: 'stadium', path: '/venues' },
                { label: 'Profile', icon: 'person', path: '/settings' },
            ];

            return (
                <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg flex justify-around items-center px-4 pb-safe z-50 rounded-t-3xl">
                    {navItems.map(item => (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`flex flex-col items-center justify-center transition-transform active:scale-90 ${location.pathname === item.path ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl px-3 py-1' : 'text-slate-400 dark:text-slate-500'}`}
                        >
                            <span className="material-symbols-outlined" style={location.pathname === item.path ? {fontVariationSettings: "'FILL' 1"} : {}}>{item.icon}</span>
                            <span className="text-[11px] font-semibold tracking-wide uppercase">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            );
        };

        const TopAppBar = ({ title = "VenueMaster" }) => (
            <header className="fixed top-0 right-0 left-0 md:left-64 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm z-40">
                <div className="flex justify-between items-center w-full px-6 py-3 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-black dark:text-white md:hidden">menu</span>
                        <h1 className="text-xl font-black tracking-tighter text-black dark:text-white uppercase">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center bg-surface-container-low px-3 py-1.5 rounded-full border border-slate-200">
                            <span className="material-symbols-outlined text-sm text-slate-500 mr-2">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface" placeholder="Quick search..." type="text" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClXB-XE7xpBhN6sX0bMUN1mTtDAUXZTUJjlDWStT2FXaMro_ah-jogMyT5ci5tqAofPwGCiK-DsP_Kl8uLRaEcEeJyPTkI6WsYKzXjshZIDfJ7AxUEKU2asT1yaOhZePTqXd6q6LhKcKu031_GheQQA-4G9G0c48KKDZpVyeey0xQTSbFrvpB0ZL3WWKxt8At4HZLfN7pmyUSYAlcQURvoBRR_fmZc_pEueZEMNV762oKtbZNyUAxNzogHZYnW8L4pdyDJKaA-Kx0" alt="Avatar" />
                        </div>
                    </div>
                </div>
            </header>
        );

        // --- Pages ---

        const OwnerAnalytics = () => (
            <div className="md:ml-64 p-xl max-w-7xl mt-14">
                <header className="flex justify-between items-end mb-xxl">
                    <div>
                        <h1 className="font-h1 text-h1 text-primary">Owner Analytics</h1>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time performance metrics for Active Arena.</p>
                    </div>
                    <div className="flex gap-md hidden sm:flex">
                        <button className="flex items-center gap-sm px-lg py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-sm text-primary hover:bg-surface-container transition-colors">
                            <span className="material-symbols-outlined text-[20px]">file_download</span> Export Report
                        </button>
                        <button className="flex items-center gap-sm px-lg py-md bg-primary text-on-primary rounded-xl font-body-sm hover:opacity-90 transition-opacity">
                            <span className="material-symbols-outlined text-[20px]">add</span> Manual Booking
                        </button>
                    </div>
                </header>
                
                <section className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-xxl">
                    <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm flex flex-col gap-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-on-surface-variant font-caption text-caption uppercase tracking-wider">Venue Rating</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] px-sm py-xs rounded-full font-bold">+0.2 from last month</span>
                        </div>
                        <div className="flex items-center gap-sm">
                            <div className="flex items-baseline gap-xs">
                                <span className="font-h1 text-[32px] text-primary">4.8</span>
                                <span className="font-caption text-caption text-on-surface-variant">Average</span>
                            </div>
                            <span className="material-symbols-outlined text-amber-400" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        </div>
                        <div className="mt-md"><span className="text-[11px] text-on-surface-variant font-medium">Based on 124 reviews</span></div>
                    </div>

                    <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm flex flex-col gap-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-on-surface-variant font-caption text-caption uppercase tracking-wider">Occupancy Rate</span>
                            <span className="bg-error-container text-on-error-container text-[10px] px-sm py-xs rounded-full font-bold">-2.1%</span>
                        </div>
                        <div className="flex items-baseline gap-xs">
                            <span className="font-h1 text-[32px] text-primary">88.4%</span>
                            <span className="font-caption text-caption text-on-surface-variant">Capacity</span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-1 mt-md">
                            <div className="bg-secondary h-1 rounded-full w-[88%]"></div>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm flex flex-col gap-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-on-surface-variant font-caption text-caption uppercase tracking-wider">New Bookings</span>
                            <span className="bg-secondary-container text-on-secondary-container text-[10px] px-sm py-xs rounded-full font-bold">+5 new</span>
                        </div>
                        <div className="flex items-baseline gap-xs">
                            <span className="font-h1 text-[32px] text-primary">142</span>
                            <span className="font-caption text-caption text-on-surface-variant">Last 24h</span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-1 mt-md">
                            <div className="bg-secondary h-1 rounded-full w-[60%]"></div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl mb-xxl">
                    <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
                        <div className="p-xl border-b border-outline-variant flex justify-between items-center">
                            <h2 className="font-h2 text-h2 text-primary">Revenue Overview</h2>
                            <div className="flex bg-surface-container p-xs rounded-lg">
                                <button className="px-md py-xs bg-surface-container-lowest shadow-sm rounded-md text-caption font-bold text-primary">Weekly</button>
                                <button className="px-md py-xs text-caption font-medium text-on-surface-variant">Monthly</button>
                            </div>
                        </div>
                        <div className="p-xl flex-grow h-64 flex items-end justify-around gap-md">
                            <div className="w-full flex items-end justify-between px-md h-full pb-md">
                                <div className="w-8 bg-surface-container-highest rounded-t-lg h-[40%]"></div>
                                <div className="w-8 bg-surface-container-highest rounded-t-lg h-[55%]"></div>
                                <div className="w-8 bg-surface-container-highest rounded-t-lg h-[35%]"></div>
                                <div className="w-8 bg-secondary rounded-t-lg h-[85%] relative group">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Peak</div>
                                </div>
                                <div className="w-8 bg-surface-container-highest rounded-t-lg h-[60%]"></div>
                                <div className="w-8 bg-surface-container-highest rounded-t-lg h-[45%]"></div>
                                <div className="w-8 bg-surface-container-highest rounded-t-lg h-[70%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary text-on-primary rounded-xl p-xl shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-caption font-bold uppercase tracking-widest opacity-60 mb-sm">Top Sports</h3>
                            <div className="space-y-md">
                                <div className="flex justify-between items-center">
                                    <span className="font-body-sm font-medium">Tennis</span>
                                    <span className="font-body-sm">45%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1"><div className="bg-secondary-fixed h-1 rounded-full w-[45%]"></div></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-body-sm font-medium">Padel</span>
                                    <span className="font-body-sm">32%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1"><div className="bg-secondary-fixed h-1 rounded-full w-[32%]"></div></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-body-sm font-medium">Basketball</span>
                                    <span className="font-body-sm">23%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1"><div className="bg-secondary-fixed h-1 rounded-full w-[23%]"></div></div>
                            </div>
                        </div>
                        <div className="mt-xl pt-xl border-t border-white/10">
                            <p className="text-[11px] opacity-70 italic leading-relaxed">Bookings for Tennis courts are up by 12% since last month's lighting upgrade.</p>
                        </div>
                    </div>
                </div>
            </div>
        );

        const BookingManagement = () => (
            <div className="md:ml-64 p-xl max-w-7xl mt-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xxl">
                    <div>
                        <h2 className="font-h1 text-h1 text-on-surface mb-xs">Booking Management</h2>
                        <p className="font-body text-body text-on-surface-variant">Review and filter your venue reservation schedule.</p>
                    </div>
                    <div className="flex gap-md">
                        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined">pending_actions</span>
                            </div>
                            <div>
                                <p className="text-caption font-caption text-on-surface-variant">Pending</p>
                                <p className="text-h2 font-h2">12</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-lg mb-xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
                        <div className="space-y-xs">
                            <label className="text-caption font-caption text-on-surface-variant px-xs">Search Client</label>
                            <input className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Name or ID..." type="text" />
                        </div>
                        <div className="space-y-xs">
                            <label className="text-caption font-caption text-on-surface-variant px-xs">Sport Type</label>
                            <select className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg text-body-sm focus:ring-1 focus:ring-primary outline-none">
                                <option>All Sports</option>
                                <option>Tennis</option>
                                <option>Basketball</option>
                            </select>
                        </div>
                        <div className="space-y-xs">
                            <label className="text-caption font-caption text-on-surface-variant px-xs">Status</label>
                            <div className="flex gap-xs">
                                <button className="flex-1 px-3 py-2 bg-secondary text-on-secondary rounded-lg text-caption">All</button>
                                <button className="flex-1 px-3 py-2 bg-surface-container-low text-on-surface rounded-lg text-caption">Pending</button>
                            </div>
                        </div>
                        <div className="space-y-xs">
                            <label className="text-caption font-caption text-on-surface-variant px-xs">Date Range</label>
                            <input className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg text-body-sm" value="Oct 20 - Oct 27, 2023" readOnly />
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant">
                                    <th className="px-xl py-lg text-caption font-caption text-on-surface-variant uppercase">Client & Booking ID</th>
                                    <th className="px-xl py-lg text-caption font-caption text-on-surface-variant uppercase">Sport / Venue</th>
                                    <th className="px-xl py-lg text-caption font-caption text-on-surface-variant uppercase">Date & Time</th>
                                    <th className="px-xl py-lg text-caption font-caption text-on-surface-variant uppercase">Status</th>
                                    <th className="px-xl py-lg text-caption font-caption text-on-surface-variant uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                                {[
                                    { id: '#BK-94210', name: 'Johnathan Doe', initials: 'JD', sport: 'Tennis Court A', type: 'Indoor / Synthetic', date: 'Oct 24, 2023', time: '14:00 - 16:00 (2h)', status: 'Confirmed' },
                                    { id: '#BK-94215', name: 'Sarah Richardson', initials: 'SR', sport: 'Main Arena', type: 'Full Court', date: 'Oct 24, 2023', time: '18:30 - 20:00 (1.5h)', status: 'Pending' },
                                    { id: '#BK-94198', name: 'Michael Kim', initials: 'MK', sport: 'Field 3 (East)', type: 'Outdoor Turf', date: 'Oct 23, 2023', time: '09:00 - 11:00 (2h)', status: 'Completed' }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                                        <td className="px-xl py-lg">
                                            <div className="flex items-center gap-md">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold">{row.initials}</div>
                                                <div><p className="text-body-sm font-bold text-on-surface">{row.name}</p><p className="text-caption text-on-surface-variant">{row.id}</p></div>
                                            </div>
                                        </td>
                                        <td className="px-xl py-lg">
                                            <div className="flex flex-col"><span className="text-body-sm font-medium">{row.sport}</span><p className="text-caption text-on-surface-variant">{row.type}</p></div>
                                        </td>
                                        <td className="px-xl py-lg">
                                            <div className="flex flex-col"><p className="text-body-sm font-medium">{row.date}</p><p className="text-caption text-on-surface-variant">{row.time}</p></div>
                                        </td>
                                        <td className="px-xl py-lg">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.status === 'Confirmed' ? 'bg-secondary-container text-on-secondary-container border-secondary' : 'bg-surface-container-highest text-on-surface-variant border-outline-variant'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-xl py-lg text-right"><button className="material-symbols-outlined text-outline">more_vert</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

        const VenueDetails = () => (
            <div className="md:ml-64 p-xl max-w-7xl mt-14 mb-20">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="font-h1 text-h1 text-primary mb-2">Venue Details</h1>
                        <p className="font-body text-body text-on-primary-container">Manage your facility information, sports offerings, and media gallery.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-on-secondary font-medium transition-transform active:scale-95">
                        <span className="material-symbols-outlined">save</span> Save Changes
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-6">
                        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl shadow-sm">
                            <h3 className="font-h2 text-h2 flex items-center gap-2 mb-lg">
                                <span className="material-symbols-outlined text-secondary">info</span> General Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                                <div className="space-y-sm"><label className="font-caption text-caption text-outline uppercase">Venue Name</label>
                                <input className="w-full bg-white border border-outline-variant rounded-xl px-lg py-md" defaultValue="Active Arena Downtown" /></div>
                                <div className="space-y-sm"><label className="font-caption text-caption text-outline uppercase">Address</label>
                                <input className="w-full bg-white border border-outline-variant rounded-xl px-lg py-md" defaultValue="123 Athletic Way, Metropolis Central" /></div>
                                <div className="md:col-span-2 space-y-sm"><label className="font-caption text-caption text-outline uppercase">Description</label>
                                <textarea className="w-full bg-white border border-outline-variant rounded-xl px-lg py-md" rows="3" defaultValue="A premier multi-sport facility in the heart of the city." /></div>
                            </div>
                        </section>

                        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl shadow-sm">
                            <h3 className="font-h2 text-h2 flex items-center gap-2 mb-lg">
                                <span className="material-symbols-outlined text-secondary">photo_library</span> Media Gallery
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-outline-variant">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqjLAIZPgr-05dqXt0b3A1pq2DtG-U7sxciWeIhLO8Lrr5Hcg2gvm-NxeVvlszkDxWzcye9Iux2MmFoPgUodGPk_fnCCnYTVFdIgOl2odEigwVdaPwwEBjsWAYFrmAgaGEVNrr2C7wanmBl_3B3MQawfQknkYZ7F4o6WFY-BFQWnLB7HrhHn6ghjPjjpjCgY7dUOzsmY9FgGtQvY9hwJ3Ric4zQdsWSwsYxtJ_Or7PV-jFX2HRjoWCJLyw5FzW_h_jIgMZHePXAVc" />
                                </div>
                                <div className="relative aspect-video rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center bg-surface-container-low cursor-pointer">
                                    <span className="material-symbols-outlined text-outline">add_a_photo</span>
                                    <span className="font-caption text-caption text-outline">Upload</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl shadow-sm">
                            <h3 className="font-h2 text-h2 mb-lg">Sports Offered</h3>
                            <div className="flex flex-wrap gap-sm mb-lg">
                                {['Basketball', 'Tennis', 'Badminton'].map(s => (
                                    <span key={s} className="px-md py-xs bg-secondary text-on-secondary rounded-full text-caption font-semibold flex items-center gap-1">
                                        {s} <span className="material-symbols-outlined text-xs">close</span>
                                    </span>
                                ))}
                            </div>
                            <input className="w-full bg-white border border-outline-variant rounded-xl px-lg py-md" placeholder="Add a sport..." />
                        </section>

                        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl shadow-sm">
                            <h3 className="font-h2 text-h2 mb-lg">Pricing</h3>
                            <div className="space-y-sm">
                                <label className="font-caption text-caption text-outline uppercase">Base Rate (per hour)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">$</span>
                                    <input className="w-full bg-white border border-outline-variant rounded-xl pl-8 pr-lg py-md text-h2" defaultValue="45.00" />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );

        const Messages = () => (
            <div className="md:ml-64 flex h-screen overflow-hidden mt-14">
                <section className="w-1/3 min-w-[320px] max-w-[400px] bg-surface-container-low border-r border-outline-variant flex flex-col">
                    <div className="p-xl border-b border-outline-variant space-y-md">
                        <div className="flex justify-between items-center">
                            <h1 className="font-h1 text-h1 text-on-surface">Inbox</h1>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container">
                                <span className="material-symbols-outlined">edit_square</span>
                            </button>
                        </div>
                        <input className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl" placeholder="Search conversations..." />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[
                            { name: 'Marcus Thompson', time: '10:24 AM', msg: 'Is the 6 PM slot available?', active: true, online: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASxfbFe8GPlHERXJAXLhsgncFrYuLKqPkDzrSbLCzfLtUGzCz9vnijByemRSF7OfMs7naPECWceAKKt9i7j9S_so5l_39vVuEbAPn775R7LeGentzka0yvTZPE-6sA4OdqF-vozWKOR6fdpD0L9_fr2VnnKIoE5UMGMevqLRedW1Qa_Dbhw0xGSn15EKNDYpraY47FtLC8tYNkljQnd1JfG5BTxNP3Int0-65rfdwvCyQ5hvSX9QXBl36ypO558aDjDWyHD5cO3sA' },
                            { name: 'Sarah Jenkins', time: '09:15 AM', msg: 'Thanks for confirming!', active: false, online: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5JQ6ubCn6YdyjFau_qGMC1NbMYIOftdPzArUVsaIesDRoufa2oihNpCrCLGA7Nu6_QrfJZEL7cbbZvl4mr3Ofums6NXwDO-YR_nTq8oAeAH99glBase65F8byh6XmnYBPyRJ3UzZNA3FY1NLxV8_QkH01cpNAUziOlOYnEHO-ibtjy4_UgGfWSB_ehRIjuC7p8V-G-QVXv7mXlrera7L8GKVxaQVuNnPg07VCK2U7vZONOkNPvM438ZZVTNr9KOnT0_Slr8EgAWE' }
                        ].map((chat, i) => (
                            <div key={i} className={`p-lg flex gap-md items-center cursor-pointer ${chat.active ? 'bg-secondary-container/20 border-l-4 border-secondary' : 'hover:bg-surface-container border-b border-surface-container-high/50'}`}>
                                <div className="relative flex-shrink-0">
                                    <img className="w-12 h-12 rounded-full object-cover" src={chat.img} alt="Avatar" />
                                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-surface-container-lowest rounded-full"></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="font-h2 text-body-sm text-on-surface truncate">{chat.name}</h3>
                                        <span className="font-caption text-caption text-on-surface-variant">{chat.time}</span>
                                    </div>
                                    <p className={`font-body text-body-sm truncate ${chat.active ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`}>{chat.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="flex-1 bg-surface-container-lowest flex flex-col relative pb-24">
                    <header className="h-20 border-b border-outline-variant flex items-center justify-between px-xl bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                        <div className="flex items-center gap-md">
                            <div className="relative">
                                <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASxfbFe8GPlHERXJAXLhsgncFrYuLKqPkDzrSbLCzfLtUGzCz9vnijByemRSF7OfMs7naPECWceAKKt9i7j9S_so5l_39vVuEbAPn775R7LeGentzka0yvTZPE-6sA4OdqF-vozWKOR6fdpD0L9_fr2VnnKIoE5UMGMevqLRedW1Qa_Dbhw0xGSn15EKNDYpraY47FtLC8tYNkljQnd1JfG5BTxNP3Int0-65rfdwvCyQ5hvSX9QXBl36ypO558aDjDWyHD5cO3sA" alt="Avatar" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary border-2 border-surface-container-lowest rounded-full"></div>
                            </div>
                            <div>
                                <h2 className="font-h2 text-body text-on-surface">Marcus Thompson</h2>
                                <p className="font-caption text-caption text-secondary font-semibold">Online now</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-surface-container rounded-xl font-body-sm font-semibold">View Booking</button>
                    </header>
                    <div className="flex-1 overflow-y-auto p-xl space-y-xl bg-surface">
                        <div className="flex justify-center"><span className="px-3 py-1 bg-surface-container-high rounded-full font-caption text-caption">Today</span></div>
                        <div className="flex gap-md max-w-[80%]">
                            <div className="bg-white border border-outline-variant p-lg rounded-2xl rounded-bl-none shadow-sm text-body-sm">
                                Hello! I'm interested in booking the main arena for this evening. Is the 6 PM slot still available?
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-md max-w-[80%] ml-auto">
                            <div className="bg-primary text-on-primary p-lg rounded-2xl rounded-br-none shadow-sm text-body-sm">
                                Hi Marcus! Yes, the main arena is available at 6 PM. We just had a cancellation.
                            </div>
                        </div>
                    </div>
                    <footer className="p-xl bg-white border-t border-outline-variant">
                        <div className="max-w-4xl mx-auto flex items-end gap-md">
                            <button className="w-12 h-12 flex items-center justify-center text-on-surface-variant"><span className="material-symbols-outlined">add_circle</span></button>
                            <textarea className="flex-1 bg-surface-container-low border border-outline-variant rounded-2xl px-xl py-3.5 text-body-sm resize-none" placeholder="Type your message..." rows="1"></textarea>
                            <button className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow-lg"><span className="material-symbols-outlined">send</span></button>
                        </div>
                    </footer>
                </section>
            </div>
        );

        const Finance = () => (
            <div className="md:ml-64 p-xl max-w-7xl mt-14">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="font-h1 text-h1 text-primary">Earnings Overview</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Manage your venue's financial performance and history.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-primary font-bold text-sm rounded-xl">Export CSV</button>
                        <button className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-xl shadow-lg">Payout Now</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Total Revenue (MTD)</p>
                        <h3 className="text-4xl font-black text-primary mb-4">$12,450.00</h3>
                        <div className="flex items-center text-secondary font-bold text-sm"><span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12.5%</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Active Bookings</p>
                        <h3 className="text-3xl font-black text-primary mb-4">142</h3>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-secondary h-full w-[85%] rounded-full"></div></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Pending Payouts</p>
                        <h3 className="text-3xl font-black text-primary mb-4">$3,210.50</h3>
                        <p className="font-body-sm text-body-sm text-slate-500">Next: Friday, Oct 27</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="font-h2 text-h2 text-primary">Transaction History</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-8 py-4 font-caption text-on-surface-variant uppercase tracking-wider">Booking ID</th>
                                    <th className="px-8 py-4 font-caption text-on-surface-variant uppercase tracking-wider">Date</th>
                                    <th className="px-8 py-4 font-caption text-on-surface-variant uppercase tracking-wider">Customer</th>
                                    <th className="px-8 py-4 font-caption text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { id: '#VM-9482', date: 'Oct 24, 14:00', name: 'James S.', amount: '$85.00' },
                                    { id: '#VM-9481', date: 'Oct 24, 10:30', name: 'Maria L.', amount: '$120.00' },
                                    { id: '#VM-9480', date: 'Oct 23, 18:00', name: 'David K.', amount: '$250.00' }
                                ].map((t, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-4 font-bold">{t.id}</td>
                                        <td className="px-8 py-4 text-on-surface-variant">{t.date}</td>
                                        <td className="px-8 py-4">{t.name}</td>
                                        <td className="px-8 py-4 font-black text-right">{t.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

        const AccountSettings = () => (
            <div className="md:ml-64 p-xl max-w-4xl mx-auto mt-14 mb-24">
                <div className="mb-10">
                    <h1 className="font-h1 text-h1 text-on-surface mb-2">Account Settings</h1>
                    <p className="font-body text-body text-on-surface-variant">Manage your venue owner profile, security preferences, and account notifications.</p>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                        <div className="p-xl border-b border-outline-variant flex items-center justify-between bg-surface-bright">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container"><span className="material-symbols-outlined">person</span></div>
                                <h2 className="font-h2 text-h2">Profile Management</h2>
                            </div>
                            <button className="px-lg py-sm bg-primary text-on-primary rounded-xl font-medium text-body-sm">Save Changes</button>
                        </div>
                        <div className="p-xl flex flex-col md:flex-row gap-6 items-start">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container-high">
                                    <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBij-FOSmyucDVGUjjyd3k64HWvtwkLiXwHAtVQPs5NaAKlq3WwlbjaORnK4h0VvaMl6xpDf46K5_tqvCKAzAEnXfVOV3zcynmvg7k9fN76FvWSAGUn-IQZzvvWyBzCO9QA5Gyi-a5DgWspSgPmJr3fu1BzAB_KK2f7P2DiWGVOvxYfjGhHeQO-Qkb6bLFnLV-X_4ysBZhDwQLM-tBoSBkujgJIvcaV0DER7OeXU_XcPtLV8yovoDgeDQQYHS6V5TidrFvujdom0lo" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-200"><span className="material-symbols-outlined text-sm">photo_camera</span></button>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-2"><label className="font-caption text-on-surface-variant">Full Name</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-outline-variant" defaultValue="Marcus Thompson" /></div>
                                <div className="space-y-2"><label className="font-caption text-on-surface-variant">Email</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-outline-variant" defaultValue="m.thompson@activearena.com" /></div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="bg-error-container/20 rounded-xl border border-error/20 shadow-sm overflow-hidden">
                        <div className="p-xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div><h3 className="font-body font-bold text-on-surface">Delete Account</h3><p className="text-body-sm text-on-surface-variant">Irreversible action.</p></div>
                            <button className="px-xl py-3 bg-error text-on-error rounded-xl font-bold">Delete Permanently</button>
                        </div>
                    </section>
                </div>
            </div>
        );

        // --- App Entry Point ---

        const App = () => {
            return (
                <MemoryRouter>
                    <div className="flex flex-col min-h-screen">
                        <NavigationDrawer />
                        <TopAppBar />
                        
                        <main className="flex-1">
                            <Routes>
                                <Route path="/" element={<OwnerAnalytics />} />
                                <Route path="/bookings" element={<BookingManagement />} />
                                <Route path="/venues" element={<VenueDetails />} />
                                <Route path="/messages" element={<Messages />} />
                                <Route path="/finance" element={<Finance />} />
                                <Route path="/settings" element={<AccountSettings />} />
                            </Routes>
                        </main>

                        <MobileBottomNav />
                        
                        {/* Global Floating Action Button - Only visible on specific screens */}
                        <Routes>
                            <Route path="/" element={
                                <button className="fixed bottom-xl right-xl w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50 md:bottom-8 md:right-8">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            } />
                            <Route path="/bookings" element={
                                <button className="fixed bottom-xl right-xl w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50 md:bottom-8 md:right-8">
                                    <span className="material-symbols-outlined">calendar_add_on</span>
                                </button>
                            } />
                            <Route path="*" element={null} />
                        </Routes>
                    </div>
                </MemoryRouter>
            );
        };

        const root = createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
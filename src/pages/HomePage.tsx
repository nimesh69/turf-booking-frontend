import { Link } from "react-router-dom";

export default function HomePage() {
  const venues = [
    {
      id: 1,
      name: "Elite Arena",
      location: "Downtown District",
      price: "$85/hr",
      rating: 4.9,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCV3rH2ngHL8rQF5K3zHQnDMe6R8yszTy0cx16wMupEBqn_FWp3TjOvTvhvXx5tyX78asu7btcbByEkhUlFbINdfml9Zomk-rD4Urgkt74VwV2vfYQrxjpi5nPXJucLIE9HSWv3OTeV7O7dLcNoDRm4H7jzOdho8eysNksBTSE4xmjh5SOoylUkLIHhBowyVfjm53zj3nvli6lq8YcPWsHI8y_DET7PHX5URmhE1Ym2b640sbz5qDUzucihRutxAWbkAkWYCVNfihc",
      sports: ["Basketball", "Volleyball"],
    },
    {
      id: 2,
      name: "Green Turf Park",
      location: "North Garden",
      price: "$60/hr",
      rating: 4.8,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVTr0G8_X9u3DPjYLGR7BR_f0rgtax1kBT_0x-y3yj0PD9Dlf9LdKi7LwWfcw8TSOgoRJvuTcw7A5wR-MZI4MJhlsGLRhDui6sIjB6btTGJmx4cbFPSi7VqFlbKZCxHI4gVaFTP89HZiIKNE1LXa5ViCUf3WE0z46WxaEcMuxJekz_EOpc-jUEy6MXhRWbltWKqoEWbyboAa52Yr6kiYQw4EOkGmEIZtRobTj5Dgh9KJgeopq18_uT4DssjLPb8RrNPyXia80KkVU",
      sports: ["Soccer", "Lacrosse"],
    },
    {
      id: 3,
      name: "Velocity Sports Hub",
      location: "West Tech Park",
      price: "$120/hr",
      rating: 5.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDiKEe9XVhQPOabtEAlyzT_bN-TuplpcY2l1BSwb8aE3MQd6_MD1E-YspW9r3RPsjJsd6I9MwxCRJgR-fDOxK7-1YnGqKIkA7Tmf17k2AmOWL-QHE6wU8ccB6IgLNq_eITsworKuVdxKOJ10Y3G7FWQzQWyN_YT7w8uksPAeYGFPRQryQS-7f_Us81dI4hOGgg5YtsEq-V4ucIYZZQgY8sEubBi_Lju283sUQ-mpKHwf1AATtBOOC8K7mXiYKoRTuJB2cW-CgDTjWY",
      sports: ["Tennis", "Track"],
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote:
        '"The booking experience is flawlessly professional. I found a top-tier court for our league final in under two minutes. VenueMaster is a game changer."',
      author: "Marcus Thompson",
      role: "Semi-Pro Basketball Lead",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCt0MMuKPWg7MWEaFSXxJ_ua8K6m3HJBLbu5F5si9GOds13LyWGhNQCujHBTC71_WGozgKqWF58ALfU0vN6BWB5Zt0cMV02iuhTbpj2DQv3yo1-wysR6IXMaD22WK38K8IFHsWq3_ojuzg2BEPuC7pMLzd_VSpr_nMR_xa7_vWeEsLZQxrNHsq2haKhHn9AaCAomH2QVrr3zXVUvZ-0ShA0VA3b6YuE59Sm6L8p10orzyEpEGKpWgIKrBhTNHzcx-KMhg2GKdRXZXE",
    },
    {
      id: 2,
      quote:
        '"As a venue manager, the platform has automated our entire workflow. High-performance utility at its finest."',
      author: "Sarah Chen",
      role: "Director, Elite Sports Complex",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ydd3TnZ6OIYnweu6TjqkbMYiaBp2gKHr1bzltPYCfO6kreiB4Gukc6alCOrpkSgkJL-ZiuFqXWvoPpxO3IwzqJPrg93bRR3lMoDXNV39jCqE_xLf41DYEa8ESnd-KbPei_NRuw6hqC0BzsDSPIZwEUwi_9l2Ga_UMscWmK3InQ3H8zSahb94ysNwYeZ0O92iCJwo5_ybDUf0kRD_nI2cGnzi7Ii7pctVQzAySkU36Wr4NDVIDonMuxkwMBydiAZDqEJ32Wa7gTo",
    },
  ];

  const steps = [
    {
      icon: "search",
      title: "Find",
      description:
        "Browse our curated list of high-end venues filtered by location and sport.",
    },
    {
      icon: "event_available",
      title: "Book",
      description:
        "Secure your preferred time slot instantly with our seamless checkout system.",
    },
    {
      icon: "sports_handball",
      title: "Play",
      description:
        "Show up and dominate. We handle the logistics, you handle the game.",
    },
  ];

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-outline-variant">
        <nav className="max-w-7xl mx-auto px-xl py-lg flex justify-between items-center w-full">
          <div className="flex items-center gap-xxl">
            <span className="text-h2 font-h2 font-bold text-primary">
              VenueMaster
            </span>
            <div className="hidden md:flex gap-xl items-center">
              <Link
                to="/discover"
                className="text-primary font-bold border-b-2 border-primary pb-1 font-body text-body hover:text-primary transition-colors duration-200 active:scale-95"
              >
                Discover
              </Link>
              <Link
                to="/bookings"
                className="text-on-surface-variant font-body text-body hover:text-primary transition-colors duration-200 active:scale-95"
              >
                Bookings
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-lg">
            <Link
              to="/login"
              className="hidden md:block text-on-surface font-body text-body hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <button className="bg-primary text-on-primary px-xl py-md rounded-xl font-body text-body font-bold hover:opacity-90 transition-opacity active:scale-95">
              Host a Venue
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="relative h-[640px] w-full overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy2ufEM7ygSsHx1LqqkP52yWya4MLBkt54t2XRr10SbwtKBeOWSiNtanMfRilhLBNzWZV5oPVzcu9WNyCtKa0hw_ENtSZ0Fvt8Dzrx7XV3EAVKUH-GZBfPW0UomOVwTw1fb0ClLpccZey12ofJ1U1otK9Kp5vejs7bFgHzDa42FgF78vGKtaGJKgk5HT9fUThNqwPkGLONyW2RncIb7QA2LNcYgxgzK_OB_LxItIkS6p8XixpxaOHkO4kNXNYgA3vm_s1-dsD_BB4"
              alt="Sports complex"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[rgba(249,249,249,0.95)] via-[rgba(249,249,249,0.7)] to-[rgba(249,249,249,0)]"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-xl w-full">
            <div className="max-w-4xl">
              <h1 className="font-h1 text-[56px] leading-[64px] font-extrabold text-primary mb-xl tracking-tight">
                Find the Perfect Space for Every Game
              </h1>
              <p className="font-body text-[20px] leading-[30px] text-on-surface-variant mb-xxl max-w-lg">
                Effortless booking for sports enthusiasts. Discover and reserve
                premium courts, fields, and arenas in seconds.
              </p>
              {/* Hero Search Bar */}
              <div className="bg-surface-container-lowest p-sm rounded-[20px] shadow-lg flex flex-col md:flex-row gap-xs items-center border border-outline-variant">
                <div className="flex-1 flex items-center px-lg py-md gap-md border-r border-outline-variant w-full">
                  <span className="material-symbols-outlined text-outline">
                    location_on
                  </span>
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant">
                      Location
                    </span>
                    <input
                      className="bg-transparent border-none p-0 focus:ring-0 font-body text-body text-on-surface w-full outline-none"
                      placeholder="Where are you playing?"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-center px-lg py-md gap-md border-r border-outline-variant w-full">
                  <span className="material-symbols-outlined text-outline">
                    sports_tennis
                  </span>
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant">
                      Sport
                    </span>
                    <input
                      className="bg-transparent border-none p-0 focus:ring-0 font-body text-body text-on-surface w-full outline-none"
                      placeholder="Select Sport"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-center px-lg py-md gap-md w-full">
                  <span className="material-symbols-outlined text-outline">
                    calendar_today
                  </span>
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant">
                      Date
                    </span>
                    <input
                      className="bg-transparent border-none p-0 focus:ring-0 font-body text-body text-on-surface w-full outline-none"
                      placeholder="Add dates"
                      type="text"
                    />
                  </div>
                </div>
                <button className="bg-primary text-on-primary p-xl rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all w-full md:w-auto">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust / Partners Section */}
        <section className="bg-surface-container-low py-xxl border-b border-outline-variant">
          <div className="max-w-7xl mx-auto px-xl">
            <div className="flex flex-wrap justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all gap-xl">
              <span className="font-h2 text-h2 font-bold tracking-widest text-on-surface-variant">
                ASSOCIATION
              </span>
              <span className="font-h2 text-h2 font-bold tracking-widest text-on-surface-variant">
                LEAGUE PRO
              </span>
              <span className="font-h2 text-h2 font-bold tracking-widest text-on-surface-variant">
                STADIA.CO
              </span>
              <span className="font-h2 text-h2 font-bold tracking-widest text-on-surface-variant">
                ELITE SPORTS
              </span>
              <span className="font-h2 text-h2 font-bold tracking-widest text-on-surface-variant">
                CLUB CONNECT
              </span>
            </div>
          </div>
        </section>

        {/* Featured Venues Section */}
        <section className="py-xxl max-w-7xl mx-auto px-xl">
          <div className="flex justify-between items-end mb-xxl">
            <div>
              <h2 className="font-h1 text-h1 text-primary mb-sm">
                Featured Venues
              </h2>
              <p className="font-body text-body text-on-surface-variant">
                Top-rated spaces for high-performance athletes.
              </p>
            </div>
            <Link
              to="/venues"
              className="text-primary font-bold flex items-center gap-sm hover:underline"
            >
              View all venues{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-surface-container-lowest rounded-[16px] border border-outline-variant overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-[240px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={venue.image}
                    alt={venue.name}
                  />
                  <div className="absolute top-lg right-lg bg-surface-container-lowest/90 backdrop-blur px-md py-xs rounded-full flex items-center gap-xs">
                    <span
                      className="material-symbols-outlined text-[18px] text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-caption text-caption font-bold">
                      {venue.rating}
                    </span>
                  </div>
                </div>
                <div className="p-xl">
                  <div className="flex justify-between items-start mb-md">
                    <div>
                      <h3 className="font-h2 text-h2 text-primary mb-xs">
                        {venue.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px]">
                          location_on
                        </span>{" "}
                        {venue.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                        Starting at
                      </p>
                      <p className="font-h2 text-h2 text-secondary font-bold">
                        {venue.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-sm mb-xl">
                    {venue.sports.map((sport) => (
                      <span
                        key={sport}
                        className="bg-surface-container-low px-md py-xs rounded-full font-caption text-caption text-on-surface-variant"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/venue/${venue.id}`}
                    className="w-full block text-center bg-primary text-on-primary py-md rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-surface py-xxl">
          <div className="max-w-7xl mx-auto px-xl">
            <div className="text-center mb-xxl">
              <h2 className="font-h1 text-h1 text-primary mb-sm">
                Your Game, Three Steps Away
              </h2>
              <p className="font-body text-body text-on-surface-variant">
                We've streamlined the process so you can focus on the play.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xxl relative">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-[20px] bg-secondary-container flex items-center justify-center mb-xl group-hover:rotate-6 transition-transform">
                    <span className="material-symbols-outlined text-[40px] text-on-secondary-container">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="font-h2 text-h2 text-primary mb-md">
                    {step.title}
                  </h3>
                  <p className="font-body text-body text-on-surface-variant max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-xxl max-w-7xl mx-auto px-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xxl items-center">
            <div className="space-y-xl">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-surface-container p-xxl rounded-[20px] border border-outline-variant relative"
                >
                  <span className="material-symbols-outlined text-secondary text-[48px] absolute top-lg right-lg opacity-20">
                    format_quote
                  </span>
                  <p className="font-h2 text-h2 text-primary italic mb-xl">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={testimonial.image}
                        alt={testimonial.author}
                      />
                    </div>
                    <div>
                      <p className="font-body font-bold text-primary">
                        {testimonial.author}
                      </p>
                      <p className="font-caption text-caption text-on-surface-variant">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:pl-xxl">
              <h2 className="font-h1 text-[40px] leading-[48px] font-extrabold text-primary mb-xl">
                Trusted by the Best in the Game
              </h2>
              <p className="font-body text-body text-on-surface-variant mb-xl">
                Over 500+ premium venues and 10,000+ athletes use VenueMaster to
                organize their weekly sessions. Join the community that
                prioritizes performance and quality.
              </p>
              <div className="flex gap-xl">
                <div className="flex flex-col">
                  <span className="font-h1 text-h1 text-secondary">10k+</span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase">
                    Active Users
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-h1 text-h1 text-secondary">500+</span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase">
                    Venues
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-h1 text-h1 text-secondary">24/7</span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase">
                    Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-xl pb-xxl">
          <div className="bg-primary rounded-[24px] p-xxl text-center relative overflow-hidden">
            <div className="absolute -top-xxl -right-xxl w-64 h-64 bg-secondary opacity-20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-xxl -left-xxl w-64 h-64 bg-secondary opacity-10 rounded-full blur-[80px]"></div>
            <div className="relative z-10 py-xl">
              <h2 className="font-h1 text-[48px] leading-[56px] text-on-primary mb-xl">
                Own a Premium Space?
              </h2>
              <p className="font-body text-[20px] text-on-primary-container max-w-2xl mx-auto mb-xxl">
                Unlock new revenue streams and reach more athletes by listing
                your facility on VenueMaster.
              </p>
              <div className="flex flex-col md:flex-row gap-lg justify-center">
                <button className="bg-secondary text-on-secondary px-xxl py-xl rounded-xl font-h2 font-bold hover:opacity-90 active:scale-95 transition-all">
                  List Your Venue Today
                </button>
                <button className="bg-on-primary/10 text-on-primary border border-on-primary/20 backdrop-blur-sm px-xxl py-xl rounded-xl font-h2 font-bold hover:bg-on-primary/20 transition-all">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-xl py-xxl flex flex-col md:flex-row justify-between items-start gap-lg">
          <div className="max-w-xs">
            <span className="text-h2 font-h2 font-bold text-primary mb-md block">
              VenueMaster
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-xl">
              The world's leading platform for premium sports venue booking and
              management. Performance-focused utility for the modern athlete.
            </p>
            <div className="flex gap-md">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">
                public
              </span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">
                share
              </span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">
                mail
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-xxl">
            <div>
              <h4 className="font-body font-bold text-primary mb-lg">
                Platform
              </h4>
              <ul className="space-y-md">
                <li>
                  <Link
                    to="/discover"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-body font-bold text-primary mb-lg">
                Company
              </h4>
              <ul className="space-y-md">
                <li>
                  <Link
                    to="/about"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-body font-bold text-primary mb-lg">Legal</h4>
              <ul className="space-y-md">
                <li>
                  <Link
                    to="/terms"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-on-surface-variant font-body text-body-sm hover:text-secondary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-xl py-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="font-caption text-caption text-on-surface-variant">
            © 2024 VenueMaster. All rights reserved.
          </span>
          <div className="flex gap-xl items-center">
            <span className="font-caption text-caption text-on-surface-variant">
              Language: English (US)
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              Currency: USD ($)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

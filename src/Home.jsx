import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-73px)] flex flex-col items-center p-8 overflow-y-auto scroll-smooth">
      <div className="max-w-5xl w-full space-y-16 py-12 pb-32">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-emerald-500">
            Welcome to CSScape
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Master cascading style sheets through interactive visualization and competitive multiplayer gameplay.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
            <Link 
              to="/vistool" 
              className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all text-lg flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              Explore Vistool
            </Link>
            <Link 
              to="/game" 
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all text-lg flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Play the Game
            </Link>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 text-center">About the Platform</h2>
          <p className="text-slate-700 dark:text-slate-300 text-center max-w-3xl mx-auto text-lg">
            Whether you are just starting out with web development or looking to sharpen your frontend skills, this platform is designed to make learning CSS intuitive and fun. Transition seamlessly from learning the fundamentals in our sandbox to testing your knowledge against others.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Vistool Feature Card */}
          <div className="p-8 bg-white/40 dark:bg-slate-900/40 border border-sky-200 dark:border-sky-900/50 rounded-2xl shadow-md hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-600 transition-all flex flex-col h-full group">
            <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Vistool Sandbox</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 grow">
              A comprehensive interactive sandbox. Adjust sliders, pick colors, and toggle dropdowns to instantly see how layout properties like Flexbox, Grid, Margin, and Position manipulate the Document Object Model in real-time.
            </p>
            <Link to="/vistool" className="text-sky-600 dark:text-sky-400 font-bold hover:text-sky-700 dark:hover:text-sky-300 inline-flex items-center gap-1">
              Open Vistool <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>

          {/* Game Feature Card */}
          <div className="p-8 bg-white/40 dark:bg-slate-900/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl shadow-md hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-600 transition-all flex flex-col h-full group">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Multiplayer Game</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 grow">
              Put your layout skills to the test. Compete against other players in real-time challenges by writing the raw CSS required to perfectly replicate complex target structures.
            </p>
            <Link to="/game" className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1">
              Enter the Arena <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
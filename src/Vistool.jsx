import { useState } from 'react'
import Navbar from './Navbar'

export default function Vistool() {
  const Topics = [
    'Background', 
    'Border',  
    'Dimensions', 
    'Display', 
    'Flex', 
    'Font',
    'Grid', 
    'Justify & Align', 
    'Margin', 
    'Padding', 
    'Position', 
    'Shadow',
    'Transform', 
    'Z-index'
  ]

  // State: Background
  const [bgColor, setBgColor] = useState('#0ea5e9')
  // State: Background Gradient
  const [gradColor1, setGradColor1] = useState('#7dd3fc')
  const [gradColor2, setGradColor2] = useState('#fde68a')
  const [gradDirection, setGradDirection] = useState('to bottom right')
  // Helper function to calculate if a color is light or dark
const getContrastColor = (hexColor) => {
  // Check if it's a valid hex code, default to white if not
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexColor)) return '#ffffff';
  
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate perceived brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return dark slate for light backgrounds, white for dark backgrounds
  return brightness > 128 ? '#0f172a' : '#ffffff'; 
};

  // State: Border
  const [borderWidth, setBorderWidth] = useState(4)
  const [borderStyle, setBorderStyle] = useState('solid')
  const [borderColor, setBorderColor] = useState('#0ea5e9')
  const [borderRadius, setBorderRadius] = useState(8)

  // State: Dimensions
  const [dimWidth, setDimWidth] = useState(250)
  const [dimHeight, setDimHeight] = useState(150)

  // State: Display
  const [displayVal, setDisplayVal] = useState('block')

  // State: Flex
  const [flexDir, setFlexDir] = useState('row')
  const [flexCount, setFlexCount] = useState(3)

  // State: Font
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState(400)
  const [fontFamily, setFontFamily] = useState('sans-serif')
  const [fontStyle, setFontStyle] = useState('normal')

  // State: Grid
  const [gridCols, setGridCols] = useState(3)
  const [gridRows, setGridRows] = useState(2)
  const [gridGap, setGridGap] = useState(16)
  const [gridCount, setGridCount] = useState(6)

  // State: Justify & Align
  const [justifyContent, setJustifyContent] = useState('center')
  const [alignItems, setAlignItems] = useState('center')
  const [alignSelf, setAlignSelf] = useState('auto')
  const [jaCount, setJaCount] = useState(3)

  // State: Margin & Padding
  const [marginAll, setMarginAll] = useState(16)
  const [marginCount, setMarginCount] = useState(3)
  const [paddingAll, setPaddingAll] = useState(24)

  // State: Position
  const [posType, setPosType] = useState('relative')
  const [posTop, setPosTop] = useState(0)
  const [posLeft, setPosLeft] = useState(0)

  // State: Shadow
  const [shadowH, setShadowH] = useState(10)
  const [shadowV, setShadowV] = useState(10)
  const [shadowBlur, setShadowBlur] = useState(15)
  const [shadowSpread, setShadowSpread] = useState(-3)
  const [shadowColor, setShadowColor] = useState('#000000')

  // State: Transform
  const [tfOrigin, setTfOrigin] = useState('center')
  const [tfRotate, setTfRotate] = useState(45)
  const [tfScale, setTfScale] = useState(1.2)
  const [tfTranslateX, setTfTranslateX] = useState(20)
  const [tfSkewX, setTfSkewX] = useState(0)

  // State: Z-Index
  const [zIndexTarget, setZIndexTarget] = useState(10)
  const [zCount, setZCount] = useState(2)

  return (
    <div className="flex grow w-full h-full">
      <Navbar type="Topics" items={Topics} />

      <div className="flex flex-col grow p-8 overflow-y-auto scroll-smooth">
        <div className="w-full max-w-4xl mx-auto space-y-12 pb-32">
          
          <div className="p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Visualization Tool</h2>
            <p className="text-slate-700 dark:text-slate-300">Select a CSS property from the sidebar to jump to its interactive visualizer.</p>
          </div>

          {/* BACKGROUND SECTION */}
          <section id="background" className="p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Background</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The background property sets the background effects for an element, including solid colors, images, and gradients.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 w-fit shadow-sm text-sm">
                background-color: <span className="text-sky-600 dark:text-sky-400">{bgColor}</span>;
              </p>
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 w-fit shadow-sm text-sm">
                background-image: <span className="text-emerald-600 dark:text-emerald-400">linear-gradient</span>({gradDirection}, <span className="text-sky-600 dark:text-sky-400">{gradColor1}</span>, <span className="text-amber-600 dark:text-amber-400">{gradColor2}</span>);
              </p>
            </div>
            
            <div className="flex flex-col gap-10">
              
              {/* Row 1: Solid Color */}
              <div className="flex gap-8">
                <div className="w-1/3 flex flex-col gap-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Solid Color</h4>
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Background Color
                    <div className="flex gap-2 mt-2">
                      <input 
                        type="color" 
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-12 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent" 
                      />
                      <input 
                        type="text" 
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="grow p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300" 
                      />
                    </div>
                  </label>
                </div>
                
                <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-48">
                  <div 
                    className="w-full h-full rounded-lg shadow-md flex items-center justify-center font-bold text-xl border border-slate-300 dark:border-slate-600 transition-colors"
                    style={{ 
                      backgroundColor: bgColor,
                      color: getContrastColor(bgColor)
                    }}
                  >
                    Solid Preview
                  </div>
                </div>
              </div>

              <hr className="border-slate-300 dark:border-slate-700" />

              {/* Row 2: Linear Gradient */}
              <div className="flex gap-8">
                <div className="w-1/3 flex flex-col gap-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Linear Gradient</h4>
                  
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Direction
                    <select value={gradDirection} onChange={(e) => setGradDirection(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-300">
                      <option value="to right">to right (0deg)</option>
                      <option value="to bottom right">to bottom right (135deg)</option>
                      <option value="to bottom">to bottom (180deg)</option>
                      <option value="to bottom left">to bottom left (225deg)</option>
                      <option value="to left">to left (270deg)</option>
                      <option value="to top left">to top left (315deg)</option>
                      <option value="to top">to top (360deg)</option>
                      <option value="to top right">to top right (45deg)</option>
                    </select>
                  </label>

                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Color 1 (Start)
                    <div className="flex gap-2 mt-2">
                      <input 
                        type="color" 
                        value={gradColor1}
                        onChange={(e) => setGradColor1(e.target.value)}
                        className="h-10 w-12 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent" 
                      />
                      <input 
                        type="text" 
                        value={gradColor1}
                        onChange={(e) => setGradColor1(e.target.value)}
                        className="grow p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-300" 
                      />
                    </div>
                  </label>

                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Color 2 (End)
                    <div className="flex gap-2 mt-2">
                      <input 
                        type="color" 
                        value={gradColor2}
                        onChange={(e) => setGradColor2(e.target.value)}
                        className="h-10 w-12 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent" 
                      />
                      <input 
                        type="text" 
                        value={gradColor2}
                        onChange={(e) => setGradColor2(e.target.value)}
                        className="grow p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-300" 
                      />
                    </div>
                  </label>
                </div>
                
                <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-64">
                  <div 
                    className="w-full h-full rounded-lg shadow-md flex items-center justify-center font-bold text-xl border border-slate-300 dark:border-slate-600 transition-all text-slate-800"
                    style={{ 
                      backgroundImage: `linear-gradient(${gradDirection}, ${gradColor1}, ${gradColor2})`
                    }}
                  >
                    Gradient Preview
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* BORDER SECTION */}
          <section id="border" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Border</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The border property dictates the boundary around an element's content and padding.
            </p>
            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              border: <span className="text-sky-600 dark:text-sky-400">{borderWidth}px</span> <span className="text-emerald-600 dark:text-emerald-400">{borderStyle}</span> <span className="text-purple-600 dark:text-purple-400">{borderColor}</span>;
            </p>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Border Width (px)</span>
                    <span>{borderWidth}px</span>
                  </div>
                  <input type="range" min="0" max="32" value={borderWidth} onChange={(e) => setBorderWidth(e.target.value)} className="mt-1 accent-sky-500" />
                </label>

                <div id="border-style" className="scroll-mt-24 pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Border Style
                    <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                      <option value="solid">solid</option>
                      <option value="dashed">dashed</option>
                      <option value="dotted">dotted</option>
                      <option value="double">double</option>
                      <option value="groove">groove</option>
                      <option value="ridge">ridge</option>
                    </select>
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Border Color
                    <div className="flex gap-2 mt-2">
                      <input 
                        type="color" 
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="h-10 w-12 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent" 
                      />
                      <input 
                        type="text" 
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="grow p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300" 
                      />
                    </div>
                  </label>
                </div>

                <div id="border-radius" className="scroll-mt-24 pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Border Radius (px)</span>
                      <span>{borderRadius}px</span>
                    </div>
                    <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} className="mt-1 accent-sky-500" />
                  </label>
                </div>
              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-100">
                <div 
                  className="bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium"
                  style={{
                    width: '250px',
                    height: '250px',
                    borderWidth: `${borderWidth}px`,
                    borderStyle: borderStyle,
                    borderColor: borderColor,
                    borderRadius: `${borderRadius}px`
                  }}
                >
                  Preview Box
                </div>
              </div>
            </div>
          </section>

          {/* DIMENSIONS SECTION */}
          <section id="dimensions" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Dimensions</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Controls the width and height properties of an element, dictating its overall size within the layout document.
            </p>
            
            <div className="flex gap-4 mb-8">
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm">
                width: <span className="text-sky-600 dark:text-sky-400">{dimWidth}px</span>;
              </p>
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm">
                height: <span className="text-emerald-600 dark:text-emerald-400">{dimHeight}px</span>;
              </p>
            </div>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Width (px)</span>
                    <span>{dimWidth}px</span>
                  </div>
                  <input type="range" min="50" max="400" value={dimWidth} onChange={(e) => setDimWidth(e.target.value)} className="mt-1 accent-sky-500" />
                </label>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Height (px)</span>
                      <span>{dimHeight}px</span>
                    </div>
                    <input type="range" min="50" max="400" value={dimHeight} onChange={(e) => setDimHeight(e.target.value)} className="mt-1 accent-emerald-500" />
                  </label>
                </div>
              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-112.5">
                <div 
                  className="bg-sky-500 flex items-center justify-center text-white font-medium rounded-md shadow-md"
                  style={{
                    width: `${dimWidth}px`,
                    height: `${dimHeight}px`
                  }}
                >
                  Preview Box
                </div>
              </div>
            </div>
          </section>

          {/* DISPLAY SECTION */}
          <section id="display" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            
            {/* Inline style to handle the fade-in animation */}
            <style>{`
              @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(5px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
              }
            `}</style>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Display</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Determines whether an element is treated as a block or inline element, and sets the layout model used for its children.
            </p>
            
            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              display: <span className="text-sky-600 dark:text-sky-400">{displayVal}</span>;
            </p>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  Display Value
                  <select value={displayVal} onChange={(e) => setDisplayVal(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                    <option value="block">block</option>
                    <option value="inline">inline</option>
                    <option value="inline-block">inline-block</option>
                    <option value="none">none</option>
                    <option value="flex">flex</option>
                    <option value="grid">grid</option>
                  </select>
                </label>

                {/* Dynamic Info Box */}
                <div className="pt-2">
                  <div 
                    key={displayVal} 
                    className="p-4 bg-sky-100/50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 shadow-sm animate-fade-in-up"
                  >
                    <strong className="text-sky-700 dark:text-sky-400 mb-1 uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {displayVal}
                    </strong>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {displayVal === 'block' && 'Starts on a new line and takes up the full width available. Elements naturally stack vertically.'}
                      {displayVal === 'inline' && 'Does not start on a new line and only takes up as much width as necessary. Width and height properties have no effect.'}
                      {displayVal === 'inline-block' && 'Behaves like an inline element (flows horizontally with text), but allows you to set custom width and height.'}
                      {displayVal === 'none' && 'Completely removes the element from the document layout, freeing up its space entirely as if it did not exist.'}
                      {displayVal === 'flex' && 'Turns the element into a flex container, enabling a one-dimensional (row or column) layout model for its children.'}
                      {displayVal === 'grid' && 'Turns the element into a grid container, enabling a powerful two-dimensional (rows and columns) layout model.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-75">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-md w-full text-slate-700 dark:text-slate-300 shadow-sm border border-slate-300 dark:border-slate-700">
                  <span>Here is some text before the element. </span>
                  <div 
                    className="bg-sky-500 text-white font-medium px-4 py-2 rounded shadow-md border border-sky-600"
                    style={{ display: displayVal }}
                  >
                    Target Element
                  </div>
                  <span> And here is some text flowing after the element to demonstrate document flow.</span>
                </div>
              </div>
            </div>
          </section>

          {/* FLEX SECTION */}
          <section id="flex" className="p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Flex</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Flexbox provides a one-dimensional layout method for arranging items in rows or columns, managing their alignment and space distribution.
            </p>

            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              flex-direction: <span className="text-sky-600 dark:text-sky-400">{flexDir}</span>;
            </p>
            
            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  Flex Direction
                  <select value={flexDir} onChange={(e) => setFlexDir(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                    <option value="row">row</option>
                    <option value="column">column</option>
                  </select>
                </label>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Child Elements ({flexCount}/6)</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFlexCount(c => Math.min(6, c + 1))} 
                      disabled={flexCount >= 6}
                      className="grow px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors shadow-sm"
                    >
                      + Add
                    </button>
                    <button 
                      onClick={() => setFlexCount(c => Math.max(1, c - 1))} 
                      disabled={flexCount <= 1}
                      className="grow px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-200 font-medium rounded-md transition-colors shadow-sm"
                    >
                      - Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grow flex bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-87.5">
                <div 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400 dark:border-slate-500 p-4 rounded-lg flex gap-4 overflow-auto"
                  style={{ flexDirection: flexDir }}
                >
                  {Array.from({ length: flexCount }).map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-sky-500 rounded-md flex shrink-0 items-center justify-center text-white font-bold shadow-md">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FONT SECTION */}
          <section id="font" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Font</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Defines the typographic characteristics of text elements, dictating how characters are rendered.
            </p>

            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              font: <span className="text-sky-600 dark:text-sky-400">{fontStyle}</span> <span className="text-purple-600 dark:text-purple-400">{fontWeight}</span> <span className="text-pink-600 dark:text-pink-400">{fontSize}px</span> <span className="text-amber-600 dark:text-amber-400">{fontFamily}</span>;
            </p>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <div className="pb-6 border-b border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Font Style
                    <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                      <option value="normal">normal</option>
                      <option value="italic">italic</option>
                      <option value="oblique">oblique</option>
                    </select>
                  </label>
                </div>

                <div id="font-weight" className="scroll-mb-24 pb-6 border-b border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Font Weight</span>
                      <span>{fontWeight}</span>
                    </div>
                    <input type="range" min="100" max="900" step="100" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} className="mt-1 accent-purple-500" />
                  </label>
                </div>

                <div id="font-size" className="scroll-mt-24">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Font Size (px)</span>
                      <span>{fontSize}px</span>
                    </div>
                    <input type="range" min="8" max="72" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="mt-1 accent-pink-500" />
                  </label>
                </div>


                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Font Family
                    <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 dark:text-slate-300">
                      <option value="sans-serif">sans-serif</option>
                      <option value="serif">serif</option>
                      <option value="monospace">monospace</option>
                      <option value="cursive">cursive</option>
                    </select>
                  </label>
                </div>

              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-100 overflow-hidden text-center">
                <div 
                  className="text-slate-900 dark:text-slate-100 max-w-full wrap-break-word"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                    fontFamily: fontFamily,
                    fontStyle: fontStyle
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </div>
              </div>
            </div>
          </section>

          {/* GRID SECTION */}
          <section id="grid" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Grid</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Provides a two-dimensional layout system that organizes content into a matrix of columns and rows.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm w-fit">
                grid-template-columns: <span className="text-sky-600 dark:text-sky-400">repeat({gridCols}, 1fr)</span>;
              </p>
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm w-fit">
                gap: <span className="text-emerald-600 dark:text-emerald-400">{gridGap}px</span>;
              </p>
            </div>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Columns</span>
                    <span>{gridCols}</span>
                  </div>
                  <input type="range" min="1" max="6" value={gridCols} onChange={(e) => setGridCols(e.target.value)} className="mt-1 accent-sky-500" />
                </label>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Rows</span>
                      <span>{gridRows}</span>
                    </div>
                    <input type="range" min="1" max="6" value={gridRows} onChange={(e) => setGridRows(e.target.value)} className="mt-1 accent-purple-500" />
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Grid Gap (px)</span>
                      <span>{gridGap}px</span>
                    </div>
                    <input type="range" min="0" max="64" value={gridGap} onChange={(e) => setGridGap(e.target.value)} className="mt-1 accent-emerald-500" />
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Child Elements ({gridCount}/12)</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setGridCount(c => Math.min(12, c + 1))} 
                      disabled={gridCount >= 12}
                      className="grow px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors shadow-sm"
                    >
                      + Add
                    </button>
                    <button 
                      onClick={() => setGridCount(c => Math.max(1, c - 1))} 
                      disabled={gridCount <= 1}
                      className="grow px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-200 font-medium rounded-md transition-colors shadow-sm"
                    >
                      - Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grow flex bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-100 overflow-auto">
                <div 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400 dark:border-slate-500 p-4 rounded-lg grid"
                  style={{
                    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                    gap: `${gridGap}px`
                  }}
                >
                  {Array.from({ length: gridCount }).map((_, i) => (
                    <div key={i} className="bg-sky-500 rounded-md flex items-center justify-center text-white font-bold shadow-md min-h-15 p-4">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* JUSTIFY & ALIGN SECTION */}
          <section id="justify-&-align" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Justify & Align</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Controls the alignment and spacing of items across the horizontal axis (justify) and vertical axis (align) within flexbox or grid containers.
            </p>

            {/* Align/Justify Table */}
            <div className="overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 mb-8 bg-slate-100 dark:bg-slate-900/50 shadow-sm">
              <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-200/80 dark:bg-slate-800/80 border-b border-slate-300 dark:border-slate-700">
                  <tr>
                    <th className="p-4 font-bold">Property Suffix</th>
                    <th className="p-4 font-bold">Scope & Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 dark:divide-slate-700">
                  <tr>
                    <td className="p-4 font-mono text-sky-600 dark:text-sky-400">*-content</td>
                    <td className="p-4">Aligns the <strong>entire group</strong> of items (all flex lines or grid tracks) as a single block within the container's available extra space.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400">*-items</td>
                    <td className="p-4">Aligns <strong>all individual items</strong> simultaneously within their respective active row, line, or grid cell space.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-purple-600 dark:text-purple-400">*-self</td>
                    <td className="p-4">Applied directly to a <strong>single child element</strong> to override the container's default <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">-items</code> alignment.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="grow text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-4 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm text-sm">
                <span className="text-sky-600 dark:text-sky-400 font-bold block mb-2 uppercase tracking-wide text-xs">Container Properties</span>
                justify-content: <span className="text-slate-500">{justifyContent}</span>;<br/>
                align-items: <span className="text-slate-500">{alignItems}</span>;
              </div>
              <div className="grow text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-4 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm text-sm">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-2 uppercase tracking-wide text-xs">Individual Item Properties</span>
                align-self: <span className="text-slate-500">{alignSelf}</span>;
              </div>
            </div>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-sky-600 dark:text-sky-400">Container Alignment</h4>
                  
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                    justify-content (Main Axis)
                    <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                      <option value="flex-start">flex-start</option>
                      <option value="center">center</option>
                      <option value="flex-end">flex-end</option>
                      <option value="space-between">space-between</option>
                      <option value="space-around">space-around</option>
                      <option value="space-evenly">space-evenly</option>
                    </select>
                  </label>

                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    align-items (Cross Axis)
                    <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                      <option value="stretch">stretch</option>
                      <option value="flex-start">flex-start</option>
                      <option value="center">center</option>
                      <option value="flex-end">flex-end</option>
                      <option value="baseline">baseline</option>
                    </select>
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Target Item Alignment</h4>
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    align-self (Target Item 2)
                    <select value={alignSelf} onChange={(e) => setAlignSelf(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-300">
                      <option value="auto">auto</option>
                      <option value="flex-start">flex-start</option>
                      <option value="center">center</option>
                      <option value="flex-end">flex-end</option>
                      <option value="stretch">stretch</option>
                    </select>
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Child Elements ({jaCount}/5)</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setJaCount(c => Math.min(5, c + 1))} 
                      disabled={jaCount >= 5}
                      className="grow px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors shadow-sm"
                    >
                      + Add
                    </button>
                    <button 
                      onClick={() => setJaCount(c => Math.max(2, c - 1))} 
                      disabled={jaCount <= 2}
                      className="grow px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-200 font-medium rounded-md transition-colors shadow-sm"
                    >
                      - Remove
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Preview Container */}
              <div className="grow flex bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-112.5 overflow-hidden">
                <div 
                  className="w-full h-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400 dark:border-slate-500 p-4 rounded-lg flex flex-wrap gap-4 overflow-auto"
                  style={{
                    justifyContent: justifyContent,
                    alignItems: alignItems
                  }}
                >
                  {Array.from({ length: jaCount }).map((_, i) => (
                    i === 1 ? (
                      <div 
                        key={i}
                        className="w-14 min-h-14 bg-emerald-500 border-4 border-emerald-300 rounded-md flex shrink-0 items-center justify-center text-white font-bold shadow-lg p-2"
                        style={{ alignSelf: alignSelf }}
                      >
                        2
                      </div>
                    ) : (
                      <div key={i} className="w-14 min-h-14 bg-sky-500 rounded-md flex shrink-0 items-center justify-center text-white font-bold shadow-md p-2">
                        {i + 1}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* MARGIN SECTION */}
          <section id="margin" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Margin</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Creates space around elements, completely outside of any defined borders, effectively pushing adjacent elements away.
            </p>

            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              margin: <span className="text-sky-600 dark:text-sky-400">{marginAll}px</span>;
            </p>
            
            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Margin All (px)</span>
                    <span>{marginAll}px</span>
                  </div>
                  <input type="range" min="0" max="64" value={marginAll} onChange={(e) => setMarginAll(e.target.value)} className="mt-1 accent-sky-500" />
                </label>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Elements ({marginCount}/7)</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setMarginCount(c => Math.min(7, c + 1))} 
                      disabled={marginCount >= 7}
                      className="grow px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors shadow-sm"
                    >
                      + Add
                    </button>
                    <button 
                      onClick={() => setMarginCount(c => Math.max(1, c - 1))} 
                      disabled={marginCount <= 1}
                      className="grow px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 dark:text-slate-200 font-medium rounded-md transition-colors shadow-sm"
                    >
                      - Remove
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Preview Container */}
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-75 overflow-hidden">
                <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-inner items-center justify-center overflow-auto w-full max-h-full">
                  {Array.from({ length: marginCount }).map((_, i) => (
                    i === 1 ? (
                      <div 
                        key={i}
                        className="w-16 h-16 bg-sky-500 border-2 border-sky-300 rounded-md flex shrink-0 items-center justify-center text-white font-bold shadow-md relative"
                        style={{ margin: `${marginAll}px` }}
                      >
                        <span className="absolute -top-6 text-xs text-sky-600 dark:text-sky-400 font-mono font-bold">Target</span>
                        {i + 1}
                      </div>
                    ) : (
                      <div 
                        key={i} 
                        className="w-16 h-16 bg-slate-400 dark:bg-slate-600 rounded-md flex shrink-0 items-center justify-center text-white font-bold shadow-sm"
                        style={{ margin: `${marginAll}px` }}
                      >
                        {i + 1}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PADDING SECTION */}
          <section id="padding" className="p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Padding</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Creates internal space around an element's content, pushing the border outward and increasing the element's total size.
            </p>

            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              padding: <span className="text-sky-600 dark:text-sky-400">{paddingAll}px</span>;
            </p>
            
            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Padding All (px)</span>
                    <span>{paddingAll}px</span>
                  </div>
                  <input type="range" min="0" max="64" value={paddingAll} onChange={(e) => setPaddingAll(e.target.value)} className="mt-1 accent-sky-500" />
                </label>
              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-75">
                <div 
                  className="bg-sky-500/20 border-2 border-sky-500 border-dashed rounded-lg transition-all"
                  style={{ padding: `${paddingAll}px` }}
                >
                  <div className="bg-slate-100 dark:bg-slate-800 py-4 px-8 rounded text-center font-medium text-slate-700 dark:text-slate-300 shadow-sm border border-slate-300 dark:border-slate-700">
                    Content Box
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* POSITION SECTION */}
          <section id="position" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Position</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Specifies how an element is positioned in a document (static, relative, absolute, fixed, or sticky) and anchors it using directional offsets.
            </p>

            <div className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-4 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm text-sm">
              position: <span className="text-sky-600 dark:text-sky-400">{posType}</span>;<br/>
              top: <span className="text-emerald-600 dark:text-emerald-400">{posTop}px</span>;<br/>
              left: <span className="text-emerald-600 dark:text-emerald-400">{posLeft}px</span>;
            </div>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  Position Property
                  <select value={posType} onChange={(e) => setPosType(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 dark:text-slate-300">
                    <option value="static">static</option>
                    <option value="relative">relative</option>
                    <option value="absolute">absolute</option>
                    <option value="sticky">sticky</option>
                  </select>
                </label>

                {/* Dynamic Info Box */}
                <div className="pt-2">
                  <div 
                    key={posType} 
                    className="p-4 bg-sky-100/50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 shadow-sm animate-fade-in-up"
                  >
                    <strong className="text-sky-700 dark:text-sky-400 mb-1 uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {posType}
                    </strong>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {posType === 'static' && 'The default behavior. The element is positioned according to the normal document flow. Top, right, bottom, left, and z-index properties have no effect.'}
                      {posType === 'relative' && 'The element is positioned according to the normal document flow, but can be offset relative to itself. It leaves a gap where it would normally be.'}
                      {posType === 'absolute' && 'The element is removed from the normal document flow and positioned relative to its closest positioned ancestor. Other elements ignore it completely.'}
                      {posType === 'fixed' && 'The element is removed from the normal document flow and positioned relative to the viewport. It stays in the exact same place even when scrolled.'}
                      {posType === 'sticky' && 'The element behaves like a relative element until it reaches a specified scroll offset, then it "sticks" in place like a fixed element.'}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Top (px)</span>
                      <span>{posTop}px</span>
                    </div>
                    <input type="range" min="-50" max="150" value={posTop} onChange={(e) => setPosTop(e.target.value)} className="mt-1 accent-emerald-500" />
                  </label>
                </div>

                <div className="pt-4">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Left (px)</span>
                      <span>{posLeft}px</span>
                    </div>
                    <input type="range" min="-50" max="150" value={posLeft} onChange={(e) => setPosLeft(e.target.value)} className="mt-1 accent-emerald-500" />
                  </label>
                </div>
              </div>
              
              <div className="grow flex bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-125">
                <div className="w-full h-full relative bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-4 overflow-y-auto shadow-inner">
                  <div className="w-full h-20 bg-slate-200 dark:bg-slate-700 rounded-md mb-4 flex items-center justify-center text-slate-500 dark:text-slate-400 font-medium">
                    Static Element 1
                  </div>
                  
                  <div 
                    className="w-32 h-32 bg-sky-500 border-2 border-sky-300 rounded-md flex items-center justify-center text-white font-bold shadow-lg z-10 opacity-90 transition-all"
                    style={{ 
                      position: posType,
                      top: `${posTop}px`,
                      left: `${posLeft}px`
                    }}
                  >
                    Target Element
                  </div>
                  
                  <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 rounded-md mt-4 flex items-center justify-center text-slate-500 dark:text-slate-400 font-medium">
                    Static Element 2
                  </div>
                  <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 rounded-md mt-4 flex items-center justify-center text-slate-500 dark:text-slate-400 font-medium">
                    Static Element 3
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SHADOW SECTION */}
          <section id="shadow" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Shadow</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Applies drop shadows to the element's bounding box (box-shadow) or directly to its text (text-shadow) to create the illusion of depth.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm w-fit text-sm">
                text-shadow: <span className="text-sky-600 dark:text-sky-400">{shadowH}px</span> <span className="text-emerald-600 dark:text-emerald-400">{shadowV}px</span> <span className="text-purple-600 dark:text-purple-400">{shadowBlur}px</span> <span className="text-pink-600 dark:text-pink-400">{shadowSpread}px</span> <span className="text-amber-600 dark:text-amber-400">{shadowColor}</span>;
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <p className="text-slate-800 dark:text-slate-200 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm w-fit text-sm">
                box-shadow: <span className="text-sky-600 dark:text-sky-400">{shadowH}px</span> <span className="text-emerald-600 dark:text-emerald-400">{shadowV}px</span> <span className="text-purple-600 dark:text-purple-400">{shadowBlur}px</span> <span className="text-pink-600 dark:text-pink-400">{shadowSpread}px</span> <span className="text-amber-600 dark:text-amber-400">{shadowColor}</span>;
              </p>
            </div>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Horizontal Offset (px)</span>
                    <span>{shadowH}px</span>
                  </div>
                  <input type="range" min="-50" max="50" value={shadowH} onChange={(e) => setShadowH(e.target.value)} className="mt-1 accent-sky-500" />
                </label>

                <div className="pt-2">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Vertical Offset (px)</span>
                      <span>{shadowV}px</span>
                    </div>
                    <input type="range" min="-50" max="50" value={shadowV} onChange={(e) => setShadowV(e.target.value)} className="mt-1 accent-emerald-500" />
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Blur Radius (px)</span>
                      <span>{shadowBlur}px</span>
                    </div>
                    <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(e.target.value)} className="mt-1 accent-purple-500" />
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Spread Radius (px)</span>
                      <span>{shadowSpread}px</span>
                    </div>
                    <input type="range" min="-50" max="50" value={shadowSpread} onChange={(e) => setShadowSpread(e.target.value)} className="mt-1 accent-pink-500" />
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    Shadow Color
                    <div className="flex gap-2 mt-2">
                      <input 
                        type="color" 
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="h-10 w-12 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent" 
                      />
                      <input 
                        type="text" 
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="grow p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 dark:text-slate-300" 
                      />
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Preview Container */}
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-112.5">
                <div 
                  className="w-48 h-48 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all"
                  style={{ 
                    boxShadow: `${shadowH}px ${shadowV}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
                    textShadow: `${shadowH}px ${shadowV}px ${shadowBlur}px ${shadowColor}`
                  }}
                >
                  Preview Box
                </div>
              </div>
            </div>
          </section>

          {/* TRANSFORM SECTION */}
          <section id="transform" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Transform</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Modifies the coordinate space of the CSS visual formatting model, allowing elements to be rotated, scaled, skewed, or translated.
            </p>

            <p className="text-slate-800 dark:text-slate-200 mb-6 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              transform: <span className="text-sky-600 dark:text-sky-400">translateX({tfTranslateX}px)</span> <span className="text-emerald-600 dark:text-emerald-400">scale({tfScale})</span> <span className="text-purple-600 dark:text-purple-400">rotate({tfRotate}deg)</span> <span className="text-pink-600 dark:text-pink-400">skewX({tfSkewX}deg)</span>;
            </p>
            <p className="text-slate-800 dark:text-slate-200 mb-6 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              transform-origin: <span className="text-orange-600 dark:text-orange-400">{tfTranslateX}</span>;
            </p>

            <div className="overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 mb-8 bg-slate-100 dark:bg-slate-900/50 shadow-sm">
              <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-200/80 dark:bg-slate-800/80 border-b border-slate-300 dark:border-slate-700">
                  <tr>
                    <th className="p-4 font-bold">Function</th>
                    <th className="p-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 dark:divide-slate-700">
                  <tr>
                    <td className="p-4 font-mono text-sky-600 dark:text-sky-400">translate(x, y)</td>
                    <td className="p-4">Moves the element horizontally (x) and vertically (y) from its current position.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400">scale(x, y)</td>
                    <td className="p-4">Resizes the element. A value of 1 is the original size, &gt;1 enlarges, and &lt;1 shrinks.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-purple-600 dark:text-purple-400">rotate(angle)</td>
                    <td className="p-4">Rotates the element clockwise around its transform origin (e.g., 45deg, -90deg).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-pink-600 dark:text-pink-400">skew(x, y)</td>
                    <td className="p-4">Tilts or skews the element along the X and Y axes, distorting its shape.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  Transform Origin
                  <select value={tfOrigin} onChange={(e) => setTfOrigin(e.target.value)} className="mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-700 dark:text-slate-300">
                    <option value="center">center</option>
                    <option value="top left">top left</option>
                    <option value="top right">top right</option>
                    <option value="bottom left">bottom left</option>
                    <option value="bottom right">bottom right</option>
                  </select>
                </label>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Rotate (deg)</span>
                      <span>{tfRotate}deg</span>
                    </div>
                    <input type="range" min="-180" max="180" value={tfRotate} onChange={(e) => setTfRotate(e.target.value)} className="mt-1 accent-purple-500" />
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Scale</span>
                      <span>{tfScale}</span>
                    </div>
                    <input type="range" min="0.5" max="2" step="0.1" value={tfScale} onChange={(e) => setTfScale(e.target.value)} className="mt-1 accent-emerald-500" />
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Translate X (px)</span>
                      <span>{tfTranslateX}px</span>
                    </div>
                    <input type="range" min="-100" max="100" value={tfTranslateX} onChange={(e) => setTfTranslateX(e.target.value)} className="mt-1 accent-sky-500" />
                  </label>
                </div>

                <div className="pt-2">
                  <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between mb-1">
                      <span>Skew X (deg)</span>
                      <span>{tfSkewX}deg</span>
                    </div>
                    <input type="range" min="-90" max="90" value={tfSkewX} onChange={(e) => setTfSkewX(e.target.value)} className="mt-1 accent-pink-500" />
                  </label>
                </div>
              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-112.5 overflow-hidden">
                <div 
                  className="w-32 h-32 bg-sky-500 border-4 border-sky-400 shadow-lg flex items-center justify-center text-white font-bold text-center p-4 rounded-md transition-all"
                  style={{ 
                    transformOrigin: tfOrigin,
                    transform: `translateX(${tfTranslateX}px) scale(${tfScale}) rotate(${tfRotate}deg) skewX(${tfSkewX}deg)`
                  }}
                >
                  Target Element
                </div>
              </div>
            </div>
          </section>

          {/* Z-INDEX SECTION */}
          <section id="z-index" className='p-8 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-800 rounded-xl shadow-lg scroll-mt-24'>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Z-Index</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Controls the vertical stacking order of elements that overlap, determining which elements appear in front of others.
            </p>

            <p className="text-slate-800 dark:text-slate-200 mb-8 font-mono bg-white/50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-300 dark:border-slate-700 inline-block shadow-sm">
              z-index: <span className="text-sky-600 dark:text-sky-400">{zIndexTarget}</span>;
            </p>

            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col gap-6">
                <label className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between mb-1">
                    <span>Target Z-Index</span>
                    <span>{zIndexTarget}</span>
                  </div>
                  <input type="range" min="0" max="20" value={zIndexTarget} onChange={(e) => setZIndexTarget(e.target.value)} className="mt-1 accent-sky-500" />
                </label>

                <div className="pt-6 border-t border-slate-300 dark:border-slate-700 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overlapping Elements ({zCount})</span>
                  <div className="flex gap-2">
                    <button onClick={() => setZCount(c => c + 1)} className="grow px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-md transition-colors shadow-sm">
                      + Add
                    </button>
                    <button onClick={() => setZCount(c => Math.max(0, c - 1))} className="grow px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium rounded-md transition-colors shadow-sm">
                      - Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grow flex items-center justify-center bg-slate-300/50 dark:bg-slate-900/50 rounded-xl border border-slate-300 dark:border-slate-700 p-8 min-h-112.5">
                <div className="relative w-72 h-72 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-inner border border-slate-300 dark:border-slate-600">
                  
                  {Array.from({ length: zCount }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-32 h-32 rounded-md flex items-center justify-center text-white font-bold shadow-md"
                      style={{ 
                        zIndex: i * 3, 
                        top: `${(i % 3) * 20}px`, 
                        left: `${(i % 3) * 20}px`,
                        backgroundColor: i % 2 === 0 ? '#94a3b8' : '#64748b'
                      }}
                    >
                      z-index: {i * 3}
                    </div>
                  ))}
                  
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-sky-500 border-2 border-sky-300 rounded-md flex flex-col items-center justify-center text-white font-bold shadow-2xl transition-all" 
                    style={{ zIndex: zIndexTarget }}
                  >
                    <span className="text-xs uppercase tracking-wider mb-1 opacity-80">Target</span>
                    z-index: {zIndexTarget}
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
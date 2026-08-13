import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import {Blob} from './componenets/background/blob'
import App from './App'

const bg = (c: string) => `radial-gradient(circle at 40% 40%, ${c} 0%, ${c.replace(/[\d\.]+\)$/, '0.2)')} 70%, ${c.replace(/[\d\.]+\)$/, '0.05)')} 100%)`

// Section 1 (Home)
const blobGroup1 = [
  { style: { background: bg('rgba(225, 93, 240, 0.45)'), width: '40vw', height: '30vw' } },
  { style: { background: bg('rgba(228, 240, 93, 0.4)'), width: '30vw', height: '15vw', transform: 'translate(10px,100px)' } },
  { style: { background: bg('rgba(250, 51, 36, 0.45)'), width: '20vw', height: '30vw', transform: 'translate(100px,10px)' } }
]

// Section 2 (Education)
const blobGroup2 = [
  { style: { background: bg('rgba(215, 134, 20, 0.45)'), width: '35vw', height: '25vw' } },
  { style: { background: bg('rgba(93, 184, 240, 0.4)'), width: '30vw', height: '20vw', transform: 'translate(20px,80px)' } },
  { style: { background: bg('rgba(13, 208, 26, 0.45)'), width: '25vw', height: '25vw', transform: 'translate(80px,20px)' } }
]

// Section 3 (Experience)
const blobGroup3 = [
  { style: { background: bg('rgba(20, 215, 134, 0.45)'), width: '40vw', height: '30vw' } },
  { style: { background: bg('rgba(226, 64, 188, 0.4)'), width: '28vw', height: '18vw', transform: 'translate(10px,90px)' } },
  { style: { background: bg('rgba(97, 13, 208, 0.45)'), width: '22vw', height: '28vw', transform: 'translate(90px,10px)' } }
]

// Section 4 (Teaching)
const blobGroup4 = [
  { style: { background: bg('rgba(255, 215, 0, 0.45)'), width: '38vw', height: '26vw' } },
  { style: { background: bg('rgba(0, 200, 255, 0.4)'), width: '28vw', height: '22vw', transform: 'translate(30px,70px)' } },
  { style: { background: bg('rgba(255, 87, 87, 0.45)'), width: '22vw', height: '26vw', transform: 'translate(70px,30px)' } }
]

// Section 5 (Publications)
const blobGroup5 = [
  { style: { background: bg('rgba(168, 85, 247, 0.45)'), width: '42vw', height: '28vw' } },
  { style: { background: bg('rgba(45, 212, 191, 0.4)'), width: '32vw', height: '20vw', transform: 'translate(15px,100px)' } },
  { style: { background: bg('rgba(244, 63, 94, 0.45)'), width: '24vw', height: '30vw', transform: 'translate(100px,15px)' } }
]

// Section 6 (Reviewer)
const blobGroup6 = [
  { style: { background: bg('rgba(99, 102, 241, 0.45)'), width: '36vw', height: '24vw' } },
  { style: { background: bg('rgba(234, 179, 8, 0.4)'), width: '30vw', height: '18vw', transform: 'translate(25px,85px)' } },
  { style: { background: bg('rgba(34, 197, 94, 0.45)'), width: '26vw', height: '26vw', transform: 'translate(85px,25px)' } }
]

// Section 7 (Honors & Skills bottom anchor)
const blobGroup7 = [
  { style: { background: bg('rgba(217, 70, 239, 0.45)'), width: '40vw', height: '28vw' } },
  { style: { background: bg('rgba(14, 165, 233, 0.4)'), width: '30vw', height: '22vw', transform: 'translate(20px,95px)' } },
  { style: { background: bg('rgba(249, 115, 22, 0.45)'), width: '25vw', height: '28vw', transform: 'translate(95px,20px)' } }
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <svg className='filter-svg' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <filter id="goo" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -4" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="blob-container-filter">
        <Blob blobs={blobGroup1} top={'0%'} left={'-5vw'} />
        <Blob blobs={blobGroup2} top={'15%'} right={'-5vw'} />
        <Blob blobs={blobGroup3} top={'30%'} left={'10vw'} />
        <Blob blobs={blobGroup4} top={'45%'} right={'-8vw'} />
        <Blob blobs={blobGroup5} top={'60%'} left={'-6vw'} />
        <Blob blobs={blobGroup6} top={'75%'} right={'8vw'} />
        <Blob blobs={blobGroup7} top={'92%'} left={'52%'} />
      </div>
      <HashRouter>
        <App />
      </HashRouter>
    </>
  </StrictMode>,
)

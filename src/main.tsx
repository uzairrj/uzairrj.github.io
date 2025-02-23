import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Blob} from './componenets/background/blob'
import App from './App'

const blobGroup1 = [
  {
    style: {background: 'rgba(225, 93, 240, 0.7)', width: '40vw', height: '30vw'}
  },
  {
    style: {background: 'rgba(228, 240, 93, 0.6)', width: '30vw', height: '15vw', transform: 'translate(10px,100px)'}
  },
  {
    style: {background: 'rgba(250, 51, 36, 1)', width: '20vw', height: '30vw', transform: 'translate(100px,10px)'}
  }
]

const blobGroup2 = [
  {
    style: {background: 'rgba(215, 134, 20, 0.7)', width: '40vw', height: '30vw'}
  },
  {
    style: {background: 'rgba(93, 184, 240, 0.6)', width: '30vw', height: '15vw', transform: 'translate(10px,100px)'}
  },
  {
    style: {background: 'rgb(13, 208, 26)', width: '20vw', height: '30vw', transform: 'translate(100px,10px)'}
  }
]

const blobGroup3 = [
  {
    style: {background: 'rgba(20, 215, 134, 0.7)', width: '40vw', height: '30vw'}
  },
  {
    style: {background: 'rgba(226, 64, 188, 0.6)', width: '30vw', height: '15vw', transform: 'translate(10px,100px)'}
  },
  {
    style: {background: 'rgb(97, 13, 208)', width: '20vw', height: '30vw', transform: 'translate(100px,10px)'}
  }
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="blob-container-filter">
        <Blob blobs={blobGroup1} top={'-10vh'} left={'-10vw'}/>
        <Blob blobs={blobGroup2} bottom={'25vh'} left={'30vw'}/>
        <Blob blobs={blobGroup3} right={'55vh'} top={'0vw'}/>
      </div>
      <div className="content">
        <App />
      </div>
    </>
  </StrictMode>,
)

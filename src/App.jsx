import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setlength]=useState(8)
  const [numberAllow,setnumberAllow]=useState(false)
  const [charAllow,setcharAllow]=useState(false)
  const [password,setpassword]=useState("")

  //useref hook
  const passwordref=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllow)str+="0123456789"
    if(charAllow)str+="!@#$%^&*(){}{}_-~`"

    for(let i=1;i<=length;i++){
     let char=Math.floor(Math.random()*str.length+1) 
     pass+=str.charAt(char)
    }
    setpassword(pass)
    
  },[length,numberAllow,charAllow,setpassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordref.current.select()
    // passwordref.current?.setSelectionRange(0,3)//Max to min range
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllow)str+="0123456789"
    if(charAllow)str+="!@#$%^&*(){}{}_-~`"

    for(let i=1;i<=length;i++){
     let char=Math.floor(Math.random()*str.length+1) 
     pass+=str.charAt(char)
    }
    setpassword(pass)

  },[length,numberAllow,charAllow,setpassword])
  
  useEffect(()=>{
     passwordGenerator()
  },[length,numberAllow,charAllow,passwordGenerator])

  return (
    <>
  
      <div className='text-center w-full max-w-md mx-auto shadow-md rounded-lg pt-2  px-3 my-8 text-red-900
        bg-blue-300'>
          <h1 className='text-black text-center'>Password Generator</h1>
          <div className=" text-center flex shadow rounded-lg
            overflow-hidden pt-1 pb-6 ">
              <input 
                 type="text"
                 value={password}
                 className='outline-none w-full py-1 px-3'
                 placeholder='password'
                 readOnly
                 ref={passwordref}
                 ></input>
                <button
                onclick={copyPasswordToClipboard}
                className='
                  outline-none bg-blue-700 text-black px-3 py-0.5 shrink-0'>
                  copy
                </button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-2'>
              <input 
                type="range"
                min={6}
                max={100}
                className='=cursor-pointer'
                onChange={(e)=>{setlength(e.target.value)}}
                ></input>
                <label>Length:{length}</label>
                </div>

            <div className='flex items-center gap-x-1'>
              <input
                 type="checkbox"
                 defaultChecked={numberAllow}
                 id="numberInput"
                 onChange={()=>{
                  setnumberAllow((prev)=>!prev);
                 }}>
              </input>
              <label htmlFor='numberInput'>Numbers</label>
              </div>

            <div className='flex items-center gap-x-1'>
              <input
                 type="checkbox"
                 defaultChecked={charAllow}
                 id="characterInput"
                 onChange={()=>{
                  setnumberAllow((prev)=>!prev);
                 }}>
              </input>
              <label htmlFor='characterInput'>Characters</label>
            </div>

          </div>
        </div>
    </>
  )
}

export default App

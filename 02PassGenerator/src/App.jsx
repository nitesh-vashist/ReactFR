import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllowed , setNumAllowed]= useState(false)
  const [charAllowed , setCharAllowed]= useState(false)
  const [password,setPassword] = useState()

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+= "1234567890"
    if(charAllowed) str+= "@#$%^&*(){}~"
    for(let i=1;i<=length;i++){
      let idx = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(idx)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])

  
  const copyPassword = useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
            />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} className='cursor-pointer' value={length} onChange={(e)=>{setLength(e.target.value)}}  />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'> 
              <input type="checkbox" defaultChecked={numAllowed}
                id='numberInput'
                onChange={()=>{
                  setNumAllowed((prev)=> !prev)
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'> 
              <input type="checkbox" defaultChecked={charAllowed}
                id='charInput'
                onChange={()=>{
                  setCharAllowed((prev)=> !prev)
                }}
              />
              <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

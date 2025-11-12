import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex h-screen w-screen font-sans bg-[#000] text-[#ddd]">
      <div className="w-1/4 bg-[#0a0011] border-r border-[#8613D3] p-6 flex flex-col text-lg shadow-[0_0_25px_#8613D3]">
        <div className="flex items-center mb-8 cursor-pointer hover:text-[#8613D3] transition-all duration-300">
          <span className="mr-2 text-2xl">🏠</span>
          <span>DASHBOARD</span>
        </div>
        <div className="mb-6 cursor-pointer hover:text-[#8613D3] transition-all duration-300">
          <span className="mr-2 text-2xl">🏠</span>
          REPORT
        </div>
        <div className="cursor-pointer hover:text-[#8613D3] transition-all duration-300">
          <span className="mr-2 text-2xl">🏠</span>
          SETTINGS
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-2xl">
        <h1 className="text-4xl font-semibold mb-10 text-[#fff] drop-shadow-[0_0_15px_#8613D3]">
          GENQuiz
        </h1>
        <input
          type="text"
          placeholder="TOPIC"
          className="border border-[#8613D3] bg-transparent rounded-full px-5 py-3 w-72 text-lg mb-6 text-[#fff] placeholder-[#ddd] outline-none focus:ring-2 focus:ring-[#8613D3] transition-all duration-300"
        />
        <div className="my-6 text-xl text-[#ddd]">OR</div>
        <div className="border-2 border-[#8613D3] text-[#fff] px-16 py-6 rounded-full text-3xl cursor-pointer hover:bg-[#8613D3] hover:text-[#fff] hover:shadow-[0_0_25px_#8613D3] transition-all duration-300">
          PDF
        </div>
      </div>
    </div>

    </>
  )
}

export default App

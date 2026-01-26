import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {

  return (
    <>
      <div className="layout-container flex flex-col min-h-screen">
        <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">DALOG Diagnostic Report Manager</h1>
          
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<p>404 - Not Found</p>} />
            </Routes>
          </div>
        </main>

      </div>




    </>
  )
}

export default App

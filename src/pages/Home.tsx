import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <p>Home route</p>
    </div>
  )
}

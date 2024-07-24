import genesyLogo from './assets/genesy-ai-logo.svg'
import { Counter } from './components/Counter'
import { LeadsList } from './components/LeadsList'

function App() {
  return (
    <main className="main">
      <div>
        <a href="https://genesy.ai" target="_blank">
          <img src={genesyLogo} className="logo genesy" alt="Genesy AI logo" />
        </a>
      </div>
      <h1 className="title">Genesy AI</h1>
      <Counter />

      <LeadsList />
    </main>
  )
}

export default App

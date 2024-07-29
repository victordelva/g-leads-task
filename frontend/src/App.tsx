import genesyLogo from './assets/genesy-ai-logo.svg'
import { LeadsList } from './containers/LeadsList.tsx'

function App() {
  return (
    <main className="max-w-[1280px] mx-auto w-full my-0 p-2">
      <div className="flex items-center justify-center w-full text-center">
        <a href="https://genesy.ai" target="_blank">
          <img src={genesyLogo} className="logo genesy" alt="Genesy AI logo" />
        </a>
        <h1 className="title">Genesy AI</h1>
      </div>
      <LeadsList />
    </main>
  )
}

export default App

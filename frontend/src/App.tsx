import { LeadsList } from './containers/LeadsList.tsx'

function App() {
  return (
    <main className="max-w-[1280px] mx-auto w-full my-0 p-2">
      <div className="flex items-center justify-center w-full text-center">
        <h1 className="title">AutoLeads</h1>
      </div>
      <LeadsList />
    </main>
  )
}

export default App

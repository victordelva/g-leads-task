import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { api } from '../api'

export const LeadsList: FC = () => {
  const leads = useQuery({
    queryKey: ['leads', 'getMany'],
    queryFn: async () => api.leads.getMany(),
  })

  if (leads.isLoading) return <div>Loading...</div>
  if (leads.isError) return <div>Error: {leads.error.message}</div>

  return (
    <div>
      <h2 className="lead-list-title">All leads</h2>
      <p>
        <code>POST</code> <code>/leads</code>
      </p>
      <ul className="lead-list">
        {leads.data?.map((lead) => (
          <li key={lead.id}>
            {lead.firstName} <span style={{ color: '#CCC' }}>-</span>{' '}
            <span style={{ color: '#999' }}>{lead.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

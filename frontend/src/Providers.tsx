import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FC, PropsWithChildren } from 'react'
import { UIProvider } from './UIProvider.tsx'

const queryClient = new QueryClient()

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </UIProvider>
    </QueryClientProvider>
  )
}

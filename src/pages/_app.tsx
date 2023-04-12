import type { AppProps } from 'next/app'
import { ReactElement, useState } from 'react'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { trpc } from '@/utils/trpc'
import { QueryClient } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import nextConfig from 'next.config.js'

const basePath = String(nextConfig.basePath)

const MyApp = ({ Component, pageProps }: AppProps): ReactElement | null => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            keepPreviousData: true,
            retry: 1,
            cacheTime: 1000 * 60 * 60 * 24 * 7
          }
        }
      })
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${basePath}/api/trpc`
        })
      ]
    })
  )

  if (typeof window === 'undefined') return null

  const persister = createSyncStoragePersister({
    storage: window.sessionStorage
  })

  return (
    <>
      {persister && (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <Component {...pageProps} />
          </PersistQueryClientProvider>
        </trpc.Provider>
      )}
    </>
  )
}

export default MyApp

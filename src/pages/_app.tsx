import type { AppProps } from 'next/app'
import { ReactElement, useEffect, useState } from 'react'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { trpc } from '@/utils/trpc'
import { QueryClient } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import nextConfig from 'next.config.js'
import Head from 'next/head'

const basePath = String(nextConfig.basePath)

const MyApp = ({ Component, pageProps }: AppProps): ReactElement | null => {
  // TODO: need to find a better way to do this
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

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
      {mounted && (
        <>
          <Head>
            <title>Next.js + TRPC + React Query</title>
          </Head>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
              <Component {...pageProps} />
            </PersistQueryClientProvider>
          </trpc.Provider>
        </>
      )}
    </>
  )
}

export default MyApp

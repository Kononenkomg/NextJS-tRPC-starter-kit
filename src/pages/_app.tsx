import type { AppProps } from 'next/app'
import { ReactElement, useState } from 'react'
import { trpc } from '@/utils/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import nextConfig from 'next.config.js'
import Head from 'next/head'

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

  return (
    <>
      <Head>
        <title>Next.js + TRPC + React Query</title>
      </Head>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient} >
          <Component {...pageProps} />
        </QueryClientProvider>
      </trpc.Provider>
    </>
  )
}

export default MyApp

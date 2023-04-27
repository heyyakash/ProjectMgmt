import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { NextComponentType, NextPageContext } from 'next'
import { Hydrate, QueryClient, QueryClientProvider, useQuery } from 'react-query'


type ComponentType = {
  Component: NextComponentType<NextPageContext, any, any> & { getLayout?: JSX.Element }
  pageProps: any
}

export default function App({ Component, pageProps }: ComponentType) {
  const supabaseClient = createBrowserSupabaseClient()


  const getLayout = Component.getLayout
  const queryClient = new QueryClient()
  if (getLayout) {
    return (
      <Provider>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
        </SessionContextProvider>
      </QueryClientProvider>
      </Provider>
    )
  }


  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )



}

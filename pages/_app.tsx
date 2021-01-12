import { useState } from 'react'
import { AppProps } from 'next/app'

import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { GlobalContextProvider, INITIAL_STATE } from '@component/GlobalContext'
import Page from '@layout/Page'
import '@globals'

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

	const globalState = useState(INITIAL_STATE)
	const { asPath } = router
	return (
		<>
			<Head>
				<title>Zone Covid</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<GlobalContextProvider value={globalState}>
				<AnimatePresence>
					<Page router={router.asPath}>
						<Component {...pageProps} />
					</Page>
				</AnimatePresence>
			</GlobalContextProvider>
		</>
	)
}

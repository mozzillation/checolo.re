import { useEffect, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'


import { GlobalContextProvider, INITIAL_STATE } from '@component/GlobalContext'
import Page from '@layout/Page'

import '@globals'

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

	const globalContext = useState(INITIAL_STATE)
	const [_, dispatch] = globalContext

	useEffect(() => {
		const sessionData = window.sessionStorage.getItem('detected_region')

		if (sessionData) {
			const data = JSON.parse(sessionData)

			dispatch(prev => ({
				...prev,
				detectedRegion: data,
				selectedRegion: data
			}))
		}
	}, [])

	const { route } = router

	return (
		<>
			<Head>
				<title>Zone Covid</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<GlobalContextProvider value={globalContext}>
				<AnimatePresence exitBeforeEnter={true}>
					<Page key={route}>
						<Component {...pageProps} />
					</Page>
				</AnimatePresence>
			</GlobalContextProvider>
		</>
	)
}

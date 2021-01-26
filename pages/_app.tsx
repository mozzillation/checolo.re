import { useEffect, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import { sessionStorageProperty, updateViewportHeight } from '@/utils'
import Page from '@layout/Page'
import { GlobalContextProvider, INITIAL_STATE } from '@component/GlobalContext'
import Loading from '@component/Loading'
import Flex from '@component/Flex'

import '@globals'

export default function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

	const globalContext = useState(INITIAL_STATE)
	const [globalState, dispatch] = globalContext

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

	useEffect(() => {

		sessionStorageProperty('detected_region')
			.then(detectedRegion => {
				if (detectedRegion) {

					dispatch(prev => ({
						...prev,
						detectedRegion
					}))
				}

			})

		window.addEventListener('resize', updateViewportHeight)
		updateViewportHeight()

	}, [])

	return (
		<>
			<Head>
				<title>Zone Covid</title>
			</Head>

			<GlobalContextProvider value={globalContext}>

				{(globalState.appState.error ||
					globalState.appState.loading) && (
						<Flex>
							{/* {globalState.appState.error ? <>errore</> : null} */}
							{globalState.appState.loading ? <Loading /> : null}
						</Flex>
					)}

				<AnimatePresence initial={false} >
					<Page router={router} >
						<Component {...pageProps} />
					</Page>
				</AnimatePresence>

			</GlobalContextProvider>
		</>
	)
}


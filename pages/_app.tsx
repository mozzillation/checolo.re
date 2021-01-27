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
				<meta charSet='utf-8' />
				<meta http-equiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
				<meta name='description' content='Un semplice strumento per tenere traccia dei DPCM' />
				<meta name='keywords' content='Zone, Covid, Colore, Regione' />
				<title>Che colore?</title>
				<link rel='manifest' href='manifest.json' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='application-name' content='CheColore' />
				<meta name='apple-mobile-web-app-title' content='CheColore' />
				<meta name='theme-color' content='#000000' />
				<meta name='msapplication-navbutton-color' content='#000000' />
				<meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
				<meta name='msapplication-starturl' content='/' />
				<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
				<link rel='icon' type='image/png' sizes='256x256' href='homescreen.png' />
				<link rel='apple-touch-icon' type='image/png' sizes='256x256' href='homescreen.png' />
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


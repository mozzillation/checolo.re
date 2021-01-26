import { useEffect, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Router from "next/router";

import { sessionStorageProperty } from '@/utils'
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

				<AnimatePresence exitBeforeEnter={true}>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>

			</GlobalContextProvider>
		</>
	)
}



const routeChange = () => {
	// Temporary fix to avoid flash of unstyled content
	// during route transitions. Keep an eye on this
	// issue and remove this code when resolved:
	// https://github.com/vercel/next.js/issues/17464

	const tempFix = () => {
		const allStyleElems = document.querySelectorAll('style[media="x"]');
		allStyleElems.forEach((elem) => {
			elem.removeAttribute("media");
		});
	};
	tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);

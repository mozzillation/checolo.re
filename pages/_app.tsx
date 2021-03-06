import { useEffect, useLayoutEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

import Page from '@layout/Page'
import Loading from '@component/Loading'
import Flex from '@component/Flex'
import { GlobalContextProvider, INITIAL_STATE } from '@component/GlobalContext'
import PWAPrompt from 'react-ios-pwa-prompt'

import { trueViewportHeight } from '@/utils'
import { PWA_PROMPT_PROPS } from '@/utils/const'
import * as gtag from '@/utils/gtag'

const PwaPrompt: PWAPrompt = dynamic(
	import('react-ios-pwa-prompt')
		.then(module => module.default),
	{ ssr: false }
)

import '@globals'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {

	const router = useRouter()

	const globalContext = useState(INITIAL_STATE)
	const [globalState, dispatch] = globalContext

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url)
		}

		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	useEffect(() => {
		gtag.pageview(router.route)

		window.localStorage.setItem('last_update', new Date().toLocaleString('it'))
	}, [])

	useEffect(() => {
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		if (!isMobile) {
			// we listen to resize events
			window.addEventListener('resize', trueViewportHeight)
		}

		trueViewportHeight()

		setTimeout(() => {
			trueViewportHeight()
		}, 200)
	}, [])

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
				<meta name='description' content="CheColore ti aiuta a capire il colore delle regioni d'Italia e cosa fare per fronteggiare l'emergenza da COVID-19." />
				<meta name='keywords' content='Zone, Covid, Colore, Regione' />
				<title>Scopri il colore della tua regione • CheColore</title>
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
				<link rel='apple-touch-icon' type='image/png' sizes='256x256' href='homescreen.png' />
				<link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
				<link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
				<link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
				<link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
				<link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png' />
				<link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png' />
				<link rel='apple-touch-icon' sizes='144x144' href='/apple-icon-144x144.png' />
				<link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png' />
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
				<link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/manifest.json' />
				<meta name='msapplication-TileColor' content='#000000' />
				<meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:description' content="CheColore ti aiuta a capire il colore delle regioni d'Italia e cosa fare per fronteggiare l'emergenza da COVID-19." />
				<meta name='twitter:title' content='CheColore' />
				<meta name='twitter:site' content='https://checolo.re' />
				<meta name='twitter:image' content='/social_thumb.png' />
				<meta name='twitter:creator' content='@checolore' />

				<meta property='og:url' content='https://checolo.re' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Scopri il colore della tua regione • CheColore' />
				<meta property='og:description' content="CheColore ti aiuta a capire il colore delle regioni d'Italia e cosa fare per fronteggiare l'emergenza da COVID-19." />
				<meta property='og:image' content='/social_thumb.png' />
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

				<PwaPrompt {...PWA_PROMPT_PROPS} />

			</GlobalContextProvider>
		</>
	)
}

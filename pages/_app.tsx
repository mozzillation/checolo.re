import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalContextProvider, INITIAL_STATE } from '@component/GlobalContext'

import '@globals'
import { sessionStorageProperty } from '@/utils'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {

	const globalState = useState(INITIAL_STATE)

	useEffect(() => {

		sessionStorageProperty('detected_region')
			.then(detectedRegion => {

				if (detectedRegion) {
					const [_, dispatch] = globalState

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
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<GlobalContextProvider value={globalState}>
				<Component {...pageProps} />
			</GlobalContextProvider>
		</>
	)
}

import * as React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '@globals'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Zone Covid</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

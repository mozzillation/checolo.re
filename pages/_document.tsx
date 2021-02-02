import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '@/utils/gtag'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}


	render() {
		const iubendaImplementation = `
			<script>
				var _iub = _iub || [];
				_iub.csConfiguration = {"whitelabel": false, "lang": "it", "siteId": 2126383, "cookiePolicyId": 74368238, "footer": { }, "cookiePolicyUrl": "https://checolo.re/privacy-policy", "banner": {"position": "float-top-center" } }
			</script>
			<script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async></script>
		`
		return (
			<Html lang='it'>
				<Head>
					<script
						async={true}
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
					 window.dataLayer = window.dataLayer || [];
					 function gtag(){dataLayer.push(arguments);}
					 gtag('js', new Date());
					 gtag('config', '${GA_TRACKING_ID}', {
						 page_path: window.location.pathname,
					 });
			 `
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<div dangerouslySetInnerHTML={{ __html: iubendaImplementation }} />
				</body>
			</Html>
		)
	}
}

export default MyDocument

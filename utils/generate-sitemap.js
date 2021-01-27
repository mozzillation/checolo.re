const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

const path = require('path')
const process = require('process')
const yaml = require('js-yaml');


(async () => {
	const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

	const pathName = path.join(process.cwd(), 'data/content.yaml')
	const { regions } = yaml.load(fs.readFileSync(pathName, 'utf8')).it

	const regionPaths = Object.keys(regions).map(el => el.replace(/^/, '/'))

	const staticPages = await globby([
		'pages/**/*{.js,.mdx,.tsx}',
		'!pages/_*.tsx',
		'!pages/api',
		'!pages/[id]',
	])

	const pages = [...regionPaths, ...staticPages]

	const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
			.map(page => {
				const path = page
					.replace('index', '')
					.replace('pages', '')
					.replace('.js', '')
					.replace('.tsx', '')
				const route = path === '/index' ? '' : path

				return `
            <url>
                <loc>${`https://checolo.re${route}`}</loc>
            </url>
                    `
			})
			.join('')}
        </urlset>
    `

	// If you're not using Prettier, you can remove this.
	const formatted = prettier.format(sitemap, {
		...prettierConfig,
		parser: 'html'
	})

	fs.writeFileSync('public/sitemap.xml', formatted)
})()

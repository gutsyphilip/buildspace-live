import React from 'react'
import Head from 'next/head'
import { SITE_INFO } from '../utils/config'

type SEOProps = Partial<typeof SITE_INFO>

const SEO: React.FC<SEOProps> = (props) => {
    const data = Object.assign({}, SITE_INFO, props)
    const siteTitle = data.title || data.name
    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={data.description} />

            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <meta property="og:type" content="product" />
            <meta property="og:url" content={data.url} />
            <meta property="og:image" content={data.image} />
            <meta property="og:title" content={siteTitle} />
            <meta name="og:description" content={data.description} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:creator" content={data.twitter} />
            <meta property="twitter:site" content={data.twitter} />
            <meta property="twitter:url" content={data.url} />

            <meta property="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={data.description} />
            <meta property="twitter:image" content={data.image} />
            <meta property="twitter:image:alt" content={siteTitle} />
        </Head>
    )
}

export default SEO
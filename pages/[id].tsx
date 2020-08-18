import * as React from "react"
import Head from "next/head"
import { GetStaticProps, GetStaticPaths } from "next"
import { Layout } from "Components/Layout"
import { PostData, getPostData, getAllPostIds } from "lib/files"

export default function Post(p: PostData) {
    return (
        <Layout>
            <Head>
                <title>{p.title}</title>
            </Head>
            <article>
                <h1>{p.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: getAllPostIds(), fallback: false })

export const getStaticProps: GetStaticProps = async ({ params }) => ({
    props: getPostData(`${params?.id}`)
})

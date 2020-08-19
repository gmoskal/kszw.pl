import * as React from "react"
import Head from "next/head"
import { GetStaticProps, GetStaticPaths } from "next"
import { PostData, getPostData, getAllPostIds, getMenu } from "lib/files"
import { Layout } from "Components/Layout"
import { MenuGroup } from "Components/Menu"

const Post: React.FC<{ post: PostData; menu: MenuGroup[] }> = p => (
    <Layout menu={p.menu} selectedTitle={p.post.title}>
        <Head>
            <title>{p.post.title}</title>
        </Head>
        <article>
            <h1>{p.post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: p.post.contentHtml }} />
        </article>
    </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => ({ paths: getAllPostIds(), fallback: false })

export const getStaticProps: GetStaticProps = async ({ params }) => ({
    props: { post: getPostData(`${params?.id}`), menu: getMenu() }
})
export default Post

import path from "path"
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"
import { readdirSync, readFileSync } from "fs"

const postsDirectory = path.join(process.cwd(), "content/prawo")
type PostMeta = { date: string; title: string }
export type PostData = PostMeta & { contentHtml: string; id: string }

export const getSortedPostsData = () =>
    readdirSync(postsDirectory)
        .map(f => getPostData(f.replace(/\.md$/, "")))
        .sort((a, b) => (a.date < b.date ? 1 : -1))

export const getAllPostIds = () =>
    readdirSync(postsDirectory).map(fileName => ({
        params: { id: fileName.replace(/\.md$/, "") }
    }))

export function getPostData(id: string): PostData {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    const processedContent = remark().use(html).processSync(matterResult.content)
    const contentHtml = processedContent.toString()
    return { id, contentHtml, ...(matterResult.data as PostMeta) }
}

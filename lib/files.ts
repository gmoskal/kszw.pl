import path from "path"
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"
import { readdirSync, readFileSync } from "fs"
import { MenuGroup } from "Components/Menu"

const categories = [ "kancelaria", "prawo"] as const
type Category =  typeof  categories[number]
type PostMeta = { date: string; title: string }
export type PostData = PostMeta & { contentHtml: string; id: string }

const getDir = (c: Category) => path.join(process.cwd(), `content/${c}`)
const getId = (c: Category,f: string) => `${c}--${f.replace(/\.md$/, "")}`
export const getSortedPostsData = (c: Category) =>
    readdirSync(getDir(c))
        .map(f => getPostData(getId(c, f)))
        .sort((a, b) => (a.date < b.date ? 1 : -1))

export const getAllPostIds = () =>
    categories.reduce((acc, c) => 
        [...acc, ...readdirSync(getDir(c)).map(fileName => ({
            params: { id: getId(c, fileName) }
        }))], [] as any)

type Params = {id: string, category: Category}

export function getPostData(cid: string): PostData {
    const [ c, id ] = cid.split("--")
    const fullPath = path.join(getDir(c as any), `${id}.md`)
    const fileContents = readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    const processedContent = remark().use(html).processSync(matterResult.content)
    const contentHtml = processedContent.toString()
    return { id: cid, contentHtml, ...(matterResult.data as PostMeta) }
}

export const getMenu = (): MenuGroup[] => (
    categories.map(c => 
        ({
            title: c.charAt(0).toUpperCase() + c.slice(1),
            items: [...(c === "kancelaria" ? [{title: "Home", href: "/"}]: []), ...  getSortedPostsData(c).map(v => ({ title: v.title, href: "/[id]", as: `/${v.id}` }))]
        }))
    
)

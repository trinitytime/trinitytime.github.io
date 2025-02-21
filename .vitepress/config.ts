import fs from 'node:fs/promises'
import { DefaultTheme, defineConfig, resolvePages, UserConfig } from 'vitepress'
import { createLogger } from 'vite'
import matter from 'gray-matter'
import path from 'node:path'
import _ from 'lodash'

const srcDir = process.env.NODE_ENV === 'development' ? 'sample': 'blog'

const config: UserConfig<DefaultTheme.Config> = {
  lang: 'ko-KR',
  title: "Trinitytime",
  description: "Trinitytime blog",
  cleanUrls: true,
  srcDir,
  themeConfig: {
    siteTitle: 'Trinitytime',
    
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
}


const logger = createLogger(config.vite?.logLevel, {
  prefix: '[vitepress]',
  allowClearScreen: config.vite?.clearScreen
})

const nav: any[] = []
const categories = {}

const { pages } = await resolvePages(srcDir, config, logger)
const result = _.chain(pages).map(page => {
  const parts = page.split('/')
  const level = parts.length
  const category = 1 !== level ? parts[0] : 'nav'
  const text = parts[parts.length - 1].replace(/\.md$/, '')
  const link = `/${page.replace(/\.md$/, '')}`


  if ('index' === text) {
    return null
  }

  return {
    level,
    category,
    text,
    link
  }

}).compact().each(v => {
  if ('nav' === v.category) {
    nav.push(v)
    return
  }

  if (undefined === categories[v.category]) {
    categories[v.category] = {
      text: v.category,
      items: [],
      collapsed: true,
    }
  }
  categories[v.category].items.push(v)
}).value()

export type SidebarItem = {
  /**
   * The text label of the item.
   */
  text?: string

  /**
   * The link of the item.
   */
  link?: string

  /**
   * The children of the item.
   */
  items?: SidebarItem[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean

  /**
   * Base path for the children items.
   */
  base?: string

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string

  rel?: string
  target?: string
}


const sidebar = _.map(categories, (v, k) => {
  return v
}).sort((a: any, b: any) => a.text.localeCompare(b.text))

config.themeConfig = {
  siteTitle: 'Trinitytime',
  
  // https://vitepress.dev/reference/default-theme-config
  nav,

  sidebar,

  socialLinks: [
    { icon: 'github', link: 'https://github.com/trinitytime/blog' }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig(config)

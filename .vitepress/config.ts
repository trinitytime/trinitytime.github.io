import { defineConfig } from 'vitepress'


const srcDir = process.env.NODE_ENV === 'development' ? 'sample': 'blog'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
})

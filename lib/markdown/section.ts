import type MarkdownIt from 'markdown-it'

interface SectionOptions {
  className?: string
}


export const sectionPlugin = (md: MarkdownIt, options: SectionOptions = {}) => {
  const className = options.className || 'section'
  const fence = md.renderer.rules.fence!
  
  // 원본 render 함수를 저장
  const originalRender = md.renderer.render
  
  md.renderer.rules.hr = (tokens, idx, options, env, self) => {
    const marp = true === env.frontmatter?.marp
    console.log(env.frontmatter)
    if (marp) {
      return `</div><div class="${className}">`
    }

    return '<hr>'
  }

  // render 함수를 오버라이드
  md.renderer.render = function (...args) {
    const [, , options] = args
    const marp = true === options.frontmatter?.marp
    // 원본 렌더링 결과를 가져옴
    const content = originalRender.apply(this, args)
    
    if (marp) {
      // section div로 감싸기
      return `<div class="${className}">${content}</div>`
    }

    return content
  }
}
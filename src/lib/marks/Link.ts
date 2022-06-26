import { Mark } from './Mark'

export class Link extends Mark {
  get name() {
    return 'link'
  }

  get schema() {
    return {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(dom: HTMLElement) {
            return {
              href: dom.getAttribute('href'),
              title: dom.getAttribute('title'),
            }
          },
        },
      ],
      toDOM: (node) => {
        const { href, title } = node.attrs
        return ['a', { href, title }, 0]
      },
    }
  }
}

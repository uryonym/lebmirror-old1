import { Node } from './Node'
import { NodeType } from 'prosemirror-model'
import { textblockTypeInputRule } from 'prosemirror-inputrules'

export class Heading extends Node {
  get defaultOptions() {
    return {
      levels: [1, 2, 3, 4],
    }
  }

  get name() {
    return 'heading'
  }

  get schema() {
    return {
      attrs: {
        level: { default: 1 },
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: this.options.levels.map((level) => ({
        tag: `h${level}`,
        attrs: { level },
      })),
      toDOM: (node) => [`h${node.attrs.level}`, 0],
    }
  }

  parseMarkdown() {
    return {
      block: 'heading',
      getAttrs: (tok) => ({ level: +tok.tag.slice(1) }),
    }
  }

  inputRules({ type }: { type: NodeType }) {
    return this.options.levels.map((level) =>
      textblockTypeInputRule(new RegExp(`^(#{1,${level}})\\s$`), type, () => ({
        level,
      })),
    )
  }
}

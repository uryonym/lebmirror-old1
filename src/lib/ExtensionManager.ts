import markdownit from 'markdown-it'
import { Extension } from './Extension'
import { Node } from './nodes/Node'
import { Mark } from './marks/Mark'
import { Schema } from 'prosemirror-model'
import { MarkdownParser, MarkdownSerializer } from 'prosemirror-markdown'
import { keymap } from 'prosemirror-keymap'

export class ExtensionManager {
  extensions: Extension[]

  constructor(extensions: Extension[] = []) {
    this.extensions = extensions
  }

  get nodes() {
    return this.extensions
      .filter((extension) => extension.type === 'node')
      .reduce(
        (nodes, node: Node) => ({
          ...nodes,
          [node.name]: node.schema,
        }),
        {},
      )
  }

  get marks() {
    return this.extensions
      .filter((extension) => extension.type === 'mark')
      .reduce(
        (marks, mark: Mark) => ({
          ...marks,
          [mark.name]: mark.schema,
        }),
        {},
      )
  }

  get plugins() {
    return this.extensions
      .filter((extension) => 'plugins' in extension)
      .reduce((allPlugins, { plugins }) => [...allPlugins, ...plugins], [])
  }

  serializer() {
    const nodes = this.extensions
      .filter((extension) => extension.type === 'node')
      .reduce(
        (nodes, extension: Node) => ({
          ...nodes,
          [extension.name]: extension.toMarkdown,
        }),
        {},
      )

    const marks = this.extensions
      .filter((extension) => extension.type === 'mark')
      .reduce(
        (marks, extension: Mark) => ({
          ...marks,
          [extension.name]: extension.toMarkdown,
        }),
        {},
      )

    return new MarkdownSerializer(nodes, marks)
  }

  parser({ schema }: { schema: Schema }): MarkdownParser {
    const tokens: Record<string, any> = this.extensions
      .filter((extension) => extension.type === 'mark' || extension.type === 'node')
      .reduce((nodes, extension: Node | Mark) => {
        const md = extension.parseMarkdown()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!md) return nodes

        return {
          ...nodes,
          [extension.markdownToken || extension.name]: md,
        }
      }, {})
    console.log(tokens)

    return new MarkdownParser(schema, markdownit('commonmark', { html: false }), tokens)
  }

  keymaps({ schema }: { schema: Schema }) {
    const extensionKeymaps = this.extensions
      .filter((extension) => ['extension'].includes(extension.type))
      .filter((extension) => extension.keys)
      .map((extension) => extension.keys({ schema }))

    const nodeMarkKeymaps = this.extensions
      .filter((extension) => ['node', 'mark'].includes(extension.type))
      .filter((extension) => extension.keys)
      .map((extension) =>
        extension.keys({
          type: schema[`${extension.type}s`][extension.name],
          schema,
        }),
      )

    return [...extensionKeymaps, ...nodeMarkKeymaps].map((keys: Record<string, any>) => keymap(keys))
  }

  inputRules({ schema }: { schema: Schema }) {
    const extensionInputRules = this.extensions
      .filter((extension) => ['extension'].includes(extension.type))
      .filter((extension) => extension.inputRules)
      .map((extension) => extension.inputRules({ schema }))

    const nodeMarkInputRules = this.extensions
      .filter((extension) => ['node', 'mark'].includes(extension.type))
      .filter((extension) => extension.inputRules)
      .map((extension) =>
        extension.inputRules({
          type: schema[`${extension.type}s`][extension.name],
          schema,
        }),
      )

    return [...extensionInputRules, ...nodeMarkInputRules].reduce((allInputRules, inputRules) => [...allInputRules, ...inputRules], [])
  }
}

import { useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { marks } from 'prosemirror-schema-basic'
import { defaultMarkdownParser } from 'prosemirror-markdown'
import { ExtensionManager } from '../lib/ExtensionManager'
import { Doc } from '../lib/nodes/Doc'
import { NodeSpec, Schema } from 'prosemirror-model'
import { Text } from '../lib/nodes/Text'
import { Paragraph } from '../lib/nodes/Paragraph'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { gapCursor } from 'prosemirror-gapcursor'
import { dropCursor } from 'prosemirror-dropcursor'
import { Blockquote } from '../lib/nodes/Blockquote'
import { HorizontalRule } from '../lib/nodes/HorizontalRule'
import { Heading } from '../lib/nodes/Heading'
import { HardBreak } from '../lib/nodes/HardBreak'

export type LebEditorProps = {
  content?: string
}

const LebEditor = (props: LebEditorProps) => {
  const pmEditor = useRef<HTMLDivElement>(null)
  const pmView = useRef<EditorView>(null)

  let extensions: ExtensionManager
  let nodes: { [name: string]: NodeSpec }
  let schema: Schema

  const createExtensions = () => {
    return new ExtensionManager([
      new Doc(),
      new Paragraph(),
      new Blockquote(),
      new HorizontalRule(),
      new Heading(),
      new Text(),
      new HardBreak(),
    ])
  }

  const createState = (content?: string) => {
    const doc = defaultMarkdownParser.parse(content || '')

    return EditorState.create({
      schema,
      doc,
      plugins: [dropCursor(), gapCursor(), keymap(baseKeymap)],
    })
  }

  const createView = () => {
    if (!pmEditor.current) {
      throw new Error('createView called before ref available')
    }

    const view = new EditorView(pmEditor.current, {
      state: createState(props.content),
      dispatchTransaction: (transaction) => {
        const newState = view.state.apply(transaction)
        view.updateState(newState)
      },
    })

    return view
  }

  // initial editor render
  useEffect(() => {
    extensions = createExtensions()
    nodes = extensions.nodes
    schema = new Schema({
      nodes,
      marks,
    })
    pmView.current = createView()
  }, [])

  // update content render
  useEffect(() => {
    if (pmView.current && props.content) {
      const newState = createState(props.content)
      pmView.current.updateState(newState)
    }
  }, [props.content])

  return (
    <>
      <div>
        <button type='button'>保存</button>
      </div>
      <div className='border border-gray-700 rounded' ref={pmEditor} />
    </>
  )
}

export default LebEditor

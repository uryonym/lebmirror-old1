import { useEffect, useMemo, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { MarkdownParser, MarkdownSerializer } from 'prosemirror-markdown'
import { ExtensionManager } from '../lib/ExtensionManager'
import { Doc } from '../lib/nodes/Doc'
import { Schema } from 'prosemirror-model'
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
import { Link } from '../lib/marks/Link'
import { Italic } from '../lib/marks/Italic'
import { Bold } from '../lib/marks/Bold'
import { Code } from '../lib/marks/Code'
import { inputRules, InputRule } from 'prosemirror-inputrules'
import { BulletList } from '../lib/nodes/BulletList'
import { ListItem } from '../lib/nodes/ListItem'
import { OrderedList } from '../lib/nodes/OrderedList'
import { History } from '../lib/plugins/History'
import 'prosemirror-view/style/prosemirror.css'

export type LebEditorProps = {
  content?: string
}

const LebEditor = (props: LebEditorProps) => {
  const pmEditor = useRef<HTMLDivElement>(null)
  const pmView = useRef<EditorView>(null)

  const createExtensions = () => {
    return new ExtensionManager([
      new Doc(),
      new Paragraph(),
      new Blockquote(),
      new HorizontalRule(),
      new Heading(),
      new Text(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new HardBreak(),
      new Link(),
      new Italic(),
      new Bold(),
      new Code(),
      new History(),
    ])
  }

  const createState = (content?: string) => {
    const doc = parser.parse(content || '')

    return EditorState.create({
      schema,
      doc,
      plugins: [
        ...plugins,
        ...keymaps,
        dropCursor(),
        gapCursor(),
        inputRules({
          rules,
        }),
        keymap(baseKeymap),
      ],
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
    pmView.current = createView()
  }, [])

  // update content render
  useEffect(() => {
    if (pmView.current && props.content) {
      const newState = createState(props.content)
      pmView.current.updateState(newState)
    }
  }, [props.content])

  const extensions: ExtensionManager = useMemo(() => {
    return createExtensions()
  }, [])

  const schema: Schema = useMemo(() => {
    return new Schema({
      nodes: extensions.nodes,
      marks: extensions.marks,
    })
  }, [extensions.nodes, extensions.marks])

  const serializer: MarkdownSerializer = useMemo(() => {
    return extensions.serializer()
  }, [])

  const parser: MarkdownParser = useMemo(() => {
    return extensions.parser({ schema })
  }, [schema])

  const plugins = useMemo(() => {
    return extensions.plugins
  }, [])

  const keymaps = useMemo(() => {
    return extensions.keymaps({ schema })
  }, [schema])

  const rules: InputRule[] = useMemo(() => {
    return extensions.inputRules({ schema })
  }, [schema])

  const value: string = useMemo(() => {
    return serializer.serialize(pmView.current.state.doc)
  }, [serializer])

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

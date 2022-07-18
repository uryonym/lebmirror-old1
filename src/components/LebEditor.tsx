import { useEffect, useMemo, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { MarkdownParser, MarkdownSerializer } from 'prosemirror-markdown'
import { Schema } from 'prosemirror-model'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { gapCursor } from 'prosemirror-gapcursor'
import { dropCursor } from 'prosemirror-dropcursor'
import { inputRules, InputRule } from 'prosemirror-inputrules'
import { ExtensionManager } from '../lib/ExtensionManager'
import { Box, Button } from '@mui/material'
import 'prosemirror-view/style/prosemirror.css'

//nodes
import { Doc } from '../lib/nodes/Doc'
import { Text } from '../lib/nodes/Text'
import { Paragraph } from '../lib/nodes/Paragraph'
import { Heading } from '../lib/nodes/Heading'
import { HardBreak } from '../lib/nodes/HardBreak'
import { HorizontalRule } from '../lib/nodes/HorizontalRule'
import { Blockquote } from '../lib/nodes/Blockquote'
import { BulletList } from '../lib/nodes/BulletList'
import { ListItem } from '../lib/nodes/ListItem'
import { OrderedList } from '../lib/nodes/OrderedList'
import { CodeBlock } from '../lib/nodes/CodeBlock'

//marks
import { Link } from '../lib/marks/Link'
import { Italic } from '../lib/marks/Italic'
import { Bold } from '../lib/marks/Bold'
import { Code } from '../lib/marks/Code'

//plugins
import { History } from '../lib/plugins/History'

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
      new CodeBlock(),
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

  const handleClickSave = () => {
    console.log(serializer.serialize(pmView.current.state.doc))
  }

  return (
    <>
      <Box p={1}>
        <Button variant='outlined' size='small' onClick={handleClickSave}>
          保存
        </Button>
      </Box>
      <Box ref={pmEditor} />
    </>
  )
}

export default LebEditor

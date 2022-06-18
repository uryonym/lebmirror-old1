import { useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from 'prosemirror-schema-basic'
import { defaultMarkdownParser } from 'prosemirror-markdown'

export type LebEditorProps = {
  content?: string
}

const LebEditor = (props: LebEditorProps) => {
  const pmEditor = useRef<HTMLDivElement>(null)

  const createState = (content?: string) => {
    const doc = defaultMarkdownParser.parse(content || '')

    return EditorState.create({
      schema,
      doc
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

  useEffect(() => {
    console.log('init editor')
    console.log(pmEditor.current)
    createView()
  }, [])

  return <div ref={pmEditor} />
}

export default LebEditor

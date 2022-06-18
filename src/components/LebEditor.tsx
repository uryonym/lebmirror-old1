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
  const pmView = useRef<EditorView>(null)

  const createState = (content?: string) => {
    const doc = defaultMarkdownParser.parse(content || '')

    return EditorState.create({
      schema,
      doc,
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
    console.log('init editor')
    console.log(pmEditor.current)
    pmView.current = createView()
  }, [])

  // update content render
  useEffect(() => {
    console.log('update content')
    console.log(pmView.current)
    console.log(props.content)
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
      <div
        className='border border-gray-700 rounded'
        ref={pmEditor}
      />
    </>
  )
}

export default LebEditor

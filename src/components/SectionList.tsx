import { Section } from '../lib/firestoreApi'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch, useSelector } from '../store'
import { noteSelector } from '../features/noteSlice'
import { createSection, sectionSelector, setCurrentSection } from '../features/sectionSlice'
import { fetchPages } from '../features/pageSlice'

export const SectionList = () => {
  const dispatch = useAppDispatch()
  const { currentNote } = useSelector(noteSelector)
  const { sections } = useSelector(sectionSelector)
  const [sectionName, setSectionName] = useState('')

  const handleInputSectionName = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const handleCreateSection = () => {
    const data: Section = {
      name: sectionName,
      noteId: currentNote.id,
      createdAt: new Date(),
    }
    dispatch(createSection(data))
    setSectionName('')
  }

  const handleSelectSection = (sectionId: string) => {
    dispatch(setCurrentSection(sectionId))
    dispatch(fetchPages(sectionId))
  }

  return (
    <div>
      <div className='flex justify-between hs-dropdown'>
        <h2>セクション</h2>
        <button id='hs-dropdown-custom-icon-trigger' type='button' className='hs-dropdown-toggle px-2'>
          <svg
            className='w-4 h-4 text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
          </svg>
        </button>
        <div
          className='hs-dropdown-menu z-[110] transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700'
          aria-labelledby='hs-dropdown-custom-icon-trigger'
        >
          <a
            className='flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
            href='#'
          >
            新規作成
          </a>
          <a
            className='flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
            href='#'
          >
            名前変更
          </a>
          <a
            className='flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
            href='#'
          >
            削除
          </a>
        </div>
      </div>
      <div>
        <label htmlFor='hs-trailing-button-add-on' className='sr-only'>
          Label
        </label>
        <div className='flex rounded-md shadow-sm m-2'>
          <input
            type='text'
            id='hs-trailing-button-add-on'
            name='hs-trailing-button-add-on'
            className='py-2 px-3 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500'
            value={sectionName}
            onChange={handleInputSectionName}
          />
          <button
            type='button'
            className='py-2 px-3 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm'
            onClick={handleCreateSection}
          >
            作成
          </button>
        </div>
      </div>
      <div className='max-w-xs flex flex-col m-2'>
        {sections.map((section: Section) => (
          <button key={section.id} type='button' className='list-btn' onClick={() => handleSelectSection(section.id)}>
            {section.name}
          </button>
        ))}
      </div>
    </div>
  )
}

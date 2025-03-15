import EditorProvider from '@/providers/editor/editor-provider'
import React from 'react'
import WebEditorNavigation from './_components/web-editor-navigation'
import WebEditorSidebar from './_components/web-editor-sidebar'
import WebEditor from './_components/web-editor'

type Props = {}

const page = (props: Props) => {
  
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-[20] bg-themeBlack overflow-hidden'>
      <EditorProvider
      webId='sfs'
      pageDetails={[]}

      >
       <WebEditorNavigation webId='sfs' pageDetails={{id:'123'}} />
       <WebEditorSidebar/>
       <div className="h-full flex justify-center">
        <WebEditor webPageId='sfs'/>
       </div>

      </EditorProvider>
      
    </div>
  )
}

export default page
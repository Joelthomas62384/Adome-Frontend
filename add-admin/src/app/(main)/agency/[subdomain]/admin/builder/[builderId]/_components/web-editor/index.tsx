"use client"


import { Button } from '@/components/ui/button'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { EyeOff } from 'lucide-react'
import React, { useEffect } from 'react'

type Props = {
    webPageId: string
    liveMode? : boolean
}

const WebEditor = ({webPageId,liveMode}: Props) => {
    const {state , dispatch} = useEditor()

    useEffect(() => {
     if(!liveMode){
        dispatch({
            type: "TOGGLE_LIVE_MODE",
            payload: {
              value: true,
            },
        })

     }
    }, [liveMode])

    // need to get the webpage data and start the event load data

    const handleClick = () => {
        dispatch({
          type: 'CHANGE_CLICKED_ELEMENT',
          payload: {},
        })
      }

      const handleUnpreview = () => {
        dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
        dispatch({ type: 'TOGGLE_LIVE_MODE' })
      }
    
  return (
    <div
    className={clsx(
      'use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-themeDarkGray transition-all rounded-md',
      {
        '!p-0 !mr-0':
          state.editor.previewMode === true || state.editor.liveMode === true,
        '!w-[850px]': state.editor.device === 'Tablet',
        '!w-[420px]': state.editor.device === 'Mobile',
        'w-full': state.editor.device === 'Desktop',
      }
    )}
    onClick={handleClick}
  >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={'ghost'}
          size={'icon'}
          className="w-6 h-6  p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}

  </div>
  )
}

export default WebEditor
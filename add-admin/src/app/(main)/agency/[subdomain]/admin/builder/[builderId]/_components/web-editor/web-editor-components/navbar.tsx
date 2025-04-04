'use client'

import { Badge } from '@/components/ui/badge'
import { EditorBtns } from '@/constants'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { Trash, Menu as MenuIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlassSheet from '@/components/global/glass-sheet'

type Props = {
  element: EditorElement
}

const Navbar = (props: Props) => {
  const { dispatch, state } = useEditor()
  const styles = props.element.styles

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    })
  }

  return (
    <nav
      style={styles}
      onClick={handleOnClick}
      className={clsx(
        'p-4 w-full flex justify-between items-center relative',
        {
          '!border-blue-500 border-solid':
            state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <p className="text-2xl font-bold">Adome.</p>
      <div className="hidden lg:flex gap-4">
        <Link href="/home" className="px-4 py-2 rounded-lg" style={styles}>
          Home
        </Link>
        <Link href="/about" className="px-4 py-2 rounded-lg" style={styles}>
          About
        </Link>
        <Link href="/contact" className="px-4 py-2 rounded-lg" style={styles}>
          Contact
        </Link>
      </div>
      <Link href="/login" passHref>
        <Button variant="outline" className="rounded-2xl flex gap-2" style={styles}>
          Login
        </Button>
      </Link>
      <GlassSheet
        triggerClass="lg:hidden"
        trigger={
          <Button variant={'ghost'} className="hover:bg-transparent">
            <MenuIcon size={30} />
          </Button>
        }
      >
        <div className="flex flex-col mt-10">
          <Link href="/home" className="px-4 py-2 rounded-lg" style={styles}>
            Home
          </Link>
          <Link href="/about" className="px-4 py-2 rounded-lg" style={styles}>
            About
          </Link>
          <Link href="/contact" className="px-4 py-2 rounded-lg" style={styles}>
            Contact
          </Link>
        </div>
      </GlassSheet>
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-blue-500 px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </nav>
  )
}

export default Navbar

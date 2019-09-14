import React from 'react'
import { Navbar } from './Navbar'
import { Menu } from './Menu'

export default function MainLayout(props) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="h-full w-full mb-24">{props.children}</div>
      <Menu tab={props.tab} />
    </div>
  )
}

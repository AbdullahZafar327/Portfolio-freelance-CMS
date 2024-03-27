import React from 'react'

const Header = ({title}:{title:string}) => {
  return (
    <div className="p-12 flex items-center justify-center">
      <h1 className="font-bold text-[50px] text-black">
        {title}
      </h1>
    </div>
  )
}

export default Header

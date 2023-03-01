import React from 'react'
import fullStar from '../../public/icons/full-star.png'
import halfStar from '../../public/icons/half-star.png'
import emptyStar from '../../public/icons/empty-star.png'
import Image from 'next/image'
export default function Stars() {
  return (
    <Image src={fullStar} alt=''  />
  )
}

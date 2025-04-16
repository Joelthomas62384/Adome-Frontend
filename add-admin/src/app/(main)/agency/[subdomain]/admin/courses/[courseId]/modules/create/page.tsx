import React from 'react'

type Props = {
    params: Promise<{ courseId: string }>;
}

const page = ({params}: Props) => {
    const { courseId } = React.use(params)
  return (
    <div>page</div>
  )
}

export default page
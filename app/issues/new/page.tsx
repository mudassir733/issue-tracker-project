import React from 'react'
import { TextField, TextArea, Button } from '@radix-ui/themes'

const newPageIssue = () => {
  return (
    <div className='max-w-xl px-6 py-6'>
        <TextField.Root size="2" placeholder="Title" />
     <div className='py-4'>
     <TextArea resize="vertical" size="2" placeholder="Description" />
     </div>
     <Button>Submit New Issue</Button>


    </div>
  )
}

export default newPageIssue
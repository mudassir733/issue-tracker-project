"use client"
import React from 'react'
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from "axios"
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewPageIssue = () => {
  const router = useRouter()
  const {register, control, handleSubmit} = useForm<IssueForm>()
  
  return (
    <form className='max-w-xl px-6 py-6' onSubmit={handleSubmit(async (data) => {
      await axios.post("/api/issues/POST", data)
      router.push('/issues')
    })}>
        <TextField.Root size="2" placeholder="Title" {...register("title")} />
     <div className='py-4'>

     </div>
     <Controller
        name="description"
        control={control}
        render={({ field }) => (
          
          <SimpleMDE {...field} />
        )}
      />
     <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewPageIssue
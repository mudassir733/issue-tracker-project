"use client"
import React, { useState } from 'react';
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import {createIssueSchema} from "../../lib/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import {z} from "zod";
import Spinner from '@/app/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>;

const NewPageIssue = () => {
  const router = useRouter()
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState("")
  const [isSpinner, setSpinner] = useState(false)


  const onSubmit = handleSubmit(async (data) => {
    try {
     setSpinner(true)
     await axios.post("/api/issues", data)
     router.push('/issues')
    } catch (err) {
     setSpinner(false)
     setError("An unexpected error occurred!")
     
    }
   })
  
  return (

    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mt-6 mx-6'>
        <Callout.Icon>
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>
      )}
      <form className='px-6 py-6' onSubmit={onSubmit}>
        <TextField.Root size="2" placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
     <div className='py-4'>

     </div>
     <Controller
        name="description"
        control={control}
        render={({ field }) => (
          
          <SimpleMDE {...field} />
        )}
      />

 <ErrorMessage>{errors.description?.message}</ErrorMessage>

 <Button>Submit New Issue {isSpinner && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default NewPageIssue
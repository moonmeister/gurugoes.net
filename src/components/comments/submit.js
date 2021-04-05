import * as React from "react"

import { useForm } from "react-hook-form";

const onSubmit = data => console.log(data);

const { register, handleSubmit, errors } = useForm();


export default function SubmitComment({ commentStatus }) {
  const { commentStatus } = data

  return (
    <div>
      {
        commentStatus === 'closed' ? <p>Comments are disabled for this post</p> :
          <>
            <h2> leave a comment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Name
                      <input type="text" name="name" ref={register({ required: true })} />
              </label>

              <label>Email
                      <input type="email" name="email" ref={register({ required: true })} />
              </label>

              <label>Comment
                      <textarea name="comment" ref={register({ required: true })}></textarea>
              </label>

              {errors.exampleRequired && <span>This field is required</span>}
              <input type="submit" />
            </form>
          </>
      }
    </div>
  )
}
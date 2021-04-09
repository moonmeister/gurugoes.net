import * as React from "react"
import { useForm } from "react-hook-form";

import { useAddComment } from "../../hooks/comments"

import LoginForm from "./login"
import { useAuth, ProvideAuth } from "../../hooks/use-auth"

export default function SubmitComment({ data: { commentStatus, databaseId } }) {

  const { user, signout } = useAuth()

  const { mutate, isLoading, isError, error: mutationError } = useAddComment()

  const onSubmit = (formData) => {

    const data = { ...formData, ...user, commentOn: databaseId }

    mutate(data)
  };

  const { register, handleSubmit, errors, reset, formState: { isSubmitSuccessful } } = useForm({
    defaultValues: { comment: "" }
  });



  return (
    <ProvideAuth>
      <div>
        {
          commentStatus === 'closed' ? <p>Comments are disabled for this post</p> :
            (
              user ?
                <>
                  <heading>
                    <h2> leave a comment</h2>
                    <div><p>Commenting as {user.name}{`<${user.email}>`}</p> <button type="button" onClick={() => signout()}>Logout</button> </div>
                  </heading>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Comment
                      <textarea name="comment" ref={register({ required: true })} ></textarea>
                    </label>

                    {errors.comment && <span>This field is required</span>}
                    <input type="submit" value={isLoading ? "Submitting..." : "Submit"} />
                    {isError ? <span>Error: <span dangerouslySetInnerHTML={{ __html: mutationError.response.errors[0].message }} /></span> : null}
                  </form>
                </>
                : <LoginForm />)
        }
      </div>
    </ProvideAuth>
  )
}
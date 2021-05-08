import * as React from "react"
import { useForm } from "react-hook-form";

import { useAddComment } from "../../hooks/comments"
import { useAuth } from "../../hooks/use-auth"

export default function SubmitComment({ data: { databaseId } }) {

  const { user, signout } = useAuth()

  const { mutateAsync, isLoading, isError, error: mutationError } = useAddComment()

  const { register, handleSubmit, errors, reset, formState: { isSubmitSuccessful } } = useForm({
    defaultValues: { comment: "" }
  });


  const onSubmit = async (formData) => {

    const mutationData = { ...formData, ...user, commentOn: databaseId }

    try {
      const result = await mutateAsync(mutationData)

      reset({
        defaultValues: { comment: "" }
      }, {
        keepIsSubmitted: true
      })

    } catch (e) {
      throw e
    }



  };



  return (
    <div>
      <heading>
        <h2> leave a comment</h2>
        <div><p>Commenting as {user?.name}{`<${user?.email}>`}</p> <button type="button" onClick={() => signout()}>Logout</button> </div>
      </heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Comment
                      <textarea name="comment" ref={register({ required: true })} ></textarea>
        </label>

        {errors.comment && <span>This field is required</span>}
        <input type="submit" value={isLoading ? "Submitting..." : "Submit"} />
        {isError ? <span>Error: <span dangerouslySetInnerHTML={{ __html: mutationError.response.errors[0].message }} /></span> : null}
        {isSubmitSuccessful ? <span>You submitted successfully!</span> : null}
      </form>
    </div>
  )
}
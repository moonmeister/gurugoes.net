import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment$1 } from '../../chunks/astro/server_Cs1_6WaH.mjs';
import { c as client } from '../../chunks/client_C-YDzuhU.mjs';
import { c as classNames, f as formatDate, b as buttonClasses, B as Button, $ as $$Base } from '../../chunks/base_C7VT7Vsi.mjs';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { gql } from '@urql/core';
import { T as Time, R as ReadingTime } from '../../chunks/time_DkhPcr9K.mjs';
/* empty css                                     */
import { gql as gql$1, useQuery, useMutation, Provider } from 'urql';
import { useMemo, useState, createContext, useContext, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useFormContext, useForm, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
export { renderers } from '../../renderers.mjs';

function FeaturedImage({ data, className, children }) {
  const featuredImage = data?.node;
  return /* @__PURE__ */ jsx(Fragment, { children: featuredImage.src ? /* @__PURE__ */ jsx(
    "img",
    {
      className: classNames("w-full object-cover", className),
      src: featuredImage.src,
      srcSet: featuredImage.srcSet,
      alt: featuredImage.altText,
      children
    }
  ) : /* @__PURE__ */ jsx("div", { className: classNames("bg-green-600", className), children }) });
}
FeaturedImage.fragment = gql`
	fragment FeaturedImage on Post {
		featuredImage {
			node {
				altText
				sourceUrl
				srcSet
			}
		}
	}
`;

function PostContent({ data }) {
  const { content, title, dateGmt, featuredImage } = data;
  return /* @__PURE__ */ jsxs("article", { className: "relative", children: [
    /* @__PURE__ */ jsxs("header", { className: "static text-lg mx-auto w-full", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "grid w-full",
          style: {
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "1fr auto 1fr",
            gap: "1em"
          },
          children: [
            /* @__PURE__ */ jsx("div", { className: "row-span-full col-span-full", children: /* @__PURE__ */ jsx(FeaturedImage, { data: featuredImage, className: "max-h-96" }) }),
            /* @__PURE__ */ jsx("h1", { className: "z-10 row-start-2 row-end-3 col-start-2 col-end-3", children: /* @__PURE__ */ jsx("span", { className: "mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl bg-green-700 bg-opacity-50 p-2 rounded-lg", children: title }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-gray-500 leading-8", children: [
        /* @__PURE__ */ jsx(Time, { dateTime: dateGmt }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: " · " }),
        /* @__PURE__ */ jsx(ReadingTime, { content })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "my-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "wp-blocks prose-lg mt-6 max-w-prose prose-green text-gray-500 mx-auto",
        dangerouslySetInnerHTML: { __html: content }
      }
    ) })
  ] });
}
PostContent.fragment = gql`
	fragment PostContent on Post {
		title
		content
		dateGmt
		...FeaturedImage
	}

	${FeaturedImage.fragment}
`;

const MAX_DEPTH = 0;
function Comment({ comment, depth = 0 }) {
  const {
    content,
    author: {
      node: { name }
    },
    dateGmt
  } = comment;
  return /* @__PURE__ */ jsx(
    "li",
    {
      className: `p-4 list-none bg-gray-100 even:bg-gray-300 rounded-sm ml-${depth * 4}`,
      children: /* @__PURE__ */ jsx("div", { class: "flex space-x-3", children: /* @__PURE__ */ jsxs("div", { class: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { class: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h3", { class: "text-sm font-medium", children: name }),
          /* @__PURE__ */ jsx("p", { class: "text-xs text-gray-600", children: formatDate(dateGmt) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            class: "text-sm prose-green",
            dangerouslySetInnerHTML: { __html: content }
          }
        ),
        MAX_DEPTH > depth ? /* @__PURE__ */ jsx("div", { class: "text-sm text-gray-700", children: /* @__PURE__ */ jsx("button", { type: "button", class: "hover:underline", children: "reply" }) }) : null
      ] }) })
    }
  );
}

const CommentsByPostId = gql$1`
	query postComments($postId: ID!) {
		post(id: $postId, idType: DATABASE_ID) {
			comments {
				nodes {
					content
					databaseId
					parentDatabaseId
					author {
						node {
							name
						}
					}
					dateGmt
				}
			}
		}
	}
`;
function CommentList({ postId }) {
  const [results] = useQuery({
    query: CommentsByPostId,
    variables: { postId },
    requestPolicy: "cache-and-network"
  });
  const { data, error, fetching } = results;
  const comments = data?.post?.comments?.nodes || [];
  const depthCalcs = useMemo(() => {
    if (comments.length <= 0) return null;
    const sortedComments = comments.sort(
      ({ parentDatabaseId, databaseId }) => databaseId - parentDatabaseId
    );
    const depthStore = /* @__PURE__ */ new Map();
    for (const comment of sortedComments) {
      const { databaseId, parentDatabaseId } = comment;
      if (parentDatabaseId === 0) {
        depthStore.set(databaseId, 0);
      } else if (depthStore.has(parentDatabaseId)) {
        depthStore.set(databaseId, depthStore.get(parentDatabaseId) + 1);
      } else {
        console.error("Parent DatabaseId not found :/", comment);
      }
    }
    return depthStore;
  }, [comments]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    error ? /* @__PURE__ */ jsxs("p", { children: [
      "ERROR: ",
      error.message
    ] }) : null,
    /* @__PURE__ */ jsx(
      Transition,
      {
        show: !fetching,
        enter: "transition-opacity duration-75",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "transition-opacity duration-150",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: comments.length === 0 ? /* @__PURE__ */ jsx("p", { children: "There are no comments." }) : /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: comments.map((comment) => {
          const { databaseId } = comment;
          return /* @__PURE__ */ jsx(
            Comment,
            {
              comment,
              depth: depthCalcs.get(databaseId)
            },
            databaseId
          );
        }) })
      }
    )
  ] });
}

const inputStyles = "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md";
function Label({ htmlFor, value, children }) {
  return /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxs("label", { htmlFor, class: "block text-sm font-semibold text-black", children: [
    value,
    /* @__PURE__ */ jsx("div", { class: "mt-1", children })
  ] }) });
}
function Input({ className, name, reg = {}, ...props }) {
  const { register } = useFormContext();
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      ...register(name, reg),
      className: classNames(
        inputStyles,
        className,
        props.type === "checkbox" ? "form-checkbox" : "form-input"
      )
    }
  );
}
function Textarea({ className, name, reg = {}, ...props }) {
  const { register } = useFormContext();
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ...props,
      ...register(name, reg),
      className: classNames(inputStyles, className, "form-textarea")
    }
  );
}
function Description({ children, ...props }) {
  return /* @__PURE__ */ jsx("p", { ...props, class: " text-sm font-light text-black", children });
}
function Submit({ ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "submit",
      className: classNames(buttonClasses, "cursor-pointer")
    }
  );
}
function Error({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    ErrorMessage,
    {
      render: ({ message }) => {
        return /* @__PURE__ */ jsx(
          "p",
          {
            className,
            dangerouslySetInnerHTML: { __html: message }
          }
        );
      },
      ...props
    }
  );
}

function useLocalStorage(key, initialValue) {
	// State to store our value

	// Pass initial state function to useState so logic is only executed once

	const [storedValue, setStoredValue] = useState(() => {
		try {
			let item;
			// Get from local storage by key
			if (typeof window !== "undefined") {
				item = window?.localStorage.getItem(key);
			}
			// Parse stored json or if none return initialValue

			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue

			console.error(error);

			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...

	// ... persists the new value to localStorage.

	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState

			const valueToStore =
				value instanceof Function ? value(storedValue) : value;

			// Save state

			setStoredValue(valueToStore);

			// Save to local storage
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			// A more advanced implementation would handle the error case

			console.error(error);
		}
	};

	return [storedValue, setValue];
}

const authContext = createContext();
function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return /* @__PURE__ */ jsx(authContext.Provider, { value: auth, children });
}
function useAuth() {
  return useContext(authContext);
}
function useProvideAuth() {
  const [user, setUser] = useLocalStorage("user-info", false);
  const signin = (user2) => {
    return setUser(user2);
  };
  const signout = () => {
    return setUser(false);
  };
  return {
    user,
    signin,
    signout
  };
}

function SubmitComment({ data: { postId } }) {
  const { user, signout, signin } = useAuth();
  const [submitCommentResult, submitComment] = useMutation(gql$1`
		mutation postComment(
			$name: String!
			$email: String!
			$comment: String!
			$commentOn: Int!
		) {
			createComment(
				input: {
					author: $name
					authorEmail: $email
					content: $comment
					commentOn: $commentOn
				}
			) {
				success
			}
		}
	`);
  const methods = useForm({
    defaultValues: { comment: "" }
  });
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful }
  } = methods;
  const onSubmit = async (formData) => {
    if (formData.rememberMe) {
      signin({ name: formData.name, email: formData.email });
      delete formData.rememberMe;
    }
    const mutationData = { ...formData, commentOn: postId };
    try {
      await submitComment(mutationData);
    } catch (err) {
      err.response.errors.forEach((error) => {
        setError("graphql", error);
      });
    }
  };
  useEffect(() => {
    if (errors?.graphql) {
      const timeout = setTimeout(() => clearErrors("graphql"), 5e3);
      return () => clearTimeout(timeout);
    }
  }, [errors?.graphql, clearErrors]);
  function SubmittedMessage() {
    return /* @__PURE__ */ jsxs("div", { className: "flex ", children: [
      /* @__PURE__ */ jsx("p", { children: "You submitted successfully, your comment may not appear till a moderator approves it!" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            reset({
              defaultValues: { comment: "" }
            });
          },
          children: "Comment Again!"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsx(FormProvider, { ...methods, children: isSubmitSuccessful ? /* @__PURE__ */ jsx(SubmittedMessage, {}) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
    /* @__PURE__ */ jsxs("div", { className: user ? "hidden" : "", children: [
      /* @__PURE__ */ jsxs(Label, { value: "Name", htmlFor: "name", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "name",
            type: user ? "hidden" : "text",
            name: "name",
            defaultValue: user.name ?? "",
            reg: { required: "A name is required." },
            placeholder: "Billie Jean",
            "aria-describedby": "name-description"
          }
        ),
        /* @__PURE__ */ jsx(Description, { id: "name-description", children: "Real or fake, made available with your comment." }),
        /* @__PURE__ */ jsx(
          Error,
          {
            errors,
            name: "name",
            className: "text-red-700 italic"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Label, { value: "Email", htmlFor: "email", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            defaultValue: user.email ?? "",
            reg: { required: "An email is required." },
            type: user ? "hidden" : "email",
            name: "email",
            id: "email",
            placeholder: "heistheone@jmail.com",
            "aria-describedby": "email-description"
          }
        ),
        /* @__PURE__ */ jsx(Description, { id: "email-description", children: "We'll only use this for spam prevention." }),
        /* @__PURE__ */ jsx(
          Error,
          {
            errors,
            name: "email",
            className: "text-red-700 italic"
          }
        )
      ] })
    ] }),
    !user ? /* @__PURE__ */ jsx(Label, { value: "Remember me", htmlFor: "rememberMe", children: /* @__PURE__ */ jsx(Input, { id: "rememberMe", name: "rememberMe", type: "checkbox" }) }) : null,
    /* @__PURE__ */ jsxs(
      Label,
      {
        htmlFor: "comment",
        value: !user ? "Comment" : /* @__PURE__ */ jsxs(Fragment, { children: [
          `Comment as ${user?.name}<${user?.email}>`,
          " ",
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "text-sm underline",
              onClick: () => signout(),
              children: "Logout"
            }
          )
        ] }),
        children: [
          /* @__PURE__ */ jsx(
            Textarea,
            {
              name: "comment",
              className: "w-full max-w-full",
              reg: { required: "A comment is required." }
            }
          ),
          /* @__PURE__ */ jsx(
            Error,
            {
              errors,
              name: "comment",
              className: "text-red-700 italic"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(Submit, { value: "Comment" }) }),
    /* @__PURE__ */ jsx(Error, { errors, name: "graphql" })
  ] }) }) });
}

function CommentSection({ data }) {
  const { commentStatus, postId } = data;
  return /* @__PURE__ */ jsxs("section", { className: "bg-green-700 p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold py-4", children: "Comments" }),
    /* @__PURE__ */ jsx(Provider, { value: client, children: /* @__PURE__ */ jsxs(ProvideAuth, { children: [
      /* @__PURE__ */ jsx(CommentList, { postId }),
      commentStatus === "closed" ? /* @__PURE__ */ jsx("div", { children: "Comments are disabled for this post" }) : /* @__PURE__ */ jsx(SubmitComment, { "client:only": true, data })
    ] }) })
  ] });
}
CommentSection.fragment = gql$1`
	fragment CommentSection on Post {
		databaseId
		commentStatus
	}
`;
function getCommentData(post) {
  return { commentStatus: post.commentStatus, postId: post.databaseId };
}

const $$Astro = createAstro();
const prerender = false;
const $$Single = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Single;
  if (!Astro2.locals.uri) {
    return Astro2.rewrite("/404");
  }
  const query = gql`
	query GetComments($uri: ID!) {
		post(id: $uri, idType: URI) {
			...CommentSection
			...PostContent
		}
	}
	${PostContent.fragment}
	${CommentSection.fragment}
`;
  const contentResponse = await client.query(query, {
    uri: Astro2.locals.uri
  });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "currentUri": Astro2.locals.uri }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="relative bg-white rounded-3xl overflow-hidden"> ${contentResponse.error ? renderTemplate`<div class="text-red-500">${contentResponse.error}</div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "PostContent", PostContent, { "data": contentResponse.data.post })} ${renderComponent($$result3, "CommentSection", CommentSection, { "client:load": true, "data": getCommentData(contentResponse.data.post), "client:component-hydration": "load", "client:component-path": "/Users/alex.moon/code/moonmeister/gurugoes.net/src/components/comments/section", "client:component-export": "CommentSection" })} ` })}`} </div> ` })}`;
}, "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/wp-templates/single.astro", void 0);

const $$file = "/Users/alex.moon/code/moonmeister/gurugoes.net/src/pages/wp-templates/single.astro";
const $$url = "/wp-templates/single";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Single,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

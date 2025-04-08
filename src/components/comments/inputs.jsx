import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { classNames } from "../../lib/strings";
import { buttonClasses } from "../links";

const inputStyles =
	"shadow-xs focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md";

export function Label({ htmlFor, value, children }) {
	return (
		<div className="p-2">
			<label
				htmlFor={htmlFor}
				className="block text-sm font-semibold text-black"
			>
				{value}
				<div className="mt-1">{children}</div>
			</label>
		</div>
	);
}

export function Input({ className, name, reg = {}, ...props }) {
	const { register } = useFormContext();

	return (
		<input
			{...props}
			{...register(name, reg)}
			className={classNames(
				inputStyles,
				className,
				props.type === "checkbox" ? "form-checkbox" : "form-input",
			)}
		/>
	);
}

export function Textarea({ className, name, reg = {}, ...props }) {
	const { register } = useFormContext();

	return (
		<textarea
			{...props}
			{...register(name, reg)}
			className={classNames(inputStyles, className, "form-textarea")}
		/>
	);
}

export function Description({ children, ...props }) {
	return (
		<p {...props} className=" text-sm font-light text-black">
			{children}
		</p>
	);
}

export function Submit({ ...props }) {
	return (
		<input
			{...props}
			type="submit"
			className={classNames(buttonClasses, "cursor-pointer")}
		/>
	);
}

export function Error({ className, ...props }) {
	return (
		<ErrorMessage
			render={({ message }) => {
				return (
					<p
						className={className}
						dangerouslySetInnerHTML={{ __html: message }}
					/>
				);
			}}
			{...props}
		/>
	);
}

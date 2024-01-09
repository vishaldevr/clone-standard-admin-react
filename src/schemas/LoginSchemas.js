import * as Yup from "yup";
export const LoginSchemas = Yup.object({
    email: Yup.string()
      .required("This field is required"),
    password: Yup.string().required("Password is mandatory")
  });
  
import * as Yup from "yup";
export const CreateUserSchema = Yup.object({
    name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    phone_no: Yup.string().required("This field is required"),
    password: Yup.string().required("Password is mandatory")
  });
  
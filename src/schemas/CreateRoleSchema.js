import * as Yup from "yup";
export const CreateRoleSchema  = Yup.object({
    name: Yup.string().required("This field is required"),
  });
  
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email est invalide")
    .required("L'email est obligatoire")
    .trim(),
  password: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

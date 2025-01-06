import * as yup from 'yup';

export const firstStepSchema = yup.object().shape({
  name: yup.string().required('Le nom est obligatoire'),
  email: yup
    .string()
    .email("L'email est invalide")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation du mot de passe requise'),
});

export const secondStepSchema = yup.object().shape({
  rentalsNumber: yup
    .array()
    .of(yup.number().required('Le nombre de locations est obligatoire')),
  additionalRentals: yup
    .number()
    .min(6, "Le nombre de locations supplémentaires doit être d'au moins 6")
    .max(
      1000000,
      'Le nombre de locations supplémentaires ne peut pas dépasser 1 000 000'
    )
    .required('Locations supplémentaires requises'),
});

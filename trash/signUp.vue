<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';


definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  },
})

const { signIn, data } = useSession()
const router = useRouter()


const schema = yup.object({
  email: yup.string().required().email().label('email'),
  password: yup.string().min(5).required().label('password'),
})

const { handleSubmit, errors, values } = useForm({ validationSchema: schema });
const { value: email } = useField('email');
const { value: password } = useField("password");


function onInvalidSubmit({ values, errors, results }) {
  console.log("could not log in user");
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}
const onSubmit = handleSubmit(async (values) => {
  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(values.password, salt);
  const { error, url } = await signIn('credentials', { email: values.email, password,  callbackUrl: '/' })
  debugger;
  if (error || !data?.user) {
    // Do your custom error handling here
    alert('You have made a terrible mistake while entering your credentials')
  } else {
    return navigateTo(`${(url as string).replace("/login", `/${data.user.name}`)}`, { external: true })
  }
}, onInvalidSubmit); 


</script>

<template>
  <form @submit="onSubmit" class="app-border w-min">
    <span>email: <input name="email" v-model="email" type="text" class="text-black m-1" /></span>
    <span class="text-secondary-400">{{ errors.email }}</span>
    
    <span>password: <input name="password" v-model="password" type="password" class="text-black m-1" /></span>
    <span class="text-secondary-400">{{ errors.password }}</span>

    <span>confirm password: <input name="password" v-model="password" type="password" class="text-black m-1" /></span>
    <span class="text-secondary-400">{{ errors.password }}</span>


    <button class="app-button m-1">sign up</button>

    <br>
    <pre>{{ values }}</pre>
    <pre>{{ data }}</pre>
  </form>
</template>
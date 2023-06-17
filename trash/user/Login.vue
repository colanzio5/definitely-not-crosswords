<script lang="ts" setup>

import { useUserStore } from '@/store/user.store';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { computed, reactive } from 'vue';
import { maxLength, minLength, sameAs } from 'vuelidate/lib/validators';
import { createAdminUser } from '../../../../prisma/seed/create-admin';


const state = reactive({
  submitted: false,
  isLoading: false, 
  displayName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  password: { required, 
    valid: function(value: string) {
      const containsUppercase = /[A-Z]/.test(value)
      const containsLowercase = /[a-z]/.test(value)
      const containsNumber = /[0-9]/.test(value)
      const containsSpecial = /[#?!@$%^&*-]/.test(value)
      return containsUppercase && containsLowercase && containsNumber && containsSpecial
    },
    minLength: minLength(9),
    maxLength: maxLength(19),
  },
  confirmPassword: { required, sameAsPassword: sameAs("password") },
}

const $v = useVuelidate(rules, state)

const onSubmit = async () => {
  await createAdminUser();
  const userStore = useUserStore();
  state.submitted = true;
  state.isLoading = true;
  $v.$touch();
  if ($v.$invalid) {
    return false; // stop here if form is invalid
  } else {
    await userStore.registerNewUser({ ...state })
      .catch(console.error);
  }
}

</script>

<template>
  <form class="app-view-port w-fit h-fit text-white" @submit.prevent="onSubmit">
    <div class="app-view-port">login</div>
    <!-- Email -->
    <div class="app-view-port">
      <label class="form-label" for="">email</label>
      <input v-model="$v.form.email.$model" class="form-input" type="email" />
    </div>
    <!-- password -->
    <div class="app-view-port">
      <label class="form-label" for="">password</label>
      <input v-model="$v.form.password.$model" class="form-input" type="password" />
    </div>
    <!-- errors -->
    <div v-if="$v" class="input-errors app-view-port">
      <div class="error-msg">
        {{ firstError }}
      </div>
    </div>

    <button
      class="app-view-port text-white hover:link"
      :disabled="$v.form.$invalid"
      @click="logIn()"
    >
      login
    </button>
    <button class="app-view-port text-white hover:link" @click="goToSignUp()">sign up</button>
    <div v-if="isLoading" class="app-view-port">
      <div class="loading-bar"></div>
    </div>
  </form>
</template>

<style lang="postcss">
.error-msg {
  @apply text-secondary-400;
}
.form-label {
  @apply text-white p-0;
}
.form-input {
  @apply text-black w-full;
}
</style>

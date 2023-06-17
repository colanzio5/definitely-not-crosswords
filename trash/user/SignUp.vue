<script lang="ts">
import { vxm } from '@/store';
import { useUserStore } from '@/store/user.store';
import useVuelidate, { Validation } from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';

function matchesPassword(value: string, siblings: { password: string }) {
  return siblings.password == value;
}

@Options({
  components: {},
  validations: {
    form: {
      displayName: {
        required: helpers.withMessage('display name is required', required),
      },
      firstName: {},
      lastName: {},
      email: {
        required: helpers.withMessage('email is required', required),
        email: helpers.withMessage('invalid email address', email),
      },
      password: {
        required: helpers.withMessage('password is required', required),
        min: helpers.withMessage(
          'password must be > 8 characters',
          minLength(8)
        ),
      },
      passwordConfirmation: {
        matchesPassword: helpers.withMessage(
          'passwords must match',
          matchesPassword
        ),
      },
    },
  },
})
export default class Signup extends Vue {
  form = {
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  isSignUpLoading = false;
  router = useRouter();
  v$: Validation = useVuelidate();

  get firstError() {
    const errors = this.v$?.$errors;
    if (errors.length > 0)
      return errors[0]['$message'].toString().toLowerCase();
    return '';
  }

  async signUp() {
    if (this.v$.$invalid) return;
    this.isSignUpLoading = true;
    try {
      const userStore = useUserStore();
      userStore.registerNewUser(this.form)
      const { displayName } = await vxm.user.logIn({ ...this.form });
      await this.router.push({
        name: 'user',
        params: { displayName },
      });
    } catch (e) {
      console.error('could not create new user');
      console.error(e);
    }

    // this.isSignUpLoading = false;
  }

  async goToLogin() {
    await this.router.push('login');
  }
}
</script>
<template>
  <form class="app-view-port w-fit h-fit text-white" @submit.prevent="onSubmit">
    <div class="app-view-port">sign up</div>
    <div class="app-view-port">
      <label class="form-label" for="">display name</label>
      <input
        v-model="v$.form.displayName.$model"
        class="form-input"
        type="displayName"
      />
    </div>
    <div class="app-view-port">
      <label class="form-label" for="">first name</label>
      <input
        v-model="v$.form.firstName.$model"
        class="form-input"
        type="firstName"
        placeholder="optional"
      />
    </div>
    <div class="app-view-port">
      <label class="form-label" for="">last name</label>
      <input
        v-model="v$.form.lastName.$model"
        class="form-input"
        type="lastName"
        placeholder="optional"
      />
    </div>
    <div class="app-view-port">
      <label class="form-label" for="">email</label>
      <input v-model="v$.form.email.$model" class="form-input" type="email" />
    </div>
    <div class="app-view-port">
      <label class="form-label" for="">password</label>
      <input
        v-model="v$.form.password.$model"
        class="form-input"
        type="password"
      />
    </div>
    <div class="app-view-port">
      <label class="form-label" for="">confirm password</label>
      <input
        v-model="v$.form.passwordConfirmation.$model"
        class="form-input"
        type="password"
      />
    </div>
    <div v-if="v$.$errors?.length" class="input-errors app-view-port">
      <div class="error-msg">
        {{ firstError }}
      </div>
    </div>
    <div v-if="isSignUpLoading" class="app-view-port">
      <div class="loading-bar"></div>
    </div>
    <button
      class="app-view-port text-white hover:link"
      :disabled="v$.form.$invalid"
      @click="signUp()"
    >
      sign up
    </button>
    <button class="app-view-port text-white hover:link" @click="goToLogin()">
      login
    </button>
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

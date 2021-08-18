<template>
  <div>
    <Navbar />
    <div
      class="row center"
      style="height: 100%;"
    >
      <div class="flex lg4">
        <va-card>
          <va-card-title class="display-5">
            Welcome!
          </va-card-title>
          <va-card-content>
            <div class="clear" />
            <div class="center column">
              <p><b>Welcome to Photo App 2.0.</b></p>
              <div class="clear" />
              <p>
                Please, enter the system by <span
                  class="link"
                  @click="() => $router.push('/auth/login')"
                >log in</span>.
              </p>
              <div class="clear" />
              <p>
                If you don"t have an account, please <span
                  class="link"
                  @click="() => $router.push('/auth/signup')"
                >sign up</span>.
              </p>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from "./Navbar";
  export default {
    name: "MainPage",
    components: { Navbar }
  };
</script>
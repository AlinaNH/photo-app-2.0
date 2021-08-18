<template>
  <va-navbar
    color="primary"
    class="mb-2"
  >
    <template #left>
      <va-navbar-item>PHOTO APP 2.0</va-navbar-item>
    </template>
    <template #right>
      <div v-if="$route.path !== '/'">
        <div ref="logout">
          <va-navbar-item
            class="pointer"
            @click="handleClick"
          >
            Log Out
          </va-navbar-item>
        </div>
      </div>
    </template>
  </va-navbar>
</template>
<script>
import axios from "axios";
export default {
  name: "Navbar",
  methods: {
    handleClick: async function() {
      const config = {
        headers : {
          "Content-Type": "application/json",
          "authToken": localStorage.getItem("token")
        },
        responseType: "json"
      };
      try {
        const response = await axios.get(`${process.env.VUE_APP_BASE_API}/users/logout`, config);
        if (response.data.success) this.$router.push("/auth/login");
      } catch (err) {
        this.$router.push("/auth/login");
      }
    }
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
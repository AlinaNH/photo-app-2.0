<template>
  <div
    class="row center"
    style="height: 100%;"
  >
    <div class="flex lg4">
      <va-card>
        <va-card-title class="display-5">
          {{ $route.params.type === "signup" ? "Sign Up" : "Log In" }}
        </va-card-title>
        <va-card-content>
          <va-input
            ref="email"
            v-model="email"
            class="mb-4"
            placeholder="Email"
            required
          />
          <va-input
            ref="password"
            v-model="password"
            class="mb-4"
            type="password"
            placeholder="Password"
            required
          />
          <div class="center">
            <va-button @click="handleClick">
              {{ $route.params.type === "signup" ? "Sign Up" : "Log In" }}
            </va-button>
          </div>
          <div class="clear" />
          <div class="center">
            {{ $route.params.type === "signup"
              ? "Do you have your own account already? Please, try to"
              : "Don\"t you have an account? Please, try to"
            }}&nbsp;
            <span
              class="link"
              @click="changeType"
            >
              {{ $route.params.type === "signup" ? "log in" : "sign up" }}.
            </span>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>
<script>
import validator from "validator";
import axios from "axios";
export default {
  name: "Entry",
  data () {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    changeType: function() {
      if (this.$route.params.type === "signup") this.$router.push("/entry/login");
      if (this.$route.params.type === "login") this.$router.push("/entry/signup");
    },
    isValid: function() {
      const isEmail = validator.isEmail(this.email);
      if (!isEmail) {
        this.$toast.show("Email is invalid.", {
          type: "error",
          duration: "4000"
        });
        return false;
      } else if (this.password.length <= 8) {
        this.$toast.show("Password should has at least 8 characters.", {
          type: "error",
          duration: "4000"  
        });
        return false;
      } else return true;
    },
    handleClick: function() {
        if (this.isValid()) {
          if (this.$route.params.type === "signup") this.signUp();
          if (this.$route.params.type === "login") this.logIn();
        }
    },
    signUp: async function() {
      const config = {
        headers : {
          "Content-Type": "application/json",
        },
        responseType: "json"
      };

      const data = {
        email: this.email,
        password: this.password
      };

      try {
        await axios.post("http://localhost:5000/users/register", data, config);
        this.$router.push("/entry/login");
      } catch (err) {
        this.$toast.show("Failed to sign up. Please, try again.", {
          type: "error",
          duration: "4000"
        });
      }
    },
    logIn: async function() {
      const config = {
        headers : {
          "Content-Type": "application/json",
        },
        responseType: "json"
      };

      const data = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await axios.post("http://localhost:5000/users/login", data, config);
        window.localStorage.setItem("token", response.data?.userData?.token);
        window.localStorage.setItem("userID", response.data?.userData?.userID);
        document.cookie = `authToken=${response.data?.userData?.token}`;
        this.$router.push("/upload");
      } catch (err) {
        this.$toast.show("Failed to log in. Please, try again.", {
          type: "error",
          duration: "4000"
        });
      }
    }
  }
};
</script>
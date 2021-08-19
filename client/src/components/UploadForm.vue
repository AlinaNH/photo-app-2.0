<template>
  <div>
    <Navbar />
    <div class="clear" />
    <div
      class="row center"
      style="height: 100%;"
    >
      <div class="flex lg6">
        <va-card>
          <va-card-title class="display-5">
            photo app 2.0
          </va-card-title>
          <va-card-content>Upload photo:</va-card-content>
          <form class="column center">
            <input
              id="image-input"
              ref="imageInput"
              name="image"
              type="file"
              class="hidden"
              @change="handleChange"
            >
            <label for="image-input">
              <div class="preview-container center">
                <div ref="icon">
                  <va-icon
                    name="download"
                    class="ml-4"
                  />
                </div>
                <img
                  ref="imagePreview"
                  src="#"
                  alt="Preview"
                  class="hidden image-preview"
                >
              </div>
            </label>
            <div class="clear" />
            <div class="center">
              <va-button
                :rounded="false"
                @click="handleClick"
              >
                Upload Image
              </va-button>
            </div>
          </form>
          <div class="clear" />
        </va-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Navbar from './Navbar';
export default {
  name: "UploadForm",
  components: { Navbar },
  mounted: async function () {
    const config = {
      headers : {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token')
      },
      responseType: 'json'
    };
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_API}/users/auth`, config);
      if (!response.data.isAuthenticated) this.$router.push('/auth/login');
    } catch (err) {
      this.$toast.show('Failed to log in. Please, try again.', {
        type: 'error'
      });
    }
  },
  methods: {
    handleClick: async function () {
      const imageInput = this.$refs.imageInput.files[0];
      const fd = new FormData();
  
      fd.append("image", imageInput);
      
      const config = {
        headers : {
          'Content-Type' : 'multipart/form-data',
          'authtoken': localStorage.getItem('token')
        },
        responseType: 'json'
      };
      try {
        await axios.post(`${process.env.VUE_APP_BASE_API}/img/upload`, fd, config);
        this.$router.push('/editing');
      } catch (err) {
        this.$toast.show('Oops, something went wrong!.', {
          type: 'error'
        });
      }
    },

    handleChange: function () {
      const imageInput = this.$refs.imageInput.files[0];
      const imagePreview = this.$refs.imagePreview;
      const icon = this.$refs.icon;
      if (imageInput) {
        imagePreview.src = URL.createObjectURL(imageInput);
        imagePreview.classList.add("visible");
        icon.classList.add("hidden");
      }
    }
  }
};
</script>
<style scoped>
.column {
  display: flex;
  flex-direction: column;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  background-color: lightgrey;
}

.image-preview {
  max-width: 340px;
}

@media screen and (max-width: 812px) {
  .preview-container {
    width: 375px;
    height: 150px;
  }

  .image-preview {
    max-width: 180px;
    max-height: 150px;
  }
}
</style>

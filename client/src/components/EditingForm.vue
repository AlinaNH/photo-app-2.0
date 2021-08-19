<template>
  <div>
    <Navbar />
    <div class="clear" />
    <div class="row center">
      <va-card class="flex margin20 preview-container">
        <va-card-title class="display-5">
          Photo Preview
        </va-card-title>
        <va-card-content class="center">
          <div ref="containerToSave">
            <div class="center preview">
              <img
                ref="output"
                src="#"
                class="hidden"
                name="image"
                @load="showSpinner"
              >
              <div class="forDOMToImgLibrary" />
              <img 
                ref="frame"
                src="#"
                class="hidden framePreview"
              >
            </div>
          </div>
          <div
            ref="spinner"
            class="spinner"
          >
            <va-icon
              name="autorenew"
              spin
              class="mr-2"
              size="7rem"
            />
          </div>
        </va-card-content>
      </va-card>
      <div class="column">
        <va-card class="flex margin20">
          <va-card-title class="display-5">
            Filters
          </va-card-title>
          <va-card-content
            class="scrolling-wrapper"
            @click="changeFilter"
          >
            <div class="scroll-card">
              <img 
                src="../../public/filter.jpg"
                class="optionPicture paris"
              >
              <figcaption class="title center">
                Paris
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/filter.jpg"
                class="optionPicture oslo"
              >
              <figcaption class="title center">
                Oslo
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/filter.jpg"
                class="optionPicture melbourne"
              >
              <figcaption class="title center">
                Melbourne
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/filter.jpg"
                class="optionPicture newyork"
              >
              <figcaption class="title center">
                New York
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/filter.jpg"
                class="optionPicture brooklyn"
              >
              <figcaption class="title center">
                Brooklyn
              </figcaption>
            </div>
          </va-card-content>
        </va-card>
        <va-card class="flex margin20">
          <va-card-title class="display-5">
            Frames
          </va-card-title>
          <va-card-content
            class="scrolling-wrapper"
            @click="changeFrame"
          >
            <div class="scroll-card">
              <img
                src="../../public/frames/frame1.png"
                class="optionPicture frame"
              >
              <figcaption class="title center">
                Night
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/frames/frame2.png"
                class="optionPicture frame"
              >
              <figcaption class="title center">
                Hearts
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/frames/frame3.png"
                class="optionPicture frame"
              >
              <figcaption class="title center">
                Star
              </figcaption>
            </div>
            <div class="scroll-card">
              <img 
                src="../../public/frames/frame4.png"
                class="optionPicture frame"
              >
              <figcaption class="title center">
                Birthday
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/frames/frame5.png"
                class="optionPicture frame"
              >
              <figcaption class="title center">
                Room
              </figcaption>
            </div>
            <div class="scroll-card">
              <img
                src="../../public/frames/frame6.png"
                class="optionPicture frame last"
              >
              <figcaption class="title center">
                None
              </figcaption>
            </div>
          </va-card-content>
        </va-card>
        <va-card class="flex margin20">
          <va-card-title class="display-5">
            Shapes
          </va-card-title>
          <va-card-content
            class="scrolling-wrapper"
            @click="changeShapes"
          >
            <div class="scroll-card">
              <div class="shape circle" />
              <figcaption class="title center">
                Circle
              </figcaption>
            </div>
            <div class="scroll-card">
              <div class="shape square" />
              <figcaption class="title center">
                Square
              </figcaption>
            </div>
            <div class="scroll-card">
              <div class="shape defaultOption" />
              <figcaption class="title center">
                None
              </figcaption>
            </div>
          </va-card-content>
        </va-card>
      </div>
    </div>
    <div class="clear" />
    <div class="center">
      <va-button
        :rounded="false"
        class="display-6"
        @click="handleClick"
      >
        Save and Print
      </va-button>
    </div>
    <div class="clear" />
  </div>
</template>
<script>
import axios from "axios";
import domtoimage from "dom-to-image";
import Navbar from './Navbar';
export default {
  name: "EditingForm",
  components: { Navbar },
  mounted: async function() {
    const configUserAuth = {
      headers : {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token')
      },
      responseType: 'json'
    };
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_API}/users/auth`, configUserAuth);
      if (!response.data.isAuthenticated) this.$router.push('/auth/login');
    } catch (err) {
      this.$toast.show('Failed to log in. Please, try again.', {
        type: 'error'
      });
    }

    const configImgLast = {
      headers : {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token')
      },
      responseType: 'json'
    };

    axios
      .get(`${process.env.VUE_APP_BASE_API}/img/last`, configImgLast)
      .then((response) => {
        const buffer = new Buffer.from(response.data.data.data).toString("base64");
        this.$refs.output.src = `data:image/png;base64,${buffer}`;
      });
  },
  methods: {
    showSpinner: function() {
      this.$refs.output.style.display = "flex";
      this.$refs.spinner.style.display = "none";
    },
    changeFilter: function(e) {
      const filters = ["paris", "oslo", "melbourne", "newyork", "brooklyn"];
      const filterClass = e.target.classList[1];
      const preview = this.$refs.output;

      if (filters.includes(filterClass)) {
        preview.classList = [];
        preview.classList.add(filterClass);
      }
    },
    changeFrame: function(e) {
      if (e.target.classList[1] === "frame") {
        const framePath = e.target.src;
        const frame = this.$refs.frame;
        const preview = this.$refs.output;

        frame.classList.remove("hidden");
        frame.src = framePath;
        frame.style.width = `${preview.width}px`;
        frame.style.height = `${preview.height}px`;
        frame.style.position = 'relative';
        frame.style.left = `-${preview.width}px`;
        frame.style.marginRight = `-${preview.width}px`;
        if ([...e.target.classList].includes("last")) {
          frame.src = "#";
          frame.classList.add("hidden");
        }
      }
    },
    changeShapes: function(e) {
      const preview = this.$refs.output;
      const cropType = e.target.classList[1];
      const width = preview.width;
      const height = preview.height;
      switch(cropType) {
        case "circle": {
          preview.style.clipPath = "circle(40%)";
          break;
        }
        case "square": {
          let insetVlue;
          if (width > height) {
            insetVlue = (width - height) / width / 2 * 100;
            preview.style.clipPath = `inset(0% ${insetVlue}%)`;
          } else {
            insetVlue = (height - width) / height / 2 * 100;
            preview.style.clipPath = `inset(${insetVlue}% 0%)`;
          }
          break;
        }
        case "defaultOption": {
          preview.style.clipPath = "none";
          break;
        }
      }
    },
    handleClick: async function() {
      try {
        const frame = this.$refs.frame;
        const container = this.$refs.containerToSave;
        const frameCopy = container.firstChild.querySelector('.framePreview');
        if (frame.src.slice(-1) === "#") {
          const hidden = container.firstChild.querySelector('.framePreview');
          hidden.remove();
        }
        
        const config = {
        headers : {
          'authtoken': localStorage.getItem('token')
        },
        responseType: 'json'
      };
        const dataUrl = await domtoimage.toPng(this.$refs.containerToSave);
        await axios.post(`${process.env.VUE_APP_BASE_API}/img/send`, { token: dataUrl }, config);

        if (!container.firstChild.contains(frameCopy)) {
          container.firstChild.appendChild(frameCopy);
        }

        this.$toast.show('The image was saved and sent to PhotoPrint Centre!', {
          type: 'success'
        });
      } catch (err) {
        this.$toast.show('Oops, something went wrong!.', {
          type: 'error'
        });
      }
    }
  }
};
</script>
<style scoped>
.margin20 {
  margin: 20px;
}

.preview-container {
  width: 600px;
  height: 600px;
}

.preview {
  height: 500px;
}

.preview img {
  max-width: 500px;
  background-repeat: no-repeat;
}

.spinner {
  display: flex;
  justify-content: center;
}

.optionPicture {
  max-width: 100px;
  height: 100px;
  margin: 10px;
}

.optionPicture:active {
  outline: 1px solid rgb(109, 109, 255);
}

.paris {
  filter: contrast(110%) brightness(110%) saturate(130%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px);
}

.oslo {
  filter: contrast(90%) brightness(110%) saturate(150%) sepia(0%) hue-rotate(-10deg) grayscale(0%) invert(0%) blur(0px);
}

.melbourne {
  filter: contrast(110%) brightness(160%) saturate(100%) sepia(30%) hue-rotate(350deg) grayscale(0%) invert(0%) blur(0px);
}

.newyork {
  filter: contrast(150%) brightness(100%) saturate(110%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px);
}

.brooklyn {
  filter: contrast(90%) brightness(110%) saturate(100%) sepia(0%) hue-rotate(0deg) grayscale(0%) invert(0%) blur(0px);
}

.circle {
  width: 70px;
  height: 70px;
  background-color: #34495e;
  border-radius: 50px;
  margin: 10px;
}

.circle:active {
  border: 1px solid rgb(109, 109, 255);
}

.square {
  width: 70px;
  height: 70px;
  background-color: #34495e;
  margin: 10px;
}

.square:active {
  border: 1px solid rgb(109, 109, 255);
}

.defaultOption {
  width: 70px;
  height: 70px;
  background-color: #7e9bb9;
  margin: 10px;
}

@media screen and (max-width: 812px) {
  .preview-container {
    height: 400px;
  }

  .preview {
    height: 300px;
  }

  .preview img {
    max-width: 100%;
  }

  .column {
    width: 100%;
  }
}
</style>

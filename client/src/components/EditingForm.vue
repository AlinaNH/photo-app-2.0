<template>
  <img ref='output' src='#' />
</template>
<script>
import axios from 'axios';
export default {
  name: "EditingForm",
  mounted() {
    axios
        .get('http://localhost:5000/getLast')
        .then((response) => {
          const buffer = new Buffer.from(response.data.data.data).toString("base64");
          this.$refs.output.src = "data:image/png;base64," + buffer;
        })
 },
}
</script>
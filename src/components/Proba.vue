<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Proba",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    getReponse() {
      const path = "http://127.0.0.1:5000/proba";
      axios
        .get(path)
        .then((res) => {
          console.log(res.data);
          this.msg = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getReponse();
  },
};
</script>


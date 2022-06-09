<template>
  <div class="jumbotron vertical-centar">
    <div class="container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boo
        tswatch@4.5.2/dist/lux/bootstrap.min.css"
        integrity="sha384-9+PGKSqjRdkeAU7Eu4nkJU8RFaH8ace
        8HGXnkiKMP9I9Te0GJ4/km3L1Z8tXigpG"
        crossorigin="anonymous"
      />
      <div class="row">
        <div class="col-sm-12">
          <p>RECEPTI</p>
          <hr />
          <br />
          <button type="button" class="btn btn-success" v-b-modal.recept-modal>
            Dodaj recept
          </button>
          <hr />

          <div
            class="card mb-3"
            v-for="(recept, index) in recepti"
            :key="index"
          >
            <h3 class="card-header">{{ recept.title }}</h3>
            <div class="card-body">
              <h5 class="card-subtitle text-muted">{{ recept.kuhar }}</h5>
            </div>

            <div class="card-body">
              <p class="card-text">
                {{ recept.opis }}
              </p>
            </div>
            <div class="card-footer text-muted">{{ recept.vrsta }}</div>
          </div>
        </div>
      </div>

      <b-modal
        ref="addReceptModal"
        id="recept-modal"
        title="Dodaj novi recept"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
          <b-form-group
            id="form-title-group"
            label="Title:"
            label-for="form-title-input"
          >
            <b-form-input
              id="form-title-input"
              type="text"
              v-model="addReceptForm.title"
              required
              placeholder="Naziv Recepta"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-vrsta-group"
            label="Vrsta:"
            label-for="form-vrsta-input"
          >
            <b-form-input
              id="form-vrsta-input"
              type="text"
              v-model="addReceptForm.vrsta"
              required
              placeholder="Koje vrste je vaše jelo"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-kuhar-group"
            label="Kuhar:"
            label-for="form-kuhar-input"
          >
            <b-form-input
              id="form-kuhar-input"
              type="text"
              v-model="addReceptForm.kuhar"
              required
              placeholder="Ime i Prezime"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-opis-group"
            label="Opis:"
            label-for="form-opis-input"
          >
            <b-form-input
              id="form-opis-input"
              type="text"
              v-model="addReceptForm.opis"
              required
              placeholder="opisite svoje jelo"
            >
            </b-form-input>
          </b-form-group>

          <button type="submit" variant="primary">Submit</button>
          <button type="reset" variant="primary">Reset</button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      recepti: [],
      addReceptForm: {
        title: "",
        vrsta: "",
        kuhar: "",
        opis: "",
      },
    };
  },

  methods: {
    getRecepti() {
      const path = "http://127.0.0.1:5000/recepti";
      axios
        .get(path)
        .then((res) => {
          this.recepti = res.data.recepti;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addRecept(payLoad) {
      const path = "http://127.0.0.1:5000/recepti";
      axios
        .post(path, payLoad)
        .then(() => {
          this.getRecepti();
        })
        .catch((err) => {
          console.error(err);
          this.getRecepti();
        });
    },

    initForm() {
      this.addReceptForm.title = "";
      this.addReceptForm.vrsta = "";
      this.addReceptForm.kuhar = "";
      this.addReceptForm.opis = "";
    },

    onSubmit(e) {
      e.preventDefault();
      this.$refs.addReceptModal.hide();
      const payLoad = {
        title: this.addReceptForm.title,
        vrsta: this.addReceptForm.vrsta,
        kuhar: this.addReceptForm.kuhar,
        opis: this.addReceptForm.opis,
      };
      this.addRecept(payLoad);
      this.initForm;
    },
    onReset(e) {
      e.preventDefault(), this.$refs.addReceptModal.hide();
      this.initForm();
    },
  },
  created() {
    this.getRecepti();
  },
};
</script>

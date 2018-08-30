responseFetch = response => {
  if (!response.ok) {
    throw Error(response.status);
  } else {
    return response.json();
  }
};

const app = new Vue({
  el: "#app",
  data: {
    yandexSourceLang: {},
    buttonClass: "button",
    yandexLang: "",
    yandexText: "",
    yandexResult: "",
    translateFrom: "",
    translateTo: "",
    formLoading: true
  },
  created() {
    this.translateFrom = "en";
    this.translateTo = "ru";
  },
  methods: {
    translate() {
      this.formLoading = false;
      this.yandexLang = this.translateFrom + "-" + this.translateTo;
      fetch(
        "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180830T015751Z.086151c8c24b9839.975644fa376940af82a85dc941091849c246182c&lang=" +
          this.yandexLang +
          "&text=" +
          this.yandexText
      )
        .then(responseFetch)
        .then(data => {
          this.yandexResult = data.text[0];
          this.formLoading = true;
        })
        .catch(error => {
          alert(error);
          this.formLoading = true;
        });
    }
  }
});

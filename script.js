
// Vue app
const vapp = Vue.createApp({
    data() {
        return {
            title: "Typing test",
            subtitle: "subtitle",

            words: [],
        }
    },

    created() {
        // grab a sufficiently large list of words from api
        // need to update this once I get my key
        let words_url = 'https://random-word-api.herokuapp.com/word?number=200';
        fetch(words_url)
            .then(response => response.json())
            .then(json => {
                if (json['error']) {
                    console.log(json['error']);
                }
                else {
                    this.words = json;
                }
            })
    },

    computed: {
        getNextWord: function () {
            return this.words[0];
        }
    },

    methods: {
        checkTypingBox(event) {
            if (event.currentTarget.value === this.words[0]) {
                this.words.shift();
                event.currentTarget.value = "";
            }
        }
    },
})

const vm = vapp.mount('#app');
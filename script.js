// change to determine how many words are grabbed
var word_count = 200;


// Vue app
const vapp = Vue.createApp({
    data() {
        return {
            title: "Typing test",
            subtitle: "How fast can you type?",

            words: [],
        }
    },

    created() {
        // grab a sufficiently large list of words from api
        // need to update this once I get my key
        let words_url = `https://random-word-api.herokuapp.com/word?number=${word_count}`;
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
            // make sure words is not empty
            if (this.words.length !== 0) {
                return this.words[0];
            }
            else {
                return "Words list is empty";
            }
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
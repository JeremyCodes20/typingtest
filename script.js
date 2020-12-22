// change to determine how many words are grabbed
const word_count = 200;
// change to determine how long the game lasts (milliseconds)
const game_length = 20000;

// Vue app
const vapp = Vue.createApp({
    data() {
        return {
            title: "Typing test",
            subtitle: "How fast can you type?",

            display_menu: true,
            playing: false,

            curr_player: 0,
            player_scores: [],

            words: [],
            words_index: 0,
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
            // begin the countdown when the first key is pressed
            if (!this.playing) {
                window.setTimeout(this.restoreMenu, game_length);
                this.playing = true;
            }
            if (event.currentTarget.value === this.words[0]) {
                // remove the current word from the words list
                this.words.shift();
                // increment player score
                this.player_scores[this.curr_player]++;
                // reset the text box
                event.currentTarget.value = "";
            }
        },

        restoreMenu() {
            // display the menu again increment the player index
            this.display_menu = true;
            this.playing = false;
            this.curr_player++;
        },

        playGame() {
            // display the typing box and add a new entry to the player_scores
            this.player_scores.push(0);
            this.display_menu = false;
        },

        wordsPerMin(words) {
            return words / (game_length / 60000);
        },
    },
})

const vm = vapp.mount('#app');
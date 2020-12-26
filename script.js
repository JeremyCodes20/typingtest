// function to shuffle array
function shuffleArray(array) {
    for (let i = (array.length - 1); i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

// Vue app
const vapp = Vue.createApp({
    data() {
        return {
            // change to determine how many words are grabbed
            word_count: 200,
            // change to determine how long the game lasts (milliseconds)
            game_length: 20000,

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
                return this.words[this.words_index];
            }
            else {
                return "Words list is empty";
            }
        },

        gameLenInSeconds: function () {
            return this.game_length / 1000;
        },
    },

    methods: {
        checkTypingBox(event) {
            // begin the countdown when the first key is pressed
            if (!this.playing) {
                window.setTimeout(this.restoreMenu, this.game_length);
                this.playing = true;
            }
            if (event.currentTarget.value === this.words[this.words_index]) {
                // increment player score
                this.player_scores[this.curr_player]++;
                // move to the next word;
                ++this.words_index;
                // reset the text box
                event.currentTarget.value = "";
            }
        },

        restoreMenu() {
            // display the menu again increment the player index
            this.display_menu = true;
            this.playing = false;
            this.curr_player++;
            this.words_index = 0;
        },

        playGame() {
            // randomize the words list
            shuffleArray(this.words);
            // display the typing box and add a new entry to the player_scores
            this.player_scores.push(0);
            this.display_menu = false;
        },

        wordsPerMin(words) {
            return words / (this.game_length / 60000);
        },
    },
})

const vm = vapp.mount('#app');
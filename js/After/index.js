const app = Vue.createApp({
    data() {
        return {
            todos: [
                {
                    content: "把項目做完",
                    complete: true,
                },
                {
                    content: "搞清楚v-for",
                    complete: false,
                },
                {
                    content: "看10分鐘的書",
                    complete: false,
                },
        ],
            books:["Javascript 基礎語法詳解","Vue 入門實戰","React 入門到精通"],
            showAnswer: false,
            countDown: 5,
            timer: null
        }
    },
    computed: {
        label(){
            return this.showAnswer ? "隱藏答案" + this.countDown : "顯示答案"
        }
    },
    methods: {
        toggleAnswer(){
            this.showAnswer = !this.showAnswer
        }
    },
    watch: {
        showAnswer(newVal,oldVal){
            if(newVal){
                this.countDown = 5;
                if(this.timer){
                    clearInterval(this.timer);
                    this.timer = null
                }
            }
            this.timer = setInterval(()=>{
                this.countDown -=1;
                if(this.countDown == 0){
                    this.showAnswer = false;
                    clearInterval(this.timer)
                }
            },1000)
        }
    }
})
app.mount("#app")


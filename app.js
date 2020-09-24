new Vue({
    el:'#app',
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        spacialCredits :3,
        healthCredits :3,
        logs :[]

    },
    methods:{
        start_game : function (){
            this.game_is_on =true

        },
        attack : function () {
            let point = Math.ceil( Math.random() * 10 )
            this.monster_heal -=point
            this.addToLog({ turn:'p', text:'OYUNCU ATAĞI(' + point + ')'})
            this.moster_attack()

        },
        spacial_attack :function () {                       
            let point = Math.ceil( Math.random() * 20 + 5 )
            this.monster_heal -=point
            this.addToLog({ turn:'p', text:'ÖZEL OYUNCU ATAĞI(' + point + ')'})
            this.moster_attack()


            this.spacialCredits--
        },
        heal_up :function () {
            let point = Math.ceil( Math.random() * 15 )
            this.addToLog({ turn:'p', text:'İLK YARDIM(' + point + ')'})

           this.player_heal += point
           this.healthCredits--
        },
        give_up: function () {
            this.player_heal = 0
            this.addToLog({ turn:'p', text:'OYUNCU PES ETTİ!!!'})
            if(confirm('Oyunus KAYBETTİN :(. Tekrar Oynamak ister misin?')){
                this.player_heal=100
                this.monster_heal =100 
                this.spacialCredits = 3
                this.healthCredits = 3
             }

        },
        moster_attack : function () {
            let point = Math.ceil( Math.random() * 15 )
            this.player_heal -=point
            this.addToLog({ turn:'m', text:'CANAVAR ATAĞI(' + point + ')'})

            
        },
        addToLog : function (log) {
            this.logs.push(log)
            
        }
    },
    watch :{
        player_heal :function (value) {
            if(value<=0){
                this.player_heal=0;
                if(confirm('Oyunus KAYBETTİN :(. Tekrar Oynamak ister misin?')){
                   this.player_heal=100
                   this.monster_heal =100 
                   this.spacialCredits = 3
                   this.healthCredits = 3
                   this.logs = []
                }


            }else if(value>=100) {
                this.player_heal=100;
            }
            
        },
        monster_heal :function (value) {
            if(value<=0){
                this.monster_heal=0;
                if(confirm('Oyunus KAZANDIN :). Tekrar Oynamak ister misin?')){
                    this.player_heal=100
                    this.monster_heal =100 
                    this.spacialCredits = 3
                    this.healthCredits = 3
                    this.logs = []
                 }

            }
        },
        spacialCredits :function (value) {
            if(value<=0){
                this.spacialCredits=0;
              
            }
            
        },
        healthCredits :function (value) {
            if(value<=0){
                this.healthCredits=0;
            }
            
        }

    }
})
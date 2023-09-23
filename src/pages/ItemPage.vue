<script setup>
import { computed } from 'vue';
import { games } from '/src/data.js';
import router from '/src/modules/router.js';


const id = computed(() => {
    const id = router.currentRoute.value.params['id'];
    return id;
});
const game = computed(() => {
    const game = games.find(x => x.name == id.value);
    return game;
});
</script>
<template>
    <div class="p-5 mt-5 mobile-div-parents">
        <div class="flex w-max m-auto gap-4">
            <p class="font-bold text-white text-3xl text-center cursor-default slide center-slide mobile-game-name hover:scale-105 text-mobile duration-500 disable-hover">
                {{ game.name }}
            </p> 
            <button class="flex gap-2 w-6 mt-2" @click="copyUrl(game.name)">
                <img title="Скопировать ссылку на игру" src="../img/icon/chain-for-links-svgrepo-com.png" alt="">
                <div v-if="isCopied" class="text-white text-lg whitespace-nowrap message-link cursor-default">Ссылка скопирована!</div>
            </button>
        </div> 
        <div v-if="isCopied" class="text-white text-lg whitespace-nowrap message-link-mobile cursor-default w-max m-auto">Ссылка скопирована!</div>
        <div class="grid mobile-div-game grid-cols-2 w-full mt-5 px-10">
            <div style="width: inherit;" class="flex pr-5 mobile-img">
                <section style="width: inherit;" class="bg-transparent">
                    <div class="container">
                        <div class="carousel">
                            <input type="radio" name="slides" checked="checked" id="slide-1">
                            <input type="radio" name="slides" id="slide-2">
                            <input type="radio" name="slides" id="slide-3">
                            <ul class="carousel__slides">
                                <li class="carousel__slide h-auto">
                                    <figure class="h-full">
                                        <div class="h-full">
                                            <img class="m-auto mb-auto mt-0 rounded-lg w-full h-full" :src="game.img" alt="">
                                        </div>
                                    </figure>
                                </li>
                                <li class="carousel__slide">
                                    <figure>
                                        <div>
                                            <img class="m-auto mb-auto mt-0 rounded-lg w-full" :src="game.carousel1" alt="">
                                        </div>
                                    </figure>
                                </li>
                                <li class="carousel__slide">
                                    <figure>
                                        <div>
                                            <img class="m-auto mb-auto mt-0 rounded-lg w-full" :src="game.carousel2" alt="">
                                        </div>
                                    </figure>
                                </li>
                            </ul>    
                            <ul class="carousel__thumbnails my-4 gap-4">
                                <li class="w-1/3">
                                    <label class="h-full block" for="slide-1"><img class="rounded-lg h-full w-full" :src="game.img" alt=""></label>
                                </li>
                                <li class="w-1/3">
                                    <label class="h-full block" for="slide-2"><img class="rounded-lg h-full w-full" :src="game.carousel1" alt=""></label>
                                </li>
                                <li class="w-1/3">
                                    <label class="h-full block" for="slide-3"><img class="rounded-lg h-full w-full" :src="game.carousel2" alt=""></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <div class="bg-zinc-900 h-max p-5 rounded-lg hover:scale-105 transition duration-500 disable-hover">
                <p class="text-white text-xl mobile-game-text cursor-default">
                    {{ game.description }} 
                </p>
            </div>
        </div>
        <div class="grid mobile-div-game grid-cols-2 w-full p-3 cursor-default border-b border-slate-100">
            <div>
                <h1 class="m-auto mobile-equirements w-max text-white text-2xl slide center-slide cursor-default hover:scale-105 text-mobile duration-500 disable-hover">
                    Информация о игре
                </h1>
                <ul class="ml-10 mt-5 mobile-game-spec ">
                    <li class="mb-2 text-xl text-white slide left-slide w-max hover:scale-105 text-mobile duration-500 disable-hover" v-for="(info, key) in game.info">{{ key }} - {{ info }}</li>
                </ul>
            </div>
            <div class="mobile-contaier-equirements">
                <h1 class="m-auto mobile-equirements w-max text-white text-2xl slide center-slide cursor-default hover:scale-105 text-mobile duration-500 disable-hover">
                    Минимальные системные требования
                </h1>
                <ul class="ml-10 mt-5 mobile-game-spec">
                    <li class="mb-2 text-xl text-white slide left-slide w-max hover:scale-105 text-mobile duration-500 disable-hover" v-for="(systemRequirements, key) in game.systemRequirements">{{ key }} : {{ systemRequirements }}</li>
                </ul>
            </div>
        </div>

        

        <div class="my-5">
            <div class="m-auto w-max mt-5 flex gap-4 btn-mobile-gamepage">
                <router-link :to="{ path: `/download/${game.name}`}">
                    <button @click="scrollToPosition" type="button"  class="inline-block text-black bg-white rounded h-10 px-3 bg-primary uppercase leading-normal font-semibold hover:scale-105 transition duration-500 disable-hover" data-te-ripple-init data-te-ripple-color="light">
                        Скачать торрент файл
                    </button>
                </router-link>
                <p class="text-xl text-white w-max self-center hover:scale-105 text-mobile duration-500 disable-hover">
                    <a class="h-max slide left-slide flex" target="_blank" :href="game.steamlink">Ссылка на игру в Steam</a>
                </p>
            </div>
        </div>

        <div id="yandex_rtb_R-A-2510674-2"></div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            currentUrl: '',
            isCopied: false,
        };
    },

    methods: {
        copyUrl(gameName) {
            const url = window.location.href;
            const modifiedUrl = `${gameName} на linegame: ${url}`;
            navigator.clipboard.writeText(modifiedUrl);
            this.isCopied = true;
            setTimeout(() => {
                this.isCopied = false;
            }, 1500);
        },

        scrollToPosition() {
            if (this.isScrolling) {
            return; 
            }
            const top = window.innerWidth <= 768 ? 0 : 850;
            this.isScrolling = true;
            window.scrollTo({
            top: top,
            behavior: 'smooth'
            });
            setTimeout(() => {
            this.isScrolling = false;
            }, 50);
        },
    },

    mounted() {
        this.currentUrl = window.location.href;

        const script = document.createElement("script");
        script.src = "https://yandex.ru/ads/system/context.js";
        script.async = true;
        document.head.appendChild(script);

        window.yaContextCb = window.yaContextCb || [];
        window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            blockId: "R-A-2510674-1",
            renderTo: "yandex_rtb_R-A-2510674-2",
        });
        });
    },

    watch: {
        $route(to, from) {
            this.currentUrl = window.location.href;
        },
    },
}
</script>

<style>

.message-link-mobile {
    display: none;
}

.message-link {
    display: block;
}

section {
    background: #F4F4F4;
    padding:  0;
}

.container {
    max-width: 1044px;
    margin: 0 auto;
    padding: 0;
}

.carousel {
    display: block;
    text-align: left;
    position: relative;
    
    > input {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        width: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        top: 400px;
        
        
        &:nth-of-type(3):checked ~ .carousel__slides .carousel__slide:first-of-type { margin-left: -200%; }
        &:nth-of-type(2):checked ~ .carousel__slides .carousel__slide:first-of-type { margin-left: -100%; }
        &:nth-of-type(1):checked ~ .carousel__slides .carousel__slide:first-of-type { margin-left: 0%; }
        
        &:nth-of-type(1):checked ~ .carousel__thumbnails li:nth-of-type(1) { box-shadow: 0px 0px 0px 2px rgb(241 245 249 ); border-radius: 0.5rem}
        &:nth-of-type(2):checked ~ .carousel__thumbnails li:nth-of-type(2) { box-shadow: 0px 0px 0px 2px rgb(241 245 249 ); border-radius: 0.5rem}
        &:nth-of-type(3):checked ~ .carousel__thumbnails li:nth-of-type(3) { box-shadow: 0px 0px 0px 2px rgb(241 245 249 ); border-radius: 0.5rem}
        
    }
}

.carousel__slides {
    position: relative;
    z-index: 1;
    padding: 0;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    display: flex;
}

.carousel__slide {
    position: relative;
    display: block;
    flex: 1 0 100%;
    width: 100%;
    overflow: hidden;
    transition: all 300ms ease-out;
    box-sizing: border-box;
    white-space: normal;

    .credit {
        margin-top: 1rem;
        color: rgba(0, 0, 0, 0.5);
        display: block;        
    }
    
    &.scrollable {
        overflow-y: scroll;
    }
}

.carousel__thumbnails {
    list-style: none;
    padding: 0;
    display: flex;
    
    
    
    li {        
        flex: 1 1 auto;
        max-width: calc((100% / 6) - 20px);  
        margin: 0 10px;
        transition: all 300ms ease-in-out;
    }
    
    label {
        display: block;
        
        
                  
        &:hover,
        &:focus {
            cursor: pointer;
            
            img {
                box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.25);
                transition: all 300ms ease-in-out;
            }
        }
    }
    
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}


.mobile-div-parents {
    padding-bottom: 0;
}

@media screen and (max-device-width:900px) {

    .message-link-mobile {
        display: block;
    }

    .message-link {
        display: none;
    }

    .url-link-game {
        white-space: normal;
        word-break: break-all;
        max-width: 290px;
        font-size: 14px;
        padding: 5px 14px 5px 14px;
    }

    .btn-mobile-gamepage {
        display: block;
    }

    .disable-hover:hover {
        transform: none !important;
    }

    .text-mobile-parent {
        width: auto !important;
    }

    .text-mobile {
        margin: auto;
    }

    .mobile-div-game {
        display: block;
        margin-top: 10px;
        padding: 0;
    }
    
    .slide::after {
        width: 0;
    }

    .mobile-img {
        padding: 0;
    }
    
    .mobile-game-text {
        font-size: 1.1rem;
    }
    
    .mobile-game-name {
        width: 100%;
    }

    .mobile-equirements {
        width: 100%;
        font-size: 1.4rem;
        margin-top: 8px;
        text-align: center;
    }
   

    .mobile-game-spec {
        margin-left: 0;
    }
     
    .mobile-game-spec li {
        font-size: 1rem;
        width: 100%;
    }

    .mobile-contaier-equirements {
        margin-top: 20px;
    }

    .mobile-div-parents {
        padding: 0 20px 0 20px;
    }
}
</style>
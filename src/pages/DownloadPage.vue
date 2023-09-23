<script setup>
import { computed, ref } from 'vue';
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
    <div style="height: 100%;">
        <div class="bg-zinc-900 my-6 w-max m-auto download-block-main p-5 rounded-lg">

            <div class="w-full m-auto mb-3">
                <p class="font-bold text-white text-2xl w-auto h-auto whitespace-normal text-center cursor-default">
                    Скачать - 
                </p>
                <p class="font-bold text-white text-2xl w-auto h-auto whitespace-normal text-center cursor-default">
                    {{game.name}}
                </p> 
            </div> 

            <div class="mb-3">
                <img :src="game.img" alt="">
            </div>

            <div class="text-white text-xl text-download-spec whitespace-normal cursor-default mb-3">
                <p class="mb-2 overflow-mobile">
                    Имя файла - {{ game.file.slice(8) }}
                </p>

                <p class="overflow-mobile">
                    Тип файла - Торрент файл (.torrent).
                </p>
            </div>

            <div class="m-auto w-max text-xl">
                <div v-if="time > 0">
                    <h1 class="text-white text-timer">Кнопка появится через: {{ time }} секунд(ы)</h1>
                </div>
                <div v-else>
                    <a :href="game.file" :download="game.file" class="inline-block text-black text-base bg-white rounded p-2 h-10 px-3 bg-primary uppercase leading-normal font-semibold hover:scale-105 transition duration-500 disable-hover" >Скачать игру</a>
                </div>
            </div>
        </div>
        <div id="yandex_rtb_R-A-2510674-1"></div>
    </div>
  </template>

<script>

export default {
  data() {
    return {
      time: 5,
    };
  },
  methods: {
    startTimer() {
      setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
    },
  },
  mounted() {
    this.startTimer();
    const script = document.createElement("script");
    script.src = "https://yandex.ru/ads/system/context.js";
    script.async = true;
    document.head.appendChild(script);

    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: "R-A-2510674-1",
        renderTo: "yandex_rtb_R-A-2510674-1",
      });
    });
  },
};
</script>

<style>

.download-block-main {
    min-height: 450px;
    max-width: 500px;
}

.text-download-name {
    max-width: 450px;
}

@media screen and (max-device-width:900px) {

    .overflow-mobile {
        overflow-y: scroll;
        white-space: nowrap;
        padding-bottom: 4px;
    }

    .download-block-main {
        min-height: 420px;
        max-width: 90%;
        margin-top: 88px;
    }

    .text-download-name {
        max-width: 300px;
        font-size: 22px;
    }

    .text-download-spec {
        font-size: 17px;
    }

    .text-timer {
        font-size: 16px;
    }

}
</style>
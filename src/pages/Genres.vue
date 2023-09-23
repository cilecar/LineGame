<script setup>
import { games, genres } from '../data.js';
import { computed, watch, ref } from 'vue';
import router from '/src/modules/router.js';
const id = computed(() => {
  return router.currentRoute.value.params['id'];
});
const genre = computed(() => {
  return genres.find(x => x.name == id.value);
});
const actionGames = ref([])

watch(genre, (newValue,) => {
  actionGames.value = games.filter(x => x.genres.includes(newValue.title))
},
  {
    "immediate": true
  })
</script>

<template>
    <div>
      <h6 class="font-bold mobile-home-text text-white flex hover:scale-105 text-mobile duration-500 text-3xl text-center w-max m-auto mt-5 cursor-default -mb-11">
        {{ genre.title }}
      </h6>

      <div class="toggle-card flex w-max ml-auto mr-6 mb-2 bg-zinc-900 p-3 rounded-lg gap-3">
        <img class="w-7" src="../img/grid-card.svg" alt="">
        <label class="label" >
          <div class="toggle">
            <input class="toggle-state" type="checkbox" name="check"  @click.="toggleDivs" />
            <div class="indicator"></div>
          </div>
        </label >
        <img class="w-9" src="../img/horizontal-card.svg" alt="">
      </div>
      
      <div class="grid-cols-4 mx-3 gap-4 grid mobile-div-card" v-if="showFirst">
          <div v-for="(game) in actionGames.slice(0, gamesPerPage)" :key="game.id">
            <div class="m-1 rounded-lg">
                <div :style="{ maxHeight: game.showDescription ? '2400px' : '620px' }" class="block mobile-card rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <router-link :to="{ name: 'Game', params: { id: game.name } }">
                    <img @click="scrollToPositionBtn()" class="rounded-t-lg h-64 hover:scale-105 transition duration-500 disable-hover cursor-pointer img-mobile" :src="game.img" />
                  </router-link>
                  <div class="p-6 bg-zinc-900 rounded-b-lg">
                    <h5 class="mb-2 mobile-game-name text-xl font-medium leading-tight break-words text-white text-center w-full pb-1 cursor-default hover:scale-105 transition duration-500 disable-hover">
                      {{game.name}}
                    </h5>
                    <p style="min-height: 150px;" class="mb-4 game-description text-base text-white break-words scroll-bar cursor-default" :style="{ maxHeight: game.showDescription ? '2000px' : '150px' }">
                      {{ game.description }}
                    </p>
                    <button class="read-more -mt-5 mb-2 text-lg" v-if="!game.showDescription" @click="toggleDescription(game)">Раскрыть описание... </button>
                    <router-link :to="{ name: 'Game', params: { id: game.name } }">
                      <button @click="scrollToPositionBtn()" type="button" class="inline-block text-black bg-white rounded uppercase leading-normal w-full h-9 font-semibold hover:scale-105 transition duration-500 disable-hover">
                        Перейти к игре
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
          </div>
      </div>

      <div class="mx-5 mobile-div-card" v-else>
          <div v-for="(game) in actionGames.slice(0, gamesPerPage)" :key="game.id">
              <div class="m-1 mb-5 rounded-lg" >
                  <div class="grid grid-card rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                      <img @click="scrollToPositionBtn()" class="w-full h-full rounded-l-lg hover:scale-105 transition duration-500 cursor-pointer" :src="game.img" :to="{ name: 'Game', params: { id: game.name } }"/>
                      <div class="p-6 bg-zinc-900 rounded-r-lg">
                          <h5 class="mb-2 text-xl font-medium w-max m-auto text-white text-center pb-1 cursor-default hover:scale-105 transition duration-500">
                              {{game.name}}
                          </h5>
                          <p class="mb-4 text-base text-white overflow-y-auto break-words h-64 scroll-bar cursor-default">
                              {{ game.description }}
                          </p>
                          <router-link :to="{ name: 'Game', params: { id: game.name } }">
                            <button @click="scrollToPositionBtn()" type="button" class="mt-auto inline-block text-black bg-white rounded uppercase leading-normal w-full h-9 font-semibold hover:scale-105 transition duration-500"  >
                              Перейти к игре
                            </button>
                          </router-link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <div v-if="showFirst" class="w-max m-auto mt-6">
      <button v-if="actionGames.length > gamesPerPage" @click="showMore" class="mt-auto inline-block text-black w-full px-4 bg-white rounded uppercase leading-normal h-9 font-semibold hover:scale-105 transition duration-500 disable-hover">
        Показать еще
      </button>
    </div>
</template>

<script>

export default {
  data() {
    return {
      showFirst: true,
      gamesPerPage: 12
    };
  },
  methods: {
    toggleDivs() {
      this.showFirst = !this.showFirst;
      },
      showMore() {
        this.gamesPerPage += 12;
      },
      scrollToPositionBtn() {
      let topPosition;

      if (window.innerWidth <= 900) {
        topPosition = 0;
      } else {
        topPosition = 850;
      }

      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      });
    },

    toggleDescription(game) {
      game.showDescription = !game.showDescription;
    },
  },
  computed: {
    reversedItems() {
      return this.games.slice().reverse();
    },
  },
};

</script>

<style>

.label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #394a56;
}


.toggle {
  isolation: isolate;
  position: relative;
  height: 30px;
  width: 60px;
  border-radius: 15px;
  overflow: hidden;
  background-color: black;
}

.toggle-state {
  display: none;
}

.indicator {
  height: 100%;
  width: 200%;
  background: #ecf0f3;
  border-radius: 15px;
  transform: translate3d(-75%, 0, 0);
  transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
}

.toggle-state:checked ~ .indicator {
  transform: translate3d(25%, 0, 0);
}

.grid-card {
  grid-template-columns: 40% 60%;
}

@media screen and (max-device-width:900px) {

  .mobile-game-name {
    max-width: 290px;
  }

  .toggle-card {
    display: none;
  }

  .mobile-div-card {
    grid-template-columns: none;
  }

  .mobile-home-text {
    margin-bottom: 10px;
  }
}
</style>
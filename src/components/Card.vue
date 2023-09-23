<script setup>
import { games as sourceGames } from '/src/data.js';
import router from '../modules/router';
import { ref } from 'vue';
</script>

<template>
    <div>
      <h6 class="font-bold mobile-home-text text-white flex hover:scale-105 text-mobile duration-500 disable-hover text-3xl text-center w-max m-auto mt-5 cursor-default -mb-11">
        Каталог игр
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
        <div v-for="game in displayedGames" :key="game.id">
          <div class="m-1 rounded-lg">
            <div :style="{ maxHeight: game.showDescription ? '2000px' : '550px' }" class="block mobile-card rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <router-link :to="{ name: 'Game', params: { id: game.name } }">
                <img @click="scrollToPositionBtn()" class="rounded-t-lg h-64 hover:scale-105 transition duration-500 disable-hover cursor-pointer img-mobile" :src="game.img" />
              </router-link>
              <div class="p-6 bg-zinc-900 rounded-b-lg">
                <h5 class="mb-2 mobile-game-name text-xl font-medium overflow-hidden whitespace-nowrap overflow-ellipsis h-8 leading-tight text-white text-center w-full pb-1 cursor-default hover:scale-105 transition duration-500 disable-hover">
                  {{game.name}}
                </h5>
                <p class="mb-4 game-description text-base text-white break-words scroll-bar cursor-default" :style="{ maxHeight: game.showDescription ? '2000px' : '150px' }">
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
          <div v-for="game in displayedGames" :key="game.id">
              <div class="m-1 mb-5 rounded-lg">
                  <div class="grid-flow-row grid-cols-3 grid mobile-card rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                    <router-link :to="{ name: 'Game', params: { id: game.name } }">
                      <img @click="scrollToPositionBtn()" style="height: 350px; width: 700px;" class="rounded-l-lg hover:scale-105 transition duration-500 disable-hover cursor-pointer" :src="game.img"/>
                    </router-link>
                      <div class="p-6 bg-zinc-900 rounded-r-lg col-span-2">
                          <h5 class="mb-2 text-xl font-medium w-max m-auto text-white text-center pb-1 cursor-default hover:scale-105 transition duration-500 disable-hover">
                              {{game.name}}
                          </h5>
                          <p style="height: 210px;" class="mb-4 text-base text-white overflow-y-auto break-words scroll-bar cursor-default">
                              {{ game.description }}
                          </p>
                          <router-link :to="{ name: 'Game', params: { id: game.name } }">
                            <button @click="scrollToPositionBtn()" type="button" class="mt-auto inline-block text-black bg-white rounded uppercase leading-normal w-full h-9 font-semibold hover:scale-105 transition duration-500 disable-hover">
                              Перейти к игре
                            </button>
                          </router-link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <div class="w-max m-auto mt-6" v-if="displayedGamesCount < games.length">
      <button class="mt-auto inline-block text-black w-full px-4 bg-white rounded uppercase leading-normal h-9 font-semibold hover:scale-105 transition duration-500 disable-hover" @click="loadMoreGames()">
        Показать ещё
      </button>
    </div>
    <div v-else>
      
  </div>
  <router-view></router-view>
</template>


<script>
export default {
  data() {
    return {
      showFirst: true,
      games: [],
      displayedGames: [], 
      loadFirstGames: false,
      displayedGamesCount: 12, 
    };
  },
  methods: {
    toggleDivs() {
      this.showFirst = !this.showFirst;
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
    
    loadMoreGames() {
      this.displayedGamesCount += 12;
      const lastDisplayedIndex = this.displayedGames.length - 1;
      const additionalGames = this.games.slice(lastDisplayedIndex + 1, lastDisplayedIndex + 13);
      this.displayedGames.push(...additionalGames);

      if (this.displayedGames.length === this.games.length) {
        this.displayedGamesCount = this.displayedGames.length;
      }
    },
  },
  mounted() {
    const reversedGames = [...sourceGames].sort((a, b) => b.id - a.id); 
    this.games = reversedGames;
    this.displayedGames = reversedGames.slice(0, this.displayedGamesCount); 
    this.loadFirstGames = true;
  }
};

</script>
  


<style>

.game-description {
  overflow-y: auto;
}

.read-more {
  display: none;
}

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


/* Mobile */

@media screen and (max-device-width:900px) {

  .mobile-game-name {
    max-width: 290px;
  }
  
  .game-description {
  transition: max-height 2.5s ease; 
  overflow: hidden; 
  
  }

  .read-more {
  display: block;
  color: white;
  }

  .disable-hover:hover {
   transform: none !important;
  }

  .img-mobile {
    width: -webkit-fill-available;
  }

  .mobile-div-card {
    grid-template-columns: none;
  }

  .toggle-card {
    display: none;
  }

  .mobile-home-text {
    margin-bottom: 10px;
  }
}
</style>
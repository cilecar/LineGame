<script setup>
import { games, genres } from '../data';
import '@splidejs/vue-splide/css';
</script>
<template>
  <div class="flex main-div" ref="panel" :class="{ 'is-open': isPanelOpen || !isWideScreen, 'is-wide-screen': isWideScreen }">
    <div v-if="isPanelOpen" class="transition duration-500 mobile-panel-main">
      <div class="text-white mobile mobile-panel bg-zinc-900 p-5 mt-1 ml-1 rounded-md w-64">
         <a href="/"><img class="w-max mb-4 logo-mobile hover:scale-105 transition duration-500" src="../img/white-logo.png" alt=""></a>
        <h1 class="text-2xl mobile-panel-genres mb-3 cursor-default w-max hover:scale-105 duration-500">Жанры</h1>
        <div class="transfer ml-3 mobile-panel-genres" >
          <router-link class="text-lg hover:scale-105 duration-500 cursor-pointer" @click.prevent="scrollToPosition" v-for="genre in genres" :key="genre.id" :to="{ name: 'Genre', params: { id: genre.name } }">
            {{ genre.title }}
          </router-link>
        </div>

        <h1 class="text-2xl games-pc mb-3 cursor-default w-max hover:scale-105 duration-500">Случайные игры</h1>
        <div class="transfer ml-3 games-pc" >
          <router-link class="text-lg hover:scale-105 duration-500 cursor-pointer" @click.prevent="scrollToPosition" v-for="game in randomGames" :key="game.id" :to="{ name: 'Game', params: { id: game.name } }">
            {{ game.name }}
          </router-link>
        </div>
      </div>
    </div> 

    <div class="h-16 px-4 bg-zinc-900 rounded-md mx-1 w-full inline-block relative main-mobile-search mt-1 z-50">
      <div>
        <div class="mt-3 flex">
          <button class="menu-toggler hidden text-white mt-auto mb-auto mr-3" v-if="!isWideScreen" @click="togglePanel"><img class="w-7" src="../img/icon/menu-svgrepo-com.png" alt=""></button>
          <div class="relative mobile-search w-2/3">
            <input style="color: white;" type="text" @focus="toggleResult" @blur="toggleResult" autocomplete="none" placeholder="Найти..."
              class=" peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 "
              id="exampleFormControlInput1" v-model="search" />
          </div>
            <div class="ml-auto flex gap-4">
              <a class="social-icon" href="https://t.me/linegame_ru" target="_blank">
                <img class="w-10 h-9 hover:scale-105 duration-500" src="../img/icon/telegram-svgrepo-com.png" alt="">
              </a>
            </div>
        </div>
      </div>

      <div>
        <div class="mobile-result-search overflow-y-auto max-h-64 w-2/6 rounded-lg scroll-bar mr-1 -mt-3 absolute left-0 z-10 border border-slate-100">
          <ul class="bg-zinc-900 rounded-lg p-2">
            <h1 class="text-slate-100 text-xl border-b border-slate-100">Результат поиска:</h1>
            <li class="flex" v-for="item in searchHandler" :key="item.id">
              <div class="justify-between flex w-full" v-if="searchHandler.length > 0">
                <router-link class="w-full mt-2 text-lg text-slate-100 cursor-pointer" @click.prevent="scrollToPosition" :to="{ name: 'Game', params: { id: item.name } }">
                  {{ item.name }}
                </router-link>
              </div>
              <div class="justify-between flex w-full" v-else>
                Ничего не найдено.
              </div>
            </li>
            <div>
              <div v-if="searchHandler.length > 0"></div>
              <div class="w-full mt-2 text-lg text-slate-100 cursor-default" v-else>
                Ничего не найдено
              </div>
            </div>
          </ul>
        </div>

        <div @click="scrollToPosition" class="mt-7 -ml-1 gap-4 grid grid-cols-4 genre-mobile">
          <div v-for="genre in genres" :key="genre.id">
            <router-link class="w-max text-lg text-white text-center hover:scale-105 duration-500 cursor-pointer" :to="{ name: 'Genre', params: { id: genre.name } }">
              <div class="bg-zinc-900 py-10 rounded-lg justify-center hover:scale-105 transition duration-500">
                <img class="w-28 m-auto mb-4" :src="genre.img">
                <p class="text-2xl">{{ genre.title }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="scroll-to-top w-max" v-show="isVisible" @click="scrollToTop">
    <img class="w-12 bg-white" style="border-radius: 100%;" src="../img/icon/up-arrow-svgrepo-com.png" alt="">
  </div>

</template>

<script>

export default {

  name: "App",
  data() {
    return {
      isWideScreen: false,
      search: "",
      data: [],
      games,
      isPanelOpen: false,
      shouldPanelClose: false,
      isVisible: false
    }
  },

  methods: {
    checkScreenWidth() {
      this.isWideScreen = window.matchMedia('(min-width: 768px)').matches;
    },
    
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
      this.shouldPanelClose = false;
    },
    closePanel(event) {
      const el = document.querySelector('.panel');
      if (!this.shouldPanelClose) {
        this.shouldPanelClose = true;
        return;
      }
      if (window.innerWidth < 768 || (el && !el.contains(event.target))) {
        this.isPanelOpen = false;
      }
    },
    
    scrollToPosition() {
    if (this.isScrolling) {
      return; 
    }
    const top = window.innerWidth <= 768 ? 0 : 820;
    this.isScrolling = true;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
    setTimeout(() => {
      this.isScrolling = false;
    }, 50);
  },

    handleScroll() {
      this.isVisible = window.scrollY > 600;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    randomGames() {
      const randomIndexes = [];
      while (randomIndexes.length < 13) {
        const randomIndex = Math.floor(Math.random() * this.games.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      return this.games.filter((game, index) => randomIndexes.includes(index));
    },
    searchHandler() {
      return this.data.filter(Element => {
        return Element.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  mounted() {
    window.addEventListener('resize', this.checkScreenWidth)
    this.checkScreenWidth()
    document.body.addEventListener('click', this.closePanel);
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth)
    document.body.removeEventListener('click', this.closePanel);
  },

  created() {
    this.data = games;
    if (window.matchMedia('(min-width: 768px)').matches) {
    this.isPanelOpen = true;
  }
  },

  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression]();
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
 
};



function toggleResult() {
  const mobile = document.querySelector('.mobile-result-search');
  if (mobile.style.top === '85px') {
    setTimeout(() => {
    mobile.style.top = '-300px';
  }, 100);
    
  } else {
    mobile.style.top = '85px';
  }
}


</script>

<style>

.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 10px;
  z-index: 99;
  cursor: pointer;
}

.mobile-panel {
  min-height: 830px;
}

.mobile-panel-genres {
  display: none;
}

.mobile-result-search {
  top: -300px;
  transition: top 0.3s ease;
  margin: 0 10px 0 10px;
  width: 50%;
  margin-top: -15px;
}

.main-div {
  height: auto;
}

.menu-toggler {
  display: none;
}

.transfer a{
  display: block;
  margin-top: 12px;
}


.scroll-bar::-webkit-scrollbar {
  width: 4px;
}

.scroll-bar::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: rgb(150, 150, 150);
  border-radius: 10px;
}


@media screen and (max-device-width:900px) {

  .logo-mobile {
    width: 128px;
  }

  .social-icon {
    display: none;
  }

  .games-pc {
    display: none;
  }

  .mobile-panel-genres {
    display: block;
  }

  .main-mobile-search {
    margin-left: 0px;
    position: fixed;
    border-radius: 0;
    margin-top: 0;
  }

  .main-div {
    height: auto;
    margin-bottom: 70px;
  }

  .menu-toggler {
    display: flex;
  }

  .mobile-panel {
    transition: left 0.5s ease;
    position: fixed;
    min-height: auto;
    z-index: 20;
    top: 60px;
    width: 230px;
    padding: 0 10px 20px 10px;
    margin-left: 0;
    border-radius: 0 0 10px;

  }

  .mobile-panel a {
    width: auto;
  }

  .genre-mobile {
    display: none;
  }

  .mobile-search {
    width: 100%;
  }

  .mobile-result-search {
    width: 95% !important;
    border: 0;
  }
}

</style>
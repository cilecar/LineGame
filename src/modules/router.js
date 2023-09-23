import { createRouter, createWebHashHistory } from 'vue-router'
import GenrePage from '/src/pages/Genres.vue'
import ItemPage from '/src/pages/ItemPage.vue'
import HomePage from '/src/pages/HomePage.vue'
import DownloadPage from '/src/pages/DownloadPage.vue'

const router = createRouter({
    routes: [
        {
            path: '/', 
            name: '',
            component: HomePage
        },
        {
            path: '/Games/:id',
            name: 'Game',
            component: ItemPage
        },
        {
            path: '/Genres/:id',
            name: 'Genre',
            component: GenrePage
        },
        {
            path: '/Download/:id',
            name: 'Download',
            component: DownloadPage
        },
        
    ],
    history: createWebHashHistory(),
});



export default router;
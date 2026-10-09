<script setup>
</script>
<template>
    <footer class="bg-zinc-900  p-8 text-center text-white shadow-xl mt-6">

        <div class="mb-4 text-xl">
            <img class="w-32 m-auto hover:scale-105 transition duration-500" src="../img/white-logo.png" alt="">
        </div>

        <h6 class="text-white mobile-footer-text flex mb-4 text-xl cursor-default w-max m-auto hover:scale-105 transition duration-500">
            <p class="mr-2">Почта для связи -</p> <p class="cursor-text">linegame.website@gmail.com</p>
        </h6>

        <h6 class="text-white mobile-footer-text text-xl cursor-default w-max m-auto hover:scale-105 transition duration-500">
            Copyright © 2023 - Все права защищены
        </h6>
    </footer>
</template>

<style>
    @import url(https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css);

    @media screen and (max-width: 900px) {

        .mobile-footer-text {
            display: block;
            font-size: 16px;
        }

    }
</style>
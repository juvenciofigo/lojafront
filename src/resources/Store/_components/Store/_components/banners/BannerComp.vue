<template>
    <div class="flex-1 body2 w-full h-full overflow-hidden">
        <div
            class="carousel w-full h-full relative"
            v-if="items && items.length > 0">
            <div
                class="list w-full h-full relative"
                ref="slider">
                <template
                    v-for="(item, index) in items"
                    :key="index">
                    <div class="item w-full h-full flex flex-row p-2">
                        <div class="absolute right-0 top-[20%] flex flex-col gap-10 mr-2 xl:mr-8 xl:flex content bg-y">
                            <div class="title text-[2.5rem] text-orange-400">{{ item.title }}</div>
                            <div class="des text-xl">
                                {{ item.des }}
                            </div>
                            <div class="buttons">
                                <button class="px-15 py-1 rounded-md bg-white">Ver Mais</button>
                            </div>
                        </div>

                        <img
                            :src="item.image"
                            class="object-contain" />
                    </div>
                </template>
            </div>

            <!-- <div class="arrows absolute right-28 bottom-6 flex flex-row gap-4">
                <button
                    class="px-15 py-1 rounded-md bg-white"
                    @click="showSlider('prev')"
                    id="prev">
                    Prev
                </button>
                <button
                    class="px-15 py-1 rounded-md bg-white"
                    @click="showSlider('next')"
                    id="next">
                    Next
                </button>
            </div> -->

            <!-- <div 
                class="time absolute top-4 bg-red-500"
                ref="time"></div> -->
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";

    const items = [
        {
            image: "images/consal.png",
            title: "Transforme sua experiência digital",
            des: "Explore nossa coleção de smartphones de última geração",
        },
    ];

    const slider = ref(null);
    // const time = ref(null);

    let interval;
    let autoSlideInterval = 5000;

    function showSlider(direction) {
        if (!slider.value) return;
        const items = slider.value.children;
        if (direction === "next") {
            slider.value.appendChild(items[0]);
        } else if (direction === "prev") {
            slider.value.insertBefore(items[items.length - 1], items[0]);
        }
    }

    function startAutoSlide() {
        if (items.length > 1) {
            interval = setInterval(() => {
                showSlider("next");
            }, autoSlideInterval);
        }
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    onMounted(() => {
        startAutoSlide();
        slider.value.addEventListener("mouseenter", stopAutoSlide);
        slider.value.addEventListener("mouseleave", startAutoSlide);
    });
</script>
<style scoped>
    /* carousel */

    .carousel .list .item {
        width: 100%;
        height: 100%;
    }

    .item {
        width: 150px;
        height: 220px;
        flex-shrink: 0;
        position: relative;
    }

    /* animation text in first item */

    .carousel .list .item:nth-child(1) .content .title,
    .carousel .list .item:nth-child(1) .content .des,
    .carousel .list .item:nth-child(1) .content .buttons {
        transform: translateY(50px);
        filter: blur(20px);
        opacity: 0;
        animation: showContent 0.5s 1s linear 1 forwards;
    }

    @keyframes showContent {
        to {
            transform: translateY(0px);
            filter: blur(0px);
            opacity: 1;
        }
    }
    .carousel .list .item:nth-child(1) .content .title {
        animation-delay: 1.2s !important;
    }
    .carousel .list .item:nth-child(1) .content .des {
        animation-delay: 1.6s !important;
    }
    .carousel .list .item:nth-child(1) .content .buttons {
        animation-delay: 1.8s !important;
    }

    /* create animation when next click */

    .carousel.next .list .item:nth-child(1) img {
        width: 150px;
        height: 220px;
        position: absolute;
        bottom: 50px;
        left: 50%;
        animation: showImage 0.5s linear 1 forwards;
    }
    @keyframes showImage {
        to {
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .carousel.next .item:nth-last-child(1) {
        overflow: hidden;
        animation: showThumbnail 0.5s linear 1 forwards;
    }
    .carousel.prev .list .item {
        z-index: 100;
    }
    @keyframes showThumbnail {
        from {
            width: 0;
            opacity: 0;
        }
    }
    .carousel.next {
        animation: effectNext 0.5s linear 1 forwards;
    }

    @keyframes effectNext {
        from {
            transform: translateX(150px);
        }
    }

    /* running time */

    .carousel .time {
        position: absolute;
        z-index: 1000;
        width: 0%;
        height: 3px;
        background-color: #f1683a;
        left: 0;
        top: 0;
    }

    .carousel.next .time,
    .carousel.prev .time {
        animation: runningTime 3s linear 1 forwards;
    }

    @keyframes runningTime {
        from {
            width: 100%;
        }
        to {
            width: 0;
        }
    }

    /* prev click */

    .carousel.prev .list .item:nth-child(2) {
        z-index: 2;
    }

    .carousel.prev .list .item:nth-child(2) {
        animation: outFrame 0.5s linear 1 forwards;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    @keyframes outFrame {
        to {
            width: 150px;
            height: 220px;
            bottom: 50px;
            left: 50%;
        }
    }

    .carousel.prev .item:nth-child(1) {
        overflow: hidden;
        opacity: 0;
        animation: showThumbnail 0.5s linear 1 forwards;
    }

    .carousel.next .arrows button,
    .carousel.prev .arrows button {
        pointer-events: none;
    }

    .carousel.prev .list .item:nth-child(2) .content .title,
    .carousel.prev .list .item:nth-child(2) .content .des,
    .carousel.prev .list .item:nth-child(2) .content .buttons {
        animation: contentOut 1.5s linear 1 forwards !important;
    }

    @keyframes contentOut {
        to {
            transform: translateY(-150px);
            filter: blur(20px);
            opacity: 0;
        }
    }
</style>

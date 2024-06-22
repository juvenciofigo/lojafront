<template>
    <div>
        <div class="profile/buttons p-4 flex flex-col gap-2">
            <div class="name/photo flex flex-row gap-4">
                <Avatar class="photo w-20 xl:w-28 h-20 xl:h-28">
                    <AvatarImage
                        src="https://github.com/radix-vue.png"
                        alt="foto de perfil" />
                    <AvatarFallback>{{ user.firstName.split(" ")[0] }}</AvatarFallback>
                </Avatar>
                <div class="name text-3xl text-muted-foreground font-semibold">
                    <span>{{ user.firstName.split(" ")[0] }} </span> <span>{{ user.lastName.split(" ")[0] }}</span>
                </div>
            </div>
            <!-- end name/photo -->
            <div class="buttons flex-row justify-around hidden">
                <button class="favorite flex flex-col items-center">
                    <Heart class="h-14 w-14" />
                    <p class="text-lg">Favorite</p>
                </button>
                <button class="favorite flex flex-col items-center">
                    <Heart class="h-14 w-14" />
                    <p class="text-lg">Favorite</p>
                </button>
                <button class="favorite flex flex-col items-center">
                    <Heart class="h-14 w-14" />
                    <p class="text-lg">Favorite</p>
                </button>
            </div>
            <!-- end buttons -->
        </div>
        <!-- end profile/buttons -->

        <div class="informations">
            <ul>
                {#each people as person}
                <li class="group/item hover:bg-slate-100 ...">
                    image
                    <div>
                        <a href="{person.url}">{person.name}</a>
                        <p>{person.title}</p>
                    </div>
                    <a
                        class="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..."
                        href="tel:{person.phone}">
                        <span class="group-hover/edit:text-gray-700 ...">Call</span>
                        <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500 ...">
                            <!-- ... -->
                        </svg>
                    </a>
                </li>
                {/each}
            </ul>
        </div>
    </div>
</template>
<script setup>
    import { computed } from "vue";
    import { Heart } from "lucide-vue-next";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));
</script>
<style lang=""></style>

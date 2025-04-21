<template>
    <footer class="flex flex-col text-center bg-accent_2 items-center justify-center">
        <p>© 2024 {{ storeName }} Criado por</p>
        <a
            target="_blank"
            href="https://www.linkedin.com/in/juvenciofigocumbane"
            >Juvencio Figo</a
        >
        <div class="text-[9px] self-end">
            <a
                target="_blank"
                href="https://lordicon.com/"
                >Icons by Lordicon.com</a
            >
        </div>
    </footer>
</template>

<script setup>
    import { useStore } from "vuex";
    import { computed } from "vue";
    const store = useStore();
    const storeName = computed(() => store.state.storeName);
</script>
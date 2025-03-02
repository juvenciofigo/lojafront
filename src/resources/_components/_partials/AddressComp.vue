<template lang="">
    <div class="flex flex-col gap-2 text-center">
        <div>{{ address.firstName.split(" ").at(0) }} {{ address.lastName.split(" ").at(-1) }}</div>
        <div>
            <div>{{ address.neighborhood }}</div>
            <div>{{ address.city }}</div>
            <div>{{ address.province }}</div>
            <div>{{ address.country }}</div>
        </div>
    </div>
    <div class="flex flex-row gap-3">
        <button
            @click.stop="confirmDelete(address._id)"
            class="p-[3px] rounded-md shadow-[#969191] shadow-sm">
            <PencilLine
                color="green"
                size="20" />
        </button>
        <button
            class="p-[3px] rounded-md shadow-[#969191] shadow-sm">
            <Trash2
                color="red"
                size="20" />
        </button>
    </div>

    <DialogConfirmation
        :dialog="showDialog"
        tileConfirmation="Deleção de Endereço"
        textConfirmation="Você tem certeza de que deseja deletar este endereço?"
        positiveConfirmation="Deletar"
        @update:dialog="showDialog = $event"
        @cancelar="handleCancel"
        @confirmar="handleConfirm" />
</template>
<script setup>
    import { defineProps, ref } from "vue";
    import { useStore } from "vuex";

    import { Trash2, PencilLine } from "lucide-vue-next";
    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";

    defineProps({
        address: { type: Object, required: true },
    });

    const showDialog = ref(false);
    const deleteIndex = ref(null);
    const store = useStore();

    function confirmDelete(index) {
        deleteIndex.value = index;
        showDialog.value = true;
    }

    const handleCancel = () => {
        showDialog.value = false;
    };

    const handleConfirm = () => {
        deleteAddress();
    };

    async function deleteAddress() {
        if (deleteIndex.value !== null) {
            await store.dispatch("deleteAddress", deleteIndex.value);
            await store.dispatch("addresses");
            showDialog.value = false;
            deleteIndex.value = null;
        }
    }
</script>

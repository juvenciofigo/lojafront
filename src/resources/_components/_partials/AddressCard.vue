<template lang="">
    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1 text-center text-gray-700">
            <div class="font-medium text-lg">{{ address.firstName.split(" ").at(0) }} {{ address.lastName.split(" ").at(-1) }}</div>
            <div class="text-sm">
                <div>{{ address.complete }}</div>
                <div>{{ address.city }}</div>
                <div>{{ address.province }}</div>
            </div>
        </div>

        <div class="flex flex-row gap-2">
            <button class="p-[4px] rounded-md bg-green-100 hover:bg-green-200 shadow-xs transition">
                <PencilLine
                    color="#059669"
                    size="15" />
            </button>
            <button
                @click.stop="confirmDelete(address._id)"
                class="p-[4px] rounded-md bg-red-100 hover:bg-red-200 shadow-xs transition">
                <Trash2
                    color="#dc2626"
                    size="15" />
            </button>
        </div>
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
            store.commit("addresses/CLEAR_ADDRESS");
            await store.dispatch("addresses/deleteAddress", deleteIndex.value);
            showDialog.value = false;
            deleteIndex.value = null;
        }
    }
</script>

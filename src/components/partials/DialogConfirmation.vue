<template>
    <v-dialog
        v-model="dialogView"
        close-on-back
        transition="fab-transition"
        @update:modelValue="onDialogUpdate">
        <v-card class="sm:max-w-[500px] sm:mx-auto">
            <v-card-title class="text-h5"> {{ tileConfirmation }}</v-card-title>
            <v-card-text>{{ textConfirmation }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="onCancel">
                    Cancelar
                </v-btn>
                <v-btn
                    color="red darken-1"
                    text
                    @click="onConfirm">
                    {{ positiveConfirmation }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch } from "vue";

    const props = defineProps({
        dialog: Boolean,
        tileConfirmation: String,
        textConfirmation: String,
        positiveConfirmation: String,
    });

    const emit = defineEmits(["cancelar", "confirmar"]);

    const dialogView = ref(props.dialog);

    watch(
        () => props.dialog,
        (newVal) => {
            dialogView.value = newVal;
        }
    );

    const onDialogUpdate = (value) => {
        emit("update:dialog", value);
    };

    const onCancel = () => {
        emit("cancelar");
        dialogView.value = false;
    };

    const onConfirm = () => {
        emit("confirmar");
        dialogView.value = false;
    };
</script>

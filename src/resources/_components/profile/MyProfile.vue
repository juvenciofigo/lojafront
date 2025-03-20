<template>
    <div
        v-loading="loading"
        >
        <div v-if="mySelf && !loading">
            <!-- Perfil e Botões -->
            <div class="profile-buttons p-4 flex flex-col gap-2">
                <div class="name-photo flex flex-row gap-4 items-center">
                    <Avatar class="photo w-20 lg:w-28 h-20 lg:h-28">
                        <AvatarImage
                            src="https://github.com/radix-vue.png"
                            alt="foto de perfil" />
                        <AvatarFallback>{{ mySelf.firstName.split(" ")[0] }}</AvatarFallback>
                    </Avatar>
                    <div class="name text-3xl text-muted-foreground font-semibold">
                        <span>{{ mySelf.firstName.split(" ")[0] }}</span>
                        <span>{{ mySelf.lastName.split(" ").at(-1) }}</span>
                    </div>
                </div>
                <div class="buttons flex-row justify-around hidden">
                    <button class="favorite flex flex-col items-center">
                        <Heart class="h-14 w-14" />
                        <p class="text-lg">Favorite</p>
                    </button>
                    <!-- Repetido para exemplo, pode ser ajustado conforme necessário -->
                </div>
            </div>

            <!-- Informações Pessoais -->
            <div class="informations border p-3 m-3 rounded-md">
                <div class="flex flex-row justify-between items-center">
                    <h2 class="font-semibold text-lg">Informações pessoais</h2>
                    <el-button
                        @click="modifyDialog = !modifyDialog"
                        class="mr-5"
                        size="small"
                        :icon="Edit">
                        Modificar
                    </el-button>
                </div>
                <hr class="my-3" />
                <div class="flex flex-row">
                    <div class="grid sm:grid-cols-2 gap-3 flex-1">
                        <div>
                            <p class="font-semibold mb-1">Nome:</p>
                            <p>{{ mySelf.firstName }}</p>
                        </div>
                        <div>
                            <p class="font-semibold mb-1">Apelido:</p>
                            <p>{{ mySelf.lastName }}</p>
                        </div>
                        <div>
                            <p class="font-semibold mb-1">Email:</p>
                            <p>{{ mySelf.email }}</p>
                        </div>
                        <div v-if="mySelf.cell">
                            <p class="font-semibold mb-1">Telefone:</p>
                            <p>{{ mySelf.cell }}</p>
                        </div>
                        <div>
                            <p class="font-semibold mb-1">Criado em:</p>
                            <p>{{ formatDate(mySelf.createdAt) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Diálogo de Modificação -->
            <el-dialog
                v-model="modifyDialog"
                max-width="800px"
                class="bg-transparent"
                :show-close="false"
                align-center
                destroy-on-close>
                <div class="informations border p-3 m-3 rounded-md bg-white">
                    <h2 class="font-semibold text-lg">Informações pessoais</h2>
                    <hr class="my-3" />
                    <div
                        class="flex flex-row"
                        v-if="mySelf">
                        <div class="grid sm:grid-cols-2 gap-3 flex-1">
                            <div>
                                <p class="font-semibold mb-1">Nome:</p>
                                <el-input
                                    v-model="firstName.value.value"
                                    placeholder="Nome" />
                                <span class="error-message">{{ firstName.errorMessage.value }}</span>
                            </div>
                            <div>
                                <p class="font-semibold mb-1">Apelido:</p>
                                <el-input
                                    v-model="lastName.value.value"
                                    placeholder="Apelido" />
                                <span class="error-message">{{ lastName.errorMessage.value }}</span>
                            </div>
                            <div>
                                <p class="font-semibold mb-1">Email:</p>
                                <el-input
                                    v-model="email.value.value"
                                    placeholder="Email" />
                                <span class="error-message">{{ email.errorMessage.value }}</span>
                            </div>
                            <div v-if="mySelf.cell">
                                <p class="font-semibold mb-1">Telefone:</p>
                                <el-input
                                    v-model="cell.value.value"
                                    placeholder="Nr de telefone" />
                                <span class="error-message">{{ cell.errorMessage.value }}</span>
                            </div>
                        </div>
                    </div>
                    <el-button
                        @click="submit"
                        class="mt-3"
                        size="small"
                        :icon="Edit"
                        :loading="loadbtn">
                        Modificar
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
    import { computed, onBeforeMount, ref } from "vue";
    import { Heart } from "lucide-vue-next";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Edit } from "@element-plus/icons-vue";
    import { formatDate } from "@/util/functions";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore();
    const route = useRoute();

    // Campos do formulário
    const firstName = useField("firstName");
    const lastName = useField("lastName");
    const email = useField("email");
    const cell = useField("cell");

    const loadbtn = ref(false);
    const modifyDialog = ref(false);
    const loading = ref(true);

    // Validação do formulário
    const { handleSubmit: handleSignUpSubmit } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                email: z.string({ message: "Campo obrigatório" }).email({ message: "E-mail inválido" }),
                cell: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
                firstName: z.string({ message: "Campo obrigatório" }).regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                lastName: z.string({ message: "Campo obrigatório" }).regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
            })
        ),
    });

    const submit = handleSignUpSubmit(
        async (values) => {
            loadbtn.value = true;
            await store.dispatch("profile/updateMyProfile", values);
            loadbtn.value = false;
            modifyDialog.value = false;
        },
        () => {
            loadbtn.value = false;
        }
    );

    const mySelf = computed(() => store.state.profile.mySelf);

    onBeforeMount(() => {
        store.dispatch("profile/myProfile", { id: route.params.user });
        loading.value = false;
    });
</script>

<template>
    <div
        v-if="mySelf"
        class="">
        <div class="profile/buttons p-4 flex flex-col gap-2">
            <div class="name/photo flex flex-row gap-4">
                <Avatar class="photo w-20 lg:w-28 h-20 lg:h-28">
                    <AvatarImage
                        src="https://github.com/radix-vue.png"
                        alt="foto de perfil" />
                    <AvatarFallback>{{ mySelf.firstName.split(" ").at(0) }}</AvatarFallback>
                </Avatar>
                <div class="name text-3xl text-muted-foreground font-semibold">
                    <span>{{ mySelf.firstName.split(" ").at(0) }} </span> <span>{{ mySelf.lastName.split(" ").at(-1) }}</span>
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

        <div class="informations border p-3 m-3 rounded-md">
            <div class="flex flex-row justify-between items-center">
                <h2 class="font-semibold text-lg">Informações pessoais</h2>
                <el-button
                    @click="modifyDialog = !modifyDialog"
                    class="mr-5"
                    size="small"
                    :icon="Edit"
                    >Modificar</el-button
                >
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
                        <p class="font-semibold mb-1">Email</p>
                        <p>{{ mySelf.email }}</p>
                    </div>
                    <div v-if="mySelf.cell">
                        <p class="font-semibold mb-1">Email</p>
                        <p>{{ mySelf.cell }}</p>
                    </div>
                    <div>
                        <p class="font-semibold mb-1">Criado em:</p>
                        <p>{{ formatDate(mySelf.createdAt) }}</p>
                    </div>
                </div>
            </div>

            <!-- 
            createdAt: 
            "2024-09-10T23:50:05.150Z"
            customer: {
                        _id: '674a542bfda2d5c699cd0ecf', 
                        user: '66e0db2c9b7712215ff0bc4f', 
                        firstName: 'Juvencio Figo', 
                        lastName: 'Cumbane', 
                        email: 'juvenciofigo@gmail.com', 
                        firstName: "Juvencio Figo",
                        lastName:"Cumbane",
                        updatedAt:"2025-03-15T20:56:51.177Z",
                        user:"66e0db2c9b7712215ff0bc4f"
                        }
            email: "juvenciofigo@gmail.com"
            firstName: "Juvencio Figo"
            lastName: "Cumbane"
            updatedAt: "2024-11-29T23:54:20.313Z"
             -->
        </div>

        <el-dialog
            :close-on-press-escape="true"
            v-model="modify"
            width="100%"
            class="bg-transparent"
            :show-close="false"
            align-center
            destroy-on-close
            center>
            <div class="informations border p-3 m-3 rounded-md bg-white">
                <h2 class="font-semibold text-lg">Informações pessoais</h2>

                <hr class="my-3" />
                <div class="flex flex-row">
                    <div class="grid sm:grid-cols-2 gap-3 flex-1">
                        <div>
                            <p class="font-semibold mb-1">Nome:</p>
                            <div>
                                <el-input
                                    :value="mySelf.firstName"
                                    type="text"
                                    autocomplete="name"
                                    v-model="firstName"
                                    placeholder="Apelido" />
                                <span class="error-message">{{ firstName.errorMessage.value }}</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold mb-1">Apelido:</p>
                            <div>
                                <el-input
                                    type="text"
                                    autocomplete="name"
                                    :value="mySelf.lastName"
                                    v-model="lastName"
                                    placeholder="Apelido" />
                                <span class="error-message">{{ lastName.errorMessage.value }}</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold mb-1">Email</p>
                            <div>
                                <el-input
                                    type="email"
                                    autocomplete="email"
                                    :value="mySelf.email"
                                    v-model="email"
                                    placeholder="Email" />
                                <span class="error-message">{{ email.errorMessage.value }}</span>
                            </div>
                        </div>
                        <div v-if="mySelf.cell">
                            <p class="font-semibold mb-1">Email</p>
                            <div>
                                <el-input
                                    type="tel"
                                    autocomplete="tel"
                                    :value="`${mySelf.cell ? mySelf.cell : ''}`"
                                    v-mode="cell"
                                    placeholder="Nr de telefone" />
                                <span class="error-message">{{ cell.errorMessage.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <el-button
                    :click="submit()"
                    class="mr-5"
                    size="small"
                    :icon="Edit"
                    >Modificar</el-button
                >
            </div>
        </el-dialog>
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

    const firstName = useField("firstName");
    const lastName = useField("lastName");
    const email = useField("email");
    const cell = useField("cell");

    const loadbtn = ref(false);
    const modifyDialog = ref(false);

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
        async (value) => {
            loadbtn.value = true;
            await store.dispatch("updateMyProfile",value);
            loadbtn.value = false;
            modifyDialog.value = false;
        },
        () => {
            loadbtn.value = false;
        }
    );

    const mySelf = computed(() => store.getters.mySelf);
    onBeforeMount(() => {
        store.dispatch("MyProfile", { id: route.params.user });
    });
</script>

<template lang="">
    <div class="flex flex-col md:flex-row gap-2 justify-center p-1">
        <div class="flex flex-col lg:w-[700px] gap-1">
            <div class="card">
                <div class="">
                    <div class="overflow-auto flex flex-col gap-1">
                        <el-table
                            stripe
                            border
                            max-height="400"
                            fit
                            element-loading-text="Processando"
                            style="width: max-content"
                            size="small"
                            show-header
                            :data="order.cart">
                            <el-table-column
                                align="center"
                                width="300"
                                label="Produto">
                                <template #default="scope">
                                    <button class="flex flex-row justify-center items-center gap-2">
                                        <el-image
                                            style="width: 60px; height: 60px; border-radius: 5px"
                                            :src="scope.row.picture"
                                            alt="Imagem do Produto">
                                            <template #placeholder>
                                                <el-skeleton-item
                                                    animeted
                                                    variant="image"
                                                    style="width: 60px; height: 60px" />
                                            </template>
                                            <template #error>
                                                <div class="image-slot h-full flex justify-center items-center w-full">
                                                    <el-icon><icon-picture /></el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                        <span class="font-semibold">{{ scope.row.product }}</span>
                                    </button>
                                </template>
                            </el-table-column>

                            <el-table-column
                                header-align="center"
                                width="110"
                                align="center"
                                label="Entrega">
                                <template #default="scope">
                                    <span>{{ scope.row.deliveryEstimate?.estimatedTime }} </span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                align="center"
                                label="Espec.">
                                <template #default="scope">
                                    <div class="text-[12px] leading-[15px]">
                                        <div
                                            class="color whitespace-nowrap"
                                            v-if="scope.row.variation && scope.row.variation.color">
                                            <span> Cor: </span>
                                            <span class="font-normal">{{ scope.row.variation.color.variationValue }}</span>
                                        </div>
                                        <div
                                            class="size whitespace-nowrap"
                                            v-if="scope.row.variation && scope.row.variation.size">
                                            <span>Tamanho: </span>
                                            <span class="font-normal">{{ scope.row.variation.size.variationValue }}</span>
                                        </div>
                                        <div
                                            class="material whitespace-nowrap"
                                            v-if="scope.row.variation && scope.row.variation.material">
                                            <span>Material: </span>
                                            <span class="font-normal">{{ scope.row.variation.material.variationValue }}</span>
                                        </div>
                                        <div
                                            class="model whitespace-nowrap"
                                            v-if="scope.row.variation && scope.row.variation.model">
                                            <span>Modelo: </span>
                                            <span class="font-normal">{{ scope.row.variation.model.variationValue }}</span>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                align="center"
                                width="65"
                                prop="quantity"
                                label="Quant." />

                            <el-table-column
                                align="center"
                                width="100"
                                label="Preço unit."
                                :formatter="(row) => formatCurrency(row.itemPrice)">
                            </el-table-column>

                            <el-table-column
                                align="center"
                                label="Subtotal"
                                :formatter="(row) => formatCurrency(row.subtotal)">
                            </el-table-column>
                        </el-table>

                        <div class="shadow-md rounded-md text-center w-full md:max-w-[410px] flex flex-col gap-6 bg-white">
                            <el-descriptions
                                title=""
                                direction="horizontal"
                                :column="1"
                                :size="5"
                                border>
                                <el-descriptions-item label="Sub Total:">{{ formatCurrency(order.payment.totalProductsPrice) }}</el-descriptions-item>
                                <el-descriptions-item label="Taxa de envio:">{{ formatCurrency(order.delivery.cost) }}</el-descriptions-item>
                                <!-- <el-descriptions-item label="Iva:">incluso</el-descriptions-item> -->
                                <el-descriptions-item label="Total pago:">{{ formatCurrency(order.payment.amount) }}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                </div>
            </div>
            <!--end card-->

            <div class="card">
                <div class="p-4">
                    <div class="flex flex-row justify-between">
                        <h5 class="whitespace-nowrap">Order Status</h5>
                        <div class="mt-2 mt-sm-0 flex-row flex-wrap flex justify-end gap-2 w-max">
                            <button
                                v-if="order.payment.status !== `Pago`"
                                class="bg-green-500 text-green-100 active:text-green-500 duration-500 active:bg-green-100 p-1 rounded-md w-max"
                                @click="makePayment(order.payment.status, order._id, order.payment.amount)">
                                Fazer pagamento
                            </button>
                            <button class="bg-blue-100 text-blue-500 active:text-blue-100 duration-500 active:bg-blue-500 p-1 rounded-md w-max">Mudar Endereço</button>

                            <button
                                v-if="order.payment.status !== `Pago`"
                                class="text-red-500 bg-red-100 active:text-red-100 active:bg-red-500 duration-500 p-1 rounded-md">
                                Cancelar Pedido
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="p-8">
                    <div class="profile-timeline">
                        <div
                            class="accordion accordion-flush"
                            id="accordionFlushExample">
                            <v-timeline
                                align="start"
                                hide-opposite
                                dot-color="teal-lighten-3"
                                side="end">
                                <v-timeline-item
                                    hide-opposite
                                    :dot-color="order.orderRegistration.createdAt ? `teal-lighten-3` : `teal-black`"
                                    size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">Pedido realizado</strong>
                                        <div>
                                            <div class="text-caption mb-2">{{ formatDate(order.orderRegistration.createdAt) }}</div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item
                                    hide-opposite
                                    :dot-color="order.payment.status === `Pago` ? `teal-lighten-3` : `teal-black`"
                                    size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">Pagamento realizado em realizado</strong>
                                        <div>
                                            <div
                                                class="text-caption mb-2"
                                                v-if="order.payment.paymentMethod">
                                                {{ formatDate(order.payment.createdAt) }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item
                                    hide-opposite
                                    :dot-color="order.orderRegistration.packagedAt ? `teal-lighten-3` : `teal-black`"
                                    size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">Embalando</strong>
                                        <div>
                                            <div
                                                class="text-caption mb-2"
                                                v-if="order.orderRegistration.packagedAt">
                                                {{ formatDate(order.orderRegistration.packagedAt) }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item
                                    hide-opposite
                                    :dot-color="order.orderRegistration.deliverydAt ? `teal-lighten-3` : `teal-black`"
                                    size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">Entregue</strong>
                                        <div>
                                            <div
                                                class="text-caption mb-2"
                                                v-if="order.orderRegistration.deliverydAt">
                                                {{ formatDate(order.orderRegistration.deliverydAt) }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item
                                    hide-opposite
                                    :dot-color="order.orderRegistration.canceledAt ? `teal-lighten-3` : `teal-black`"
                                    size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">Cancelado</strong>
                                        <div>
                                            <div
                                                class="text-caption mb-2"
                                                v-if="order.orderRegistration.canceledAt">
                                                {{ formatDate(order.orderRegistration.canceledAt) }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item
                                    hide-opposite
                                    :dot-color="order.orderRegistration.deliverydAt ? `teal-lighten-3` : `teal-black`"
                                    size="small">
                                    <div class="d-flex">
                                        <strong class="me-4">Devolvido</strong>
                                        <div>
                                            <div
                                                class="text-caption mb-2"
                                                v-if="order.orderRegistration.deliverydAt">
                                                {{ formatDate(order.orderRegistration.deliverydAt) }}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </div>
                        <!--end accordion-->
                    </div>
                </div>
            </div>
            <!--end card-->
        </div>
        <!--end col-->
        <div class="flex flex-col gap-2 lg:w-[270px]">
            <div class="card">
                <div class="p-4">
                    <div class="flex justify-between flex-row">
                        <h5 class="">Detalhes da logistica</h5>
                        <div class=""></div>
                    </div>
                </div>
                <hr class="" />
                <div class="px-8">
                    <div class="flex flex-col items-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/uetqnvvg.json"
                            trigger="loop"
                            colors="primary:#405189,secondary:#0ab39c"
                            style="width: 80px; height: 80px">
                        </lord-icon>
                        <h5 class="">RQK Logistics</h5>
                        <p class="">ID: MFDS1400457854</p>
                        <p class="">Payment Mode : Debit Card</p>
                    </div>
                </div>
            </div>
            <!--end card-->

            <div class="card">
                <div class="p-4">
                    <div class="flex flex-row justify-between">
                        <h5 class="">Detalhes do Clinte</h5>
                        <div class="">
                            <a
                                href="javascript:void(0);"
                                class=""
                                >Ver Perfil</a
                            >
                        </div>
                    </div>
                </div>
                <hr class="" />
                <div class="p-4">
                    <ul class="flex flex-col gap-1">
                        <li>
                            <div class="mb-1">
                                <div class=" ">
                                    <h6 class="text-lg font-semibold">
                                        <span>{{ order.customer.firstName }}</span>
                                        <span>{{ order.customer.lastName }}</span>
                                    </h6>
                                    <p class="text-muted-foreground">Customer</p>
                                </div>
                            </div>
                        </li>
                        <li>{{ order.customer.email }}</li>
                        <li>{{ order.customer.cellNumber }}</li>
                    </ul>
                </div>
            </div>
            <!--end card-->
            <div class="card">
                <div class="p-4">
                    <h5 class=" ">Endereço de envio</h5>
                </div>
                <hr class="" />
                <div class="p-4">
                    <div class="flex flex-col gap-1">
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Nome:</p>
                            </div>
                            <div class="font-semibold">
                                <span class="">{{ order.address.firstName }}</span>
                                <span class="">{{ order.address.lastName }}</span>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Contacto:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.address.cellNumber }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Cidade:</p>
                            </div>
                            <div class="">
                                <h6 class="">{{ order.address.city }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Província:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.address.province }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Referência:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.address.reference }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Notas de entrega:</p>
                            </div>
                            <div class=" ">
                                <h6>
                                    <span v-if="order.address.none">{{ order.address.note }}</span>
                                    <span v-else>Sem notas</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--end card-->

            <div class="card">
                <div class="p-4">
                    <h5 class=" ">Detalhes de pagamento</h5>
                </div>
                <hr class="" />
                <div class="p-4 flex flex-col gap-1">
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Referência:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">{{ order.referenceOrder }}</h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Método de pagamento:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">
                                <span v-if="order.payment.paymentMethod">{{ order.payment.paymentMethod }}</span> <span v-else>{{ order.payment.status }}</span>
                            </h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Nome do Titular:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">
                                <span v-if="order.payment.paymentMethod">{{ order.payment.holderName }}</span> <span v-else>{{ order.payment.status }}</span>
                            </h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Número:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">
                                <span v-if="order.payment.paymentMethod">{{ order.payment.number }}</span> <span v-else>{{ order.payment.status }}</span>
                            </h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Referência da trasação:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">
                                <span v-if="order.payment.paymentMethod">{{ order.payment.transactionId }}</span> <span v-else>{{ order.payment.status }}</span>
                            </h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Total amount:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">{{ formatCurrency(order.payment.amount) }}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <!--end card-->
        </div>
        <!--end col-->
    </div>
</template>

<script setup>
    import { defineProps } from "vue";
    import { useStore } from "vuex";
    import { formatCurrency, formatDate } from "@/util/functions";

    const store = useStore();

    const props = defineProps({
        order: {
            type: Object,
            required: true,
        },
    });

    function makePayment(status, orderId, amount) {
        if (status === "Pago") return;

        store.commit("payments/SET_ID_ORDER", orderId);
        store.commit("payments/SET_AMOUT_PAYMENT", amount);
        store.commit("payments/SET_PAYMENT_DIALOG");
    }
</script>
<style scoped>
    .card {
        background: white;
        border-radius: 10px;
    }
    .v-timeline-item__opposite {
        display: none;
    }
</style>

<template lang="">
    <div class="flex flex-col md:flex-row gap-10">
        <div class="flex-1 flex flex-col gap-5">
            <div class="card">
                <div class="">
                    <div class="overflow-auto flex flex-col gap-5">
                        <v-table class="">
                            <thead class="">
                                <tr>
                                    <!-- <th class="text-center">Producto</th>
                                    <th class="text-center">Preço</th>
                                    <th class="text-center">Quantidate</th>
                                    <th class="text-center">Valor Total</th> -->

                                    <th class="text-center flex-1">Producto</th>
                                    <th class="text-center">Preço unit.</th>
                                    <th class="text-center">Quant.</th>
                                    <th class="text-center">Espec.</th>
                                    <th class="text-center">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in order.cartPayd.length > 0 ? order.cartPayd : order.cart"
                                    :key="index">
                                    <td class="">
                                        <div class="flex flex-row">
                                            <div class="w-16 h-16 p-1">
                                                <img
                                                    :src="item.picture"
                                                    alt=""
                                                    class="" />
                                            </div>

                                            <div class="flex flex-col gap-2">
                                                <h5 class="">
                                                    <router-link :to="{ name: `details`, params: { id: `${item.productId}` } }">
                                                        <span class="whitespace-nowrap">{{ item.productName }}</span>
                                                    </router-link>
                                                </h5>
                                                <div class="">
                                                    <p class="">Color: <span class="">Pink</span></p>
                                                    <p class="">Size: <span class="">M</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">{{ formatCurrency(item.productPrice) }}</td>
                                    <td class="text-center">{{ item.quantity }}</td>
                                    <td class="text-center">
                                        <div
                                            class="color whitespace-nowrap"
                                            v-if="item.variation && item.variation.color">
                                            <span>Cor: </span>
                                            <span>{{ item.variation.color }}</span>
                                        </div>
                                        <div
                                            class="model whitespace-nowrap"
                                            v-if="item.variation && item.variation.model">
                                            <span>Modelo: </span>
                                            <span>{{ item.variation.model }}</span>
                                        </div>
                                        <div
                                            class="size whitespace-nowrap"
                                            v-if="item.variation && item.variation.size">
                                            <span>Tamanho: </span>
                                            <span>{{ item.variation.size }}</span>
                                        </div>
                                        <div
                                            class="material whitespace-nowrap"
                                            v-if="item.variation && item.variation.material">
                                            <span>Material: </span>
                                            <span>{{ item.variation.material }}</span>
                                        </div>
                                    </td>
                                    <td class="text-center">{{ formatCurrency(item.subtotal) }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <hr />
                        <tr>
                            <td>
                                <v-table class="">
                                    <td></td>
                                    <tbody>
                                        <tr>
                                            <td>Sub Total :</td>
                                            <td class="">{{ formatCurrency(order.payment.totalProductsPrice) }}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping Charge :</td>
                                            <td class="">{{ formatCurrency(order.delivery.cost) }}</td>
                                        </tr>
                                        <tr>
                                            <td>Iva</td>
                                            <td class="text-sm text-muted-foreground">incluso</td>
                                        </tr>
                                        <tr>
                                            <th>Total :</th>
                                            <th>{{ formatCurrency(order.payment.amount) }}</th>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </td>
                        </tr>
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
                                class="bg-green-500 text-green-100 active:text-green-500 duration-500 active:bg-green-100 text-xs p-1 rounded-md w-max"
                                @click="makePayment(order.payment.status, order._id, order.payment.amount)">
                                Fazer pagamento
                            </button>
                            <slot
                                name="doPay"
                                v-if="order.payment.status !== `Pago`"
                                @click="makePayment(order.payment.status, order._id, order.payment.amount)" />
                            <button class="bg-blue-100 text-blue-500 active:text-blue-100 duration-500 active:bg-blue-500 text-xs p-1 rounded-md w-max">Mudar Endereço</button>

                            <button
                                v-if="order.payment.status !== `Pago`"
                                class="text-red-500 bg-red-100 active:text-red-100 active:bg-red-500 duration-500 text-xs p-1 rounded-md">
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
                                    :dot-color="order.payment.paymentDate === `Pago` ? `teal-lighten-3` : `teal-black`"
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
        <div class="flex flex-col gap-7">
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
                                    <p class="text-xs text-muted-foreground">Customer</p>
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
                                <p class=" ">País:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.address.country }}</h6>
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
    import { format } from "date-fns";
    import { useStore } from "vuex";

    const store = useStore();
    const props = defineProps({
        order: {
            type: Object,
            required: true,
        },
    });
    console.log(props.order);
    function makePayment(status, orderId, amount) {
        if (status === "Pago") return;

        store.commit("SET_ID_ORDER", orderId);
        store.commit("SET_AMOUTPAYMENT", amount);
        store.commit("SET_PAYMENT");
    }

    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy HH:mm");
    }
</script>
<style>
    .card {
        background: white;
        border-radius: 10px;
    }
    .v-timeline-item__opposite {
        display: none;
    }
</style>

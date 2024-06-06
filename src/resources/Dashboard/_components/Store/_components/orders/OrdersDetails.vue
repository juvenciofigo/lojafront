<template lang="">
    <div class="flex flex-col md:flex-row gap-10">
        <div class="flex-1 flex flex-col gap-5">
            <div class="card">
                <div class="">
                    <div class="overflow-auto flex flex-col gap-5">
                        <v-table class="">
                            <thead class="">
                                <tr>
                                    <th class="text-center">Producto</th>
                                    <th class="text-center">Preço</th>
                                    <th class="text-center">Quantidate</th>
                                    <th class="text-center">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(product, index) in order.ordercart"
                                    :key="index">
                                    <td class="">
                                        <div class="flex flex-row">
                                            <div class="w-16 h-16 p-1">
                                                <img
                                                    :src="product.picture"
                                                    alt=""
                                                    class="" />
                                            </div>

                                            <div class="flex flex-col gap-2">
                                                <h5 class="">
                                                    <router-link :to="{ name: `details`, params: { id: `${product.productId}` } }">
                                                        <span class="whitespace-nowrap">{{ product.productName }}</span>
                                                    </router-link>
                                                </h5>
                                                <div class="">
                                                    <p class="">Color: <span class="">Pink</span></p>
                                                    <p class="">Size: <span class="">M</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">{{ formatCurrency(product.productPrice) }}</td>
                                    <td class="text-center">{{ product.quantity }}</td>
                                    <td class="text-center">{{ formatCurrency(product.subtotal) }}</td>
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
                                            <td class="">{{ formatCurrency(order.paymentOrder.totalProductsPrice) }}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping Charge :</td>
                                            <td class="">{{ formatCurrency(order.deliveryOrder.deliveryCost) }}</td>
                                        </tr>
                                        <tr>
                                            <td>Iva</td>
                                            <td class="">$44.99</td>
                                        </tr>
                                        <tr>
                                            <th>Total :</th>
                                            <th>{{ formatCurrency(order.paymentOrder.amount) }}</th>
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
                        <h5 class="  ">Order Status</h5>
                        <div class="mt-2 mt-sm-0">
                            
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
                        <div class="">
                            
                        </div>
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
                                    <h6 class="text-lg font-semibold">{{ order.customerOrder.name }}</h6>
                                    <p class="text-xs text-muted-foreground">Customer</p>
                                </div>
                            </div>
                        </li>
                        <li>{{ order.customerOrder.email }}</li>
                        <li>{{ order.customerOrder.contacts }}</li>
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
                                <h6 class="">{{ order.customerOrder.name }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Contacto:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.customerOrder.contacts }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Cidade:</p>
                            </div>
                            <div class="">
                                <h6 class="">{{ order.customerOrder.address.city }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Província:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.customerOrder.address.province }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Referência:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.customerOrder.address.reference }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">País:</p>
                            </div>
                            <div class=" ">
                                <h6 class="">{{ order.customerOrder.address.country }}</h6>
                            </div>
                        </div>
                        <div class="flex flex-row gap-1">
                            <div class="text-muted-foreground">
                                <p class=" ">Notas de entrega:</p>
                            </div>
                            <div class=" ">
                                <h6>
                                    <span v-if="order.customerOrder.address.none">{{ order.customerOrder.address.note }}</span>
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
                            <h6 class="">#VLZ124561278124</h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Método de pagamento:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">Debit Card</h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Card Holder Name:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">Joseph Parker</h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Númbero:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">xxxx xxxx xxxx 2456</h6>
                        </div>
                    </div>
                    <div class="flex flex-row gap-1">
                        <div class="text-muted-foreground">
                            <p class=" ">Total amount:</p>
                        </div>
                        <div class=" ">
                            <h6 class="">$415.96</h6>
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

    defineProps({
        order: {
            type: Object,
            required: true,
        },
    });

    const formatCurrency = (value) => {
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

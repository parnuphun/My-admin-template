<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    color?: string ,
    icon: string ,
    icon_color?: string ,
    card_status?: boolean ,
    card_status_value?: Array<string> ,
    title_disabled? : boolean ,
    title: string ,
    button_toggle?: boolean ,
    button_toggle_default_value? :boolean ,
    button_group?: Array<string> ,
    button_group_type? : Array<string> ,
    button_group_id? : Array<string> ,
    button_group_colors? : Array<string> ,
    card_width?: string ,
    value?: string ,
    value_size?: string
}>()


const emit = defineEmits<{
    (event:'toggleBtn',size:boolean):void
}>()

const status = ref(props.card_status)

function change_status(){
    emit('toggleBtn',!props.card_status)
}

</script>

<template>
    <div :class=" card_width ? card_width : 'w-full'">
        <v-card :color="props.color">
            <div class="p-2 w-full h-full flex flex-row" id="parent">

                <div class="max-w-max">
                    <v-icon size="110px" :color="(props.icon_color) ? props.icon_color : (props.card_status) ? 'success' : 'error' "> {{props.icon}}</v-icon>
                </div>
                <div
                    v-if="!title_disabled"
                    :class=" card_width ? card_width : 'w-full px-2'"
                    class="flex flex-col h-auto"
                    id="child"
                >

                    <div class="min-w-max">
                        <p class="text-xl font-bold truncate"> {{props.title}} </p>
                    </div>
                    <div class="h-full flex justify-start items-center">
                        <v-btn
                            @click="change_status"
                            v-if="props.button_toggle && props.card_status_value " :color=" (props.card_status) ? 'success' : 'error'"
                        >
                            <div
                                v-if="props.card_status_value.length === 2 && props.card_status_value"
                            >
                                <p v-if="props.card_status">
                                    {{ props.card_status_value[0] }}
                                </p>
                                <p v-else>
                                    {{ props.card_status_value[1] }}
                                </p>
                                <!-- <p v-if="props.card_status">
                                    {{ props.card_status_value[0] }}
                                </p>
                                <p v-else>
                                    {{ props.card_status_value[1] }}
                                </p> -->
                            </div>
                            <div
                                v-if="props.card_status_value.length === 1"
                            >
                                <p>
                                    {{ props.card_status_value[0] }}
                                </p>
                            </div>
                        </v-btn>
                        <div
                            v-if="props.button_group && props.button_group_colors && props.button_group_id && props.button_group_type"
                            class="w-full flex flex-row gap-2">
                            <div v-for="(button , index) of props.button_group">
                                <v-btn
                                    :color="props.button_group_colors[index]">
                                    {{ button }}
                                </v-btn>
                            </div>
                        </div>
                        <div
                            v-if="props.card_status_value?.length == 2 && !props.button_toggle"
                            :class="(props.card_status) ? 'text-green-600' : 'text-red-700'"
                            class="text-4xl font-bold">
                            <p v-if="props.card_status">
                                {{ props.card_status_value[0] }}
                            </p>
                            <p v-else>
                                {{ props.card_status_value[1] }}
                            </p>
                        </div>

                        <p :class="(props.value_size)? props.value_size : 'text-6xl'">
                            {{ props.value }}
                        </p>
                    </div>

                </div>
            </div>
        </v-card>
    </div>
</template>

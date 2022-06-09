<template>
    <input class="hx-form-input px-3 border focus:border-blue-600" :type="type" v-model="computedValue"
        :disabled="disabled" :value="value">
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'text'
    },
    disabled: {
        type: Boolean,
        required: false,

    },
    value: {
        type: [String, Number],
        required: false,
    },
    modelValue: {

    }
})

const emits = defineEmits(['update:modelValue'])

const computedValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits("update:modelValue", value);
    },
});
</script>

<style lang="scss" scoped>
.hx-form-control {
    height: 2.75rem !important;
    border-radius: 0.75rem;
    overflow: hidden;
    margin-top: 0.25rem;
    position: relative;
}

.hx-form-input {
    @apply block w-full text-base py-2 px-3 font-normal leading-6 bg-white bg-clip-padding rounded;
    height: calc(1.5em + .75rem + 2px);
    color: #495057;
    border: 1px solid #ced4da;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
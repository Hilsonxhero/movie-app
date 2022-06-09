<template>
    <div class="star-rating">
        <label class="star-rating__star mr-2" v-for="rating in ratings"
            :class="{ 'is-selected': ((modelValue >= rating) && modelValue != null), 'is-disabled': disabled }"
            @click="set(rating)" @mouseover="star_over(rating)" @mouseout="star_out">
            <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
                v-model="modelValue" :disabled="disabled">★</label>
    </div>
</template>

<script setup lang="ts">

import { reactive, ref, watch } from 'vue';
const emits = defineEmits(['update:modelValue', 'rate'])
const props = defineProps({
    'name': {
        type: String
    },
    'value': {
        type: [String, Number],
        required: false
    },
    'id': String,
    'disabled': {
        type: Boolean
    },
    'required': {
        type: Boolean
    },
    'modelValue': {

    }
})


const temp_value = ref<any>(null)
const ratings = reactive<Number[]>([1, 2, 3, 4, 5])

const star_over = (index) => {
    if (!props.disabled) {
        // temp_value.value = props.modelValue;
        emits("update:modelValue", index);
    }

}

const star_out = () => {
    if (!props.disabled) {
        emits("update:modelValue", temp_value.value);
    }
}

const set = (value) => {
    if (!props.disabled) {
        temp_value.value = value;
        emits("update:modelValue", value);
    }
}

watch(() => ({ ...temp_value.value }), () => {
    emits("rate");
})

</script>

<style lang="scss" scoped>
%visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
}

.star-rating {
    &__star {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        font-size: 1.5em;
        color: #ABABAB;
        transition: color .2s ease-out;

        &:hover {
            cursor: pointer;
        }

        &.is-selected {
            color: #FFD700;
        }

        &.is-disabled:hover {
            cursor: default;
        }
    }

    &__checkbox {
        @extend %visually-hidden;
    }
}
</style>
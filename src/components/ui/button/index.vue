<template>
    <button ref="hx-btn" @click="clickHandler" class="hx-btn" :class="[classes, cls]">
        <span class="order-2">
            <slot></slot>

        </span>
        <template v-if="icon">
            <inline-svg class="" :class="iconClass" fill="currentColor" :src="`/media/icons/${icon}.svg`">
            </inline-svg>
        </template>

    </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

const cls = ref<string[]>([])

const props = defineProps({
    variant: {
        type: String,
        required: false,
        default: 'primary'
    },
    icon: {
        type: String,
        required: false
    },
    iconClass: {
        type: String,
        required: false
    },

    pill: {
        type: Boolean,
        required: false
    },

    to: {
        type: [Object, Number, String],
        required: false
    },
})
const router = useRouter()

if (props.pill) {
    cls.value.push('rounded-full')
}

const clickHandler = () => {
    if (!props.to) {
        return
    }
    if (isNaN(props.to)) {
        router.push(props.to)
    }
    router.go(props.to)
}

const classes = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'hxb-primary'
            break;
        case 'dark':
            return 'hxb-dark'
            break;
        default:
            break;
    }
})

</script>

<style lang="scss" scoped>
.hx-btn {
    @apply px-5 py-2 text-white flex items-center justify-center relative
}
</style>
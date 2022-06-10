<template>
    <ul class="pagination flex items-center">
        <li class="pagination-item">
            <button class=" rounded-md mr-2 pagination__arrow" type="button" @click="onClickFirstPage"
                :disabled="isInFirstPage" aria-label="Go to first page">
                <inline-svg class="w-6 h-6" src="media/icons/chevrons-left.svg"></inline-svg>
            </button>
        </li>

        <li class="pagination-item">
            <button class=" rounded-md mr-2 pagination__arrow" type="button" @click="onClickPreviousPage"
                :disabled="isInFirstPage" aria-label="Go to previous page">
                <inline-svg class="w-6 h-6" src="media/icons/chevron-left.svg"></inline-svg>
            </button>
        </li>

        <li v-for="page in pages" class="pagination-item">
            <button class=" rounded-md mr-2 pagination__button" type="button" @click="onClickPage(page.name)"
                :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }"
                :aria-label="`Go to page number ${page.name}`">
                {{ page.name }}
            </button>
        </li>

        <li class="pagination-item">
            <button class=" rounded-md mr-2 pagination__arrow" type="button" @click="onClickNextPage"
                :disabled="isInLastPage" aria-label="Go to next page">
                <inline-svg class="w-6 h-6" src="media/icons/chevron-right.svg"></inline-svg>
            </button>
        </li>

        <li class="pagination-item">
            <button class=" rounded-md mr-2 pagination__arrow" type="button" @click="onClickLastPage"
                :disabled="isInLastPage" aria-label="Go to last page">
                <inline-svg class="w-6 h-6" src="media/icons/chevrons-right.svg"></inline-svg>
            </button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Pagination {
    name: Number,
    isDisabled?: boolean
}

const props = defineProps({
    maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
    },
    totalPages: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        required: true
    },
    currentPage: {
        type: [Number],
        required: true
    },
},
)
const startPage = computed(() => {
    if (props.currentPage == 1) {
        return 1;
    }

    if (props.currentPage == props.totalPages) {
        return props.totalPages - props.maxVisibleButtons + 1;
    }

    return props.currentPage - 1;
})

const endPage = computed(() => {
    return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
})

const pages = computed(() => {
    const range: Pagination[] = [];
    for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
            name: i,
            isDisabled: i === props.currentPage
        });
    }

    return range;
})


const isInFirstPage = computed(() => {
    return props.currentPage === 1;
})

const isInLastPage = computed(() => {
    return props.currentPage === props.totalPages;
})

const emit = defineEmits(['pagechanged'])

const onClickFirstPage = () => {
    emit('pagechanged', 1);
}
const onClickPreviousPage = () => {
    emit('pagechanged', +props.currentPage - 1);
}
const onClickPage = (page) => {
    emit('pagechanged', page);
}
const onClickNextPage = () => {
    emit('pagechanged', +props.currentPage + 1);
}
const onClickLastPage = () => {
    emit('pagechanged', props.totalPages);
}
const isPageActive = (page) => {
    return props.currentPage == page;
}

</script>

<style lang="scss" scoped>
.pagination__arrow {
    width: auto;
    height: 36px;
    border-radius: 12px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 2px;
    background: rgba(240, 243, 244, 1);
    -webkit-transition: all .25s ease;
    transition: all .25s ease;
    border: 0;
    min-width: 36px;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.pagination__button {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    padding: 0;
    background: rgba(240, 243, 244, 1);
    margin: 0 2px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: .9rem;
    -webkit-transition: all .25s ease;
    transition: all .25s ease;
    color: rgba(var(--vs-text), 1);
    position: relative;
    border: 0;

    &.active {
        background: #4AAE9B !important;
        color: #ffffff !important;
    }
}
</style>
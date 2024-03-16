<template>
    <div>
        <h2>{{ model.title.rendered }}</h2>
        <div v-for="(value, field) in model.acf" :key="field">
        <p>{{ value }}</p>
        </div>
        <hr>
    </div>
</template>

<script>
export default {
    props: {
        model: {
        type: Object,
        required: true,
        },
    },
};
</script>
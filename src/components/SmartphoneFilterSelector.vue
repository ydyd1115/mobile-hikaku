<!-- SmartphoneFilterSelector.vue -->
<template>
<div>
    <table class="w-full border-collapse">
    <tr class="border-t border-b border-blue-300">
        <th>
        <label for="makerFilter">メーカー選択</label>
        </th>
        <td>
        <select id="makerFilter" v-model="selectedMakerFilter">
            <option value="">すべて</option>
            <option v-for="maker in uniqueMakers" :key="maker" :value="maker">
            {{ maker }}
            </option>
        </select>
        </td>
    </tr>
    <tr class="border-b border-blue-300">
        <th>
        発売日
        </th>
        <td>
        <input type="date" id="releasedStartDate" v-model="releasedStartDate" />
        ～
        <input type="date" id="releasedEndDate" v-model="releasedEndDate" />
        </td>
    </tr>
    <tr class="border-b border-blue-300">
        <th>
        <label for="nameSearch">名前検索</label>
        </th>
        <td>
        <input type="text" id="nameSearch" v-model="nameSearch" @input="filterSmartphonesByName" />
        </td>
    </tr>
    <tr class="border-b border-blue-300">
        <th>
        <label for="selectSmartphone">スマートフォン選択</label>
        </th>
        <td>
        <select id="selectSmartphone" v-model="selectedSmartphone" @change="displaySelectedSpecs">
            <option v-for="smartphoneModel in filteredSmartphoneModels" :key="smartphoneModel.id" :value="smartphoneModel">
            {{ smartphoneModel.title.rendered }}
            </option>
        </select>
        </td>
    </tr>
    </table>
</div>
</template>

<script>
export default {
props: {
    smartphoneModels: Array,
    initialSelection: Object,
    smartphoneSelector: Number,
},
data() {
    return {
    selectedSmartphone: this.initialSelection,
    selectedMakerFilter: "",
    releasedStartDate: "",
    releasedEndDate: "",
    nameSearch: "",
    };
},
computed: {
    uniqueMakers() {
    return [...new Set(this.smartphoneModels.map((model) => model.acf.maker))];
    },
    filteredSmartphoneModels() {
    return this.smartphoneModels.filter((model) => this.applyFilters(model) && this.applyNameSearch(model));
    },
},
watch: {
    initialSelection(newVal) {
    // 初期選択のスマートフォンが変更されたら、それを反映
    this.selectedSmartphone = newVal;
    },
},
methods: {
    applyFilters(model) {
    const makerFilter = this.selectedMakerFilter === "" || model.acf.maker === this.selectedMakerFilter;
    const releasedDateFilter =
        this.releasedStartDate === "" ||
        this.releasedEndDate === "" ||
        (model.acf.released >= this.releasedStartDate && model.acf.released <= this.releasedEndDate);

    // フィルターが AND なので、両方が true の場合に true を返す
    return makerFilter && releasedDateFilter;
    },
    applyNameSearch(model) {
    const nameSearch = this.nameSearch.toLowerCase();
    const modelName = model.title.rendered.toLowerCase();
    return modelName.includes(nameSearch);
    },
    filterSmartphonesByName() {
    // 名前検索が変更されたら、フィルタリングされたスマートフォンの一覧を表示
    this.$forceUpdate();
    },
    displaySelectedSpecs() {
    if (this.selectedSmartphone) {
        const slug = this.selectedSmartphone.slug;
        const routeParams = {
        slug1: this.$route.params.slug1,
        slug2: this.$route.params.slug2,
        };

        if (this.smartphoneSelector === 1) {
        // 一つ目のSelectorが変更された場合
        routeParams.slug1 = slug;
        } else {
        // 二つ目のSelectorが変更された場合
        routeParams.slug2 = slug;
        }

        // ルートパスを更新（/slug1/slug2）
        this.$router.push({ name: "smartphone-detail", params: routeParams });
    }
    },
},
mounted() {
    // ルートパスのパラメータからslug1とslug2を取得
    const slug1 = this.$route.params.slug1;
    const slug2 = this.$route.params.slug2;

    // 初期選択のスマートフォンがある場合は、そのslugを反映し、ない場合はslug1とslug2の順で反映
    this.selectedSmartphone =
    this.smartphoneSelector === 1
        ? this.smartphoneModels.find((model) => model.slug === slug1) || null
        : this.smartphoneModels.find((model) => model.slug === slug2) || null;
},
};
</script>


<style scoped>
input,
select{
    border:solid 1px #555;
    width:100%;
    background-color:#f0f0f0;
}

th,td{
    padding:4px;
}

@media(max-width:478px){
    tr{
        display: flex;
        flex-direction: column;
    }


}
</style>
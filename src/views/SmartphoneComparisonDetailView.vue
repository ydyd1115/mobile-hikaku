<template>
    <div>
        <h1  id="mobile-phone-select" class="text-blue-500 text-4xl font-semibold my-4">スマートフォン比較</h1>
            <!-- スマートフォン1のスペック一覧表示 -->
    <!-- スマートフォン1のキーと値をテーブルで表示 -->      



        <div  class="flex justify-around gap-0 mb-8 border-2">
            <div class="w-full border-r">
                <!-- 1つ目のSmartphoneFilterSelector -->
                <p class="text-center font-semibold py-2 text-white bg-blue-500">1機種目</p>
                <SmartphoneFilterSelector
                :smartphoneModels="smartphoneModels"
                @selected="handleSelectedSmartphone1"
                :initialSelection="selectedSmartphone1"
                :smartphoneSelector="1" 
                />
            </div>
            <div class="w-full">
                <!-- 2つ目のSmartphoneFilterSelector -->
                <p class="text-center font-semibold py-2 text-white bg-blue-500">2機種目</p>
                <SmartphoneFilterSelector
                    :smartphoneModels="smartphoneModels"
                    @selected="handleSelectedSmartphone2"
                    :initialSelection="selectedSmartphone2"
                    :smartphoneSelector="2"
                />
            </div>
                <!-- 2機種比較用のテーブルコンポーネント -->
        </div>
        <SmartphoneComparisonTable
        v-if="selectedSmartphone1 && selectedSmartphone2"
        :selectedSmartphone1="selectedSmartphone1"
        :selectedSmartphone2="selectedSmartphone2"
        />
    </div>
</template>

<script>
import SmartphoneComparisonTable from "@/components/SmartphoneComparisonTable.vue";
// import SmartphoneCard from "@/components/SmartphoneCard.vue";
import SmartphoneFilterSelector from "@/components/SmartphoneFilterSelector.vue";


export default {
    components: {
        // SmartphoneCard,
        SmartphoneComparisonTable,
        SmartphoneFilterSelector,
    },
    data() {
        return {
        smartphoneModels: [], // WordPress APIから取得するスマートフォンのリスト
        selectedSmartphone1: null,
        selectedSmartphone2: null,
        };
    },
    async mounted() {
        try {
        const response = await this.$axios.get(
            "https://hikaku-depot.com/wp-json/wp/v2/mobile-phone?per_page=100&orderby=date&order=desc"
        );
        this.smartphoneModels = response.data;
        // スマートフォン一覧を取得したらメタ情報を更新
        this.updateMetaInfo(this.$route);
        } catch (error) {
        console.error("スマートフォンの一覧を取得中にエラーが発生しました：", error);
        }
        // ページがロードされたときにルートパラメータを確認し、該当するスマートフォンを選択状態にする
        this.handleRouteChange();
    },
    watch: {
        // selectedSmartphone1 が変更されたら、ルートパスを更新
        selectedSmartphone1(newVal) {
            if (newVal) {
                this.$router.push({
                name: "smartphone-detail",
                params: { slug1: newVal.slug, slug2: this.$route.params.slug2, smartphoneSelector: "1" },
                });
            }
        },
        // selectedSmartphone2 が変更されたら、ルートパスを更新
        selectedSmartphone2(newVal) {
            if (newVal) {
                this.$router.push({
                name: "smartphone-detail",
                params: { slug1: this.$route.params.slug1, slug2: newVal.slug, smartphoneSelector: "2" },
                });
            }
        },
        $route(newRoute) {
            // ルートが変更されたらメタ情報を更新
            this.updateMetaInfo(newRoute);
            // ルートが変更されたら、該当するスマートフォンを選択状態にする
            this.handleRouteChange();
        },
    },
    methods: {
        handleSelectedSmartphone1(selectedSmartphone) {
            this.selectedSmartphone1 = selectedSmartphone;
            // 選択された機種をセッションストレージに保存
            sessionStorage.setItem('selectedSmartphone1', JSON.stringify(selectedSmartphone));
        },

        handleSelectedSmartphone2(selectedSmartphone) {
            this.selectedSmartphone2 = selectedSmartphone;
            // 選択された機種をセッションストレージに保存
            sessionStorage.setItem('selectedSmartphone2', JSON.stringify(selectedSmartphone));
        },

        handleRouteChange() {
            const slug1 = this.$route.params.slug1;
            const slug2 = this.$route.params.slug2;

            // 選択されたスマートフォンのslugが存在する場合はそのデータを取得
            this.selectedSmartphone1 = this.getSmartphoneBySlug(slug1);
            this.selectedSmartphone2 = this.getSmartphoneBySlug(slug2);
        },

        getSmartphoneBySlug(slug) {
            // slugに一致するスマートフォンを検索
            return this.smartphoneModels.find((model) => model.slug === slug) || null;
        },

        async updateMetaInfo(route) {
            const slug1 = route.params.slug1 || '';
            const slug2 = route.params.slug2 || '';

            // slug1とslug2をもとに対応する機種名を取得
            const modelName1 = this.getModelNameBySlug(slug1);
            const modelName2 = this.getModelNameBySlug(slug2);

            document.title = `【スマホスペック比較】${modelName1} vs ${modelName2}`;
            const description = `今話題のスマートフォンのスペックを徹底比較します。${modelName1} vs ${modelName2}。あなたにおススメのスマホが見つかります`;

            const existingDescriptionTag = document.querySelector('meta[name="description"]');
            if (existingDescriptionTag) {
                existingDescriptionTag.setAttribute('content', description);
            } else {
                const newDescriptionTag = document.createElement('meta');
                newDescriptionTag.setAttribute('name', 'description');
                newDescriptionTag.setAttribute('content', description);
                document.head.appendChild(newDescriptionTag);
            }
        },

        getModelNameBySlug(slug) {
            // slugに一致するスマートフォンの機種名を検索
            const model = this.smartphoneModels.find((model) => model.slug === slug);
            return model ? model.title.rendered : '';
        },
    },
};
</script>
<style scoped>
</style>

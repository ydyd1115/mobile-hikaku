<template>
    <div>
        <h1>スマートフォン比較</h1>
            <!-- スマートフォン1のスペック一覧表示 -->
    <!-- スマートフォン1のキーと値をテーブルで表示 -->      



        <div  class="flex justify-around gap-0">
            <div class="w-full">
                <!-- 1つ目のSmartphoneFilterSelector -->
                <SmartphoneFilterSelector
                :smartphoneModels="smartphoneModels"
                @selected="handleSelectedSmartphone1"
                :initialSelection="selectedSmartphone1"
                :smartphoneSelector="1" 
                />
            </div>
            <div class="w-full">
                <!-- 2つ目のSmartphoneFilterSelector -->
                <SmartphoneFilterSelector
                    :smartphoneModels="smartphoneModels"
                    @selected="handleSelectedSmartphone2"
                    :initialSelection="selectedSmartphone2"
                    :smartphoneSelector="2"
                />
            </div>
        </div>
    </div>
</template>
<script>
import SmartphoneFilterSelector from '@/components/SmartphoneFilterSelector.vue';

export default {
    components: {
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
            'https://hikaku-depot.com/wp-json/wp/v2/mobile-phone'
        );
        this.smartphoneModels = response.data;
            // IDが大きい順にソートし、最初の2つをselectedSmartphone1とselectedSmartphone2に設定
            const sortedModels = this.smartphoneModels.sort((a, b) => b.id - a.id);
            this.selectedSmartphone1 = sortedModels[0] || null;
            this.selectedSmartphone2 = sortedModels[1] || null;

            // ルーティングに設定
            // if (this.selectedSmartphone1) {
            // this.$router.push({ name: 'smartphone-detail', params: { slug1: this.selectedSmartphone1.slug } });
            // }

            if (this.selectedSmartphone2) {
            this.$router.push({ name: 'smartphone-detail', params: { slug1: this.selectedSmartphone1.slug, slug2: this.selectedSmartphone2.slug } });
            }
        } catch (error) {
        console.error('スマートフォンの一覧を取得中にエラーが発生しました：', error);
        }

        // ページがロードされたときにルートパラメータを確認し、該当するスマートフォンを選択状態にする
        this.handleRouteChange();
    },
    watch: {
    // selectedSmartphone1 が変更されたら、ルートパスを更新
    selectedSmartphone1(newVal) {
        if (newVal) {
            this.$router.push({
                name: 'smartphone-detail',
                params: { slug1: newVal.slug, slug2: this.selectedSmartphone2 ? this.selectedSmartphone2.slug : null },
            });
        }
    },
},
    methods: {
        handleSelectedSmartphone1(selectedSmartphone) {
        this.selectedSmartphone1 = selectedSmartphone;
        },
        handleSelectedSmartphone2(selectedSmartphone) {
        this.selectedSmartphone2 = selectedSmartphone;
        },
        handleRouteChange() {
        const slug = this.$route.params.slug;
        if (slug) {
            // 選択されたスマートフォンの slug が存在する場合はそのデータを取得
            this.selectedSmartphone1 = this.getSmartphoneBySlug(slug);
        }
        },
        getSmartphoneBySlug(slug) {
        // slug に一致するスマートフォンを検索
        return this.smartphoneModels.find((model) => model.slug === slug) || null;
        },
    },
};
</script>
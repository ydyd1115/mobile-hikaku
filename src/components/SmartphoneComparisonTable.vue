<template>
<div id="mobile-phone-head" class="sticky z-30 top-32">
    <table>
        <tr class="bg-blue-500 text-white text-lg md:text-3xl leading-none md:leading-normal">
            <th></th>
            <td>{{selectedSmartphone1.title.rendered}}</td>
            <td>{{selectedSmartphone2.title.rendered}}</td>
        </tr>
        <tr class="bg-white">
            <th>比較項目</th>
            <td colspan="2">
                <ul class="flex justify-around gap-2 flex-auto flex-wrap">
                    <li><a @click="scrollToSection('#profile')">基本情報</a></li>
                    <li><a @click="scrollToSection('#basics')">基本性能</a></li>
                    <li><a @click="scrollToSection('#camera')">カメラ性能</a></li>
                    <li><a @click="scrollToSection('#others')">その他機能など</a></li>
                </ul>
            </td>
        </tr>
    </table>
</div>
<div class="smart-phone-info overscroll-y-contain">
    <div id="profile" class="smart-phone-info__info">
        <h2>基本情報</h2>
        <table class="table-fixed text-center w-full">
            <tr>
                <th>レビューサイト</th>
                <td><a :href="'https://hikaku-depot.com/mobile-phone/' + selectedSmartphone1.slug" target="__blank">詳しくはこちら</a></td>
                <td><a :href="'https://hikaku-depot.com/mobile-phone/' + selectedSmartphone2.slug" target="__blank">詳しくはこちら</a></td>
            </tr>
            <tr>
                <th>画像</th>
                <td>      
                    <img v-if="selectedSmartphone1.acf.picture" :src="selectedSmartphone1.acf.picture" alt="Smartphone 1 Image" />
                </td>
                <td>
                    <img v-if="selectedSmartphone2.acf.picture" :src="selectedSmartphone2.acf.picture" alt="Smartphone 1 Image" />
                </td>
            </tr>
            <tr>
                <th>メーカー</th>
                <td>{{selectedSmartphone1.acf.maker}}</td>
                <td>{{selectedSmartphone2.acf.maker}}</td>
            </tr>
            <tr>
                <th>公式URL</th>
                <td><a v-bind:href="selectedSmartphone1.acf.maker_URL" target="_blank">{{selectedSmartphone1.acf.maker_URL}}</a></td>
                <td><a v-bind:href="selectedSmartphone2.acf.maker_URL" target="_blank">{{selectedSmartphone2.acf.maker_URL}}</a></td>
            </tr>
            <tr>
                <th>発売日</th>
                <td>{{selectedSmartphone1.acf.released}}</td>
                <td>{{selectedSmartphone2.acf.released}}</td>
            </tr>
            <tr>
                <th>横×縦×厚</th>
                <td>
                    <dl class="flex flex-col md:flex-row justify-center flex-auto flex-wrap">
                        <dt class="leading-none md:leading-normal">
                            {{selectedSmartphone1.acf.width}} mm 
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            　×　  
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            {{selectedSmartphone1.acf.height}} mm
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            　×　
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            {{selectedSmartphone1.acf.thickness}} mm
                        </dt>
                    </dl>
                </td>
                <td>
                    <dl class="flex flex-col md:flex-row justify-center flex-auto flex-wrap">
                        <dt class="leading-none md:leading-normal">
                            {{selectedSmartphone2.acf.width}} mm 
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            　×　  
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            {{selectedSmartphone2.acf.height}} mm
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            　×　
                        </dt>
                        <dt class="leading-none md:leading-normal">
                            {{selectedSmartphone2.acf.thickness}} mm
                        </dt>
                    </dl>                </td>
            </tr>
            <tr>
                <th>カラー</th>
                <td><span v-html="formatColor(selectedSmartphone1.acf.color)"></span></td>
                <td><span v-html="formatColor(selectedSmartphone2.acf.color)"></span></td>
            </tr>
            <tr>
                <th>OS</th>
                <td>{{selectedSmartphone1.acf.os}}</td>
                <td>{{selectedSmartphone2.acf.os}}</td>
            </tr>
        </table>
    </div>
    <div class="smart-phone-spec__basic">
        <h2 id="basics">基本性能</h2>
        <table class="smart-phone-spec__basic__data ">
            <tr>
                <th>CPU</th>
                <td>{{selectedSmartphone1.acf.cpu}}</td>
                <td>{{selectedSmartphone2.acf.cpu}}</td>
            </tr>
            <tr class="core_clock">
                <th>コア数<br>
                    (クロック)
                </th>
                <td>{{selectedSmartphone1.acf.num_of_core}}<br>
                    {{selectedSmartphone1.acf.clock}}
                </td>
                <td>{{selectedSmartphone2.acf.num_of_core}}<br>
                    {{selectedSmartphone2.acf.clock}}
                </td>
            </tr>
            <tr>
                <th>GPU</th>
                <td>{{selectedSmartphone1.acf.gpu}}</td>
                <td>{{selectedSmartphone2.acf.gpu}}</td>
            </tr>
            <tr>
                <th>メモリ</th>
                <td class="smart-phone-spec__basic__data__multiple">
                    <span>{{selectedSmartphone1.acf.memory_1}}GB</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.memory_2) }}</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.memory_3) }}</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.memory_4) }}</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.memory_5) }}</span>
                </td>
                <td class="smart-phone-spec__basic__data__multiple">
                <span>{{selectedSmartphone2.acf.memory_1}}GB</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.memory_2) }}</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.memory_3) }}</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.memory_4) }}</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.memory_5) }}</span>
                </td>
            </tr>
            <tr>
                <th>ストレージ</th>
                <td class="smart-phone-spec__basic__data__multiple">
                    <span>{{selectedSmartphone1.acf.storage_1}}GB</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.storage_2) }}</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.storage_3) }}</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.storage_4) }}</span>
                    <span>{{ convertMemory(selectedSmartphone1.acf.storage_5) }}</span>
                </td>
                <td class="smart-phone-spec__basic__data__multiple">
                    <span>{{selectedSmartphone2.acf.storage_1}}GB</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.storage_2) }}</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.storage_3) }}</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.storage_4) }}</span>
                    <span>{{ convertMemory(selectedSmartphone2.acf.storage_5) }}</span>
                </td>
            </tr>
            <tr>
                <th>バッテリー容量</th>
                <td>{{selectedSmartphone1.acf.battery_capa}}mAh</td>
                <td>{{selectedSmartphone2.acf.battery_capa}}mAh</td>
            </tr>
            <tr>
                <th>外部メモリ</th>
                <td>{{selectedSmartphone1.acf.ex_memory_type}}</td>
                <td>{{selectedSmartphone2.acf.ex_memory_type}}</td>
            </tr>
            <tr>
                <th>外部メモリ容量</th>
                <td>{{selectedSmartphone1.acf.ex_memory_capa}}</td>
                <td>{{selectedSmartphone2.acf.ex_memory_capa}}</td>
            </tr>
            <tr>
                <th>画面サイズ</th>
                <td>{{selectedSmartphone1.acf.display_size}}inch</td>
                <td>{{selectedSmartphone2.acf.display_size}}inch</td>
            </tr>
            <tr>
                <th>解像度</th>
                <td>{{selectedSmartphone1.acf.display_resolution_type}}:w{{selectedSmartphone1.acf.display_resolution_w}}px × h{{selectedSmartphone1.acf.display_resolution_h}}px</td>
                <td>{{selectedSmartphone2.acf.display_resolution_type}}:w{{selectedSmartphone2.acf.display_resolution_w}}px × h{{selectedSmartphone2.acf.display_resolution_h}}px</td>
            </tr>
            <tr>
                <th>画面パネル</th>
                <td>{{selectedSmartphone1.acf.display_panel}}</td>
                <td>{{selectedSmartphone2.acf.display_panel}}</td>
            </tr>
            <tr>
                <th>最大輝度</th>
                <td>{{selectedSmartphone1.acf.screen_brightness}}ニト</td>
                <td>{{selectedSmartphone2.acf.screen_brightness}}ニト</td>
            </tr>
            <tr>
                <th>リフレッシュレート</th>
                <td>{{selectedSmartphone1.acf.refresh_rate}}Hz</td>
                <td>{{selectedSmartphone2.acf.refresh_rate}}Hz</td>
            </tr>
        </table>
    </div>
    <div class="smart-phone-spec__camera">
        <h2 id="camera">カメラ性能</h2>
        <div class="smart-phone-spec__camera__table">
            <table>
                <tbody>
                    <tr>
                        <th>メインカメラ数</th>
                        <td>{{selectedSmartphone1.acf.num_main_camera}}</td>
                        <td>{{selectedSmartphone2.acf.num_main_camera}}</td>
                    </tr>
                </tbody>
                <tbody class="toggle-button">
                    <tr class="angles">
                        <th>表示切替(画角別)</th>
                        <td class="tab-container" colspan="2">
                            <ul class="flex justify-around gap-2 flex-auto flex-wrap">
                                <li
                                v-for="(tab, index) in tabs"
                                :key="index"
                                @click="showContent(tab.id)"
                                :class="{ 'active-tab': activeTab === tab.id }"
                                class="py-2 px-4 rounded-sm"
                            >
                                {{ tab.label }}
                            </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <tbody id="super-wide-content" class="tab-content active-content">
                    <tr>
                        <th>超広角</th>
                        <td>{{ convertValue(selectedSmartphone1.acf.camera_super_wide) }}</td>
                        <td>{{ convertValue(selectedSmartphone2.acf.camera_super_wide) }}</td>
                    </tr>
                    <tr>
                        <th>画素数（超広角）</th>
                        <td>{{selectedSmartphone1.acf.pixels_sw !== '-' ? selectedSmartphone1.acf.pixels_sw + ' 万画素' : selectedSmartphone1.acf.pixels_sw }}</td>
                        <td>{{selectedSmartphone2.acf.pixels_sw !== '-' ? selectedSmartphone2.acf.pixels_sw + ' 万画素' : selectedSmartphone2.acf.pixels_sw }}</td>
                    </tr>
                    <tr>
                        <th>F値（超広角）</th>
                        <td>{{selectedSmartphone1.acf.f_value_sw}}</td>
                        <td>{{selectedSmartphone2.acf.f_value_sw}}</td>
                    </tr>
                    <tr>
                        <th>センサーサイズ（超広角）</th>
                        <td>{{selectedSmartphone1.acf.sensor_size_sw}}</td>
                        <td>{{selectedSmartphone2.acf.sensor_size_sw}}</td>
                    </tr>
                    <tr>
                        <th>画角（超広角）</th>
                        <td>{{selectedSmartphone1.acf.angle_sw !== '-' ? selectedSmartphone1.acf.angle_sw + ' °' : selectedSmartphone1.acf.angle_sw }}</td>
                        <td>{{selectedSmartphone2.acf.angle_sw !== '-' ? selectedSmartphone2.acf.angle_sw + ' °' : selectedSmartphone2.acf.angle_sw }}</td>
                    </tr>
                </tbody>
                <tbody id="wide-content" class="tab-content">
                    <tr>
                        <th>広角</th>
                        <td>{{ convertValue(selectedSmartphone1.acf.camera_wide) }}</td>
                        <td>{{ convertValue(selectedSmartphone2.acf.camera_wide) }}</td>
                    </tr>
                    <tr>
                        <th>画素数（広角）</th>
                        <td>{{selectedSmartphone1.acf.pixels_w !== '-' ? selectedSmartphone1.acf.pixels_w + ' 万画素' : selectedSmartphone1.acf.pixels_w }}</td>
                        <td>{{selectedSmartphone2.acf.pixels_w !== '-' ? selectedSmartphone2.acf.pixels_w + ' 万画素' : selectedSmartphone2.acf.pixels_w }}</td>
                    </tr>
                    <tr>
                        <th>F値（広角）</th>
                        <td>{{selectedSmartphone1.acf.f_value_w}}</td>
                        <td>{{selectedSmartphone2.acf.f_value_w}}</td>
                    </tr>
                    <tr>
                        <th>センサーサイズ（広角）</th>
                        <td>{{selectedSmartphone1.acf.sensor_size_w}}</td>
                        <td>{{selectedSmartphone2.acf.sensor_size_w}}</td>
                    </tr>
                    <tr>
                        <th>画角（広角）</th>
                        <td>{{selectedSmartphone1.acf.angle_w !== '-' ? selectedSmartphone1.acf.angle_w + ' °' : selectedSmartphone1.acf.angle_w }}</td>
                        <td>{{selectedSmartphone2.acf.angle_w !== '-' ? selectedSmartphone2.acf.angle_w + ' °' : selectedSmartphone2.acf.angle_w }}</td>
                    </tr>
                </tbody>
                <tbody id="tele-content" class="tab-content">
                    <tr>
                        <th>望遠</th>
                        <td>{{ convertValue(selectedSmartphone1.acf.camera_tele) }}</td>
                        <td>{{ convertValue(selectedSmartphone2.acf.camera_tele) }}</td>
                    </tr>
                    <tr>
                        <th>画素数（望遠）</th>
                        <td>{{selectedSmartphone1.acf.pixels_t !== '-' ? selectedSmartphone1.acf.pixels_t + ' 万画素' : selectedSmartphone1.acf.pixels_t }}</td>
                        <td>{{selectedSmartphone2.acf.pixels_t !== '-' ? selectedSmartphone2.acf.pixels_t + ' 万画素' : selectedSmartphone2.acf.pixels_t }}</td>
                    </tr>
                    <tr>
                        <th>F値（望遠）</th>
                        <td>{{selectedSmartphone1.acf.f_value_t}}</td>
                        <td>{{selectedSmartphone2.acf.f_value_t}}</td>
                    </tr>
                    <tr>
                        <th>センサーサイズ（望遠）</th>
                        <td>{{selectedSmartphone1.acf.sensor_size_t}}</td>
                        <td>{{selectedSmartphone2.acf.sensor_size_t}}</td>
                    </tr>
                    <tr>
                        <th>画角（望遠）</th>
                        <td>{{selectedSmartphone1.acf.angle_t !== '-' ? selectedSmartphone1.acf.angle_t + ' °' : selectedSmartphone1.acf.angle_t }}</td>
                        <td>{{selectedSmartphone2.acf.angle_t !== '-' ? selectedSmartphone2.acf.angle_t + ' °' : selectedSmartphone2.acf.angle_t }}</td>
                    </tr>
                </tbody>
                <tbody id="macro-content" class="tab-content">
                    <tr>
                        <th>マクロ</th>
                        <td>{{ convertValue(selectedSmartphone1.acf.camera_macro) }}</td>
                        <td>{{ convertValue(selectedSmartphone2.acf.camera_macro) }}</td>
                    </tr>
                    <tr>
                        <th>画素数（マクロ）</th>
                        <td>{{selectedSmartphone1.acf.pixels_m !== '-' ? selectedSmartphone1.acf.pixels_m + ' 万画素' : selectedSmartphone1.acf.pixels_m }}</td>
                        <td>{{selectedSmartphone2.acf.pixels_m !== '-' ? selectedSmartphone2.acf.pixels_m + ' 万画素' : selectedSmartphone2.acf.pixels_m }}</td>
                    </tr>
                    <tr>
                        <th>F値（マクロ）</th>
                        <td>{{selectedSmartphone1.acf.f_value_m}}</td>
                        <td>{{selectedSmartphone2.acf.f_value_m}}</td>
                    </tr>
                    <tr>
                        <th>センサーサイズ（マクロ）</th>
                        <td>{{selectedSmartphone1.acf.sensor_size_m}}</td>
                        <td>{{selectedSmartphone2.acf.sensor_size_m}}</td>
                    </tr>
                    <tr>
                        <th>画角（マクロ）</th>
                        <td>{{selectedSmartphone1.acf.angle_m !== '-' ? selectedSmartphone1.acf.angle_m + ' °' : selectedSmartphone1.acf.angle_m }}</td>
                        <td>{{selectedSmartphone2.acf.angle_m !== '-' ? selectedSmartphone2.acf.angle_m + ' °' : selectedSmartphone2.acf.angle_m }}</td>
                    </tr>
                </tbody>
                <tr>
                    <th>光学式手ぶれ補正</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.shake_correction_optical) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.shake_correction_optical) }}</td>
                </tr>
                <tr>
                    <th>電子式手ぶれ補正</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.shake_correction_electronic) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.shake_correction_electronic) }}</td>
                </tr>
                <tr>
                    <th>スローモーション撮影</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.slow_motion) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.slow_motion) }}</td>
                </tr>
                <tr>
                    <th>4K撮影</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.four_k) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.four_k) }}</td>
                </tr>
                <tr>
                    <th>8K撮影</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.eight_k) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.eight_k) }}</td>
                </tr>
                <tr>
                    <th>静止画ズーム</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.zoom_photo) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.zoom_photo) }}</td>
                </tr>
                <tr>
                    <th>動画ズーム</th>
                    <td>{{ convertValue(selectedSmartphone1.acf.zoom_movie) }}</td>
                    <td>{{ convertValue(selectedSmartphone2.acf.zoom_movie) }}</td>
                </tr>
                <tr>
                    <th>フロントカメラ画素数</th>
                    <td>{{selectedSmartphone1.acf.pixels_f !== '-' ? selectedSmartphone1.acf.pixels_f + ' 万画素' : selectedSmartphone1.acf.pixels_f }}</td>
                    <td>{{selectedSmartphone2.acf.pixels_f !== '-' ? selectedSmartphone2.acf.pixels_f + ' 万画素' : selectedSmartphone2.acf.pixels_f }}</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="smart-phone-spec__others">
        <h2 id="others">その他機能など</h2>
        <table>
            <tr>
                <th>指紋認証</th>
                <td>{{ convertValue(selectedSmartphone1.acf.finger_auth) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.finger_auth) }}</td>
            </tr>
            <tr>
                <th>顔認証</th>
                <td>{{ convertValue(selectedSmartphone1.acf.face_auth) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.face_auth) }}</td>
            </tr>
            <tr>
                <th>ワイヤレス充電</th>
                <td>{{ convertValue(selectedSmartphone1.acf.wireless_charge) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.wireless_charge) }}</td>
            </tr>
            <tr>
                <th>おサイフケータイ</th>
                <td>{{ convertValue(selectedSmartphone1.acf.wallet) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.wallet) }}</td>
            </tr>
            <tr>
                <th>ハイレゾ</th>
                <td>{{ convertValue(selectedSmartphone1.acf.high_resolution) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.high_resolution) }}</td>
            </tr>
            <tr>
                <th>折りたたみ</th>
                <td>{{ convertValue(selectedSmartphone1.acf.folding) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.folding) }}</td>
            </tr>
            <tr>
                <th>5G</th>
                <td>{{ convertValue(selectedSmartphone1.acf.five_gen) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.five_gen) }}</td>
            </tr>
            <tr>
                <th>eSIM</th>
                <td>{{ convertValue(selectedSmartphone1.acf.e_sim) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.e_sim) }}</td>
            </tr>
            <tr>
                <th>SIMサイズ</th>
                <td>{{selectedSmartphone1.acf.sim_size}}</td>
                <td>{{selectedSmartphone2.acf.sim_size}}</td>
            </tr>
            <tr>
                <th>デュアルSIM</th>
                <td>{{ convertValue(selectedSmartphone1.acf.dual_sim) }}</td>
                <td>{{ convertValue(selectedSmartphone2.acf.dual_sim) }}</td>
            </tr>
            <tr>
                <th>Wi-Fi</th>
                <td>{{selectedSmartphone1.acf.wireless_finding}}</td>
                <td>{{selectedSmartphone2.acf.wireless_finding}}</td>
            </tr>
            <tr>
                <th>Bluetooth</th>
                <td>{{selectedSmartphone1.acf.bluetooth}}</td>
                <td>{{selectedSmartphone2.acf.bluetooth}}</td>
            </tr>
            <tr>
                <th>取扱店</th>
                <td><span><a v-if="selectedSmartphone1.acf.dealer_docomo" href="https://www.docomo.ne.jp/" target="_blank">docomo </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_au" href="https://www.au.com/" target="_blank"> au </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_softbank" href="https://www.softbank.jp/" target="_blank"> SoftBank </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_rakuten" href="https://network.mobile.rakuten.co.jp/" target="_blank"> 楽天モバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_ahamo" href="https://ahamo.com/" target="_blank"> ahamo </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_line" href="https://www.linemo.jp/" target="_blank"> LINEMO </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_uq" href=" https://www.uqwimax.jp/" target="_blank"> UQモバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_yahoo" href="https://www.ymobile.jp/" target="_blank"> Y!モバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_iijmio" href=" https://www.iijmio.jp/" target="_blank"> IIjmio </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_mineo" href="https://mineo.jp/" target="_blank"> mineo </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_biglobe" href="https://join.biglobe.ne.jp/mobile/" target="_blank"> BIGLOBEモバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_aeon" href="https://aeonmobile.jp/" target="_blank"> イオンモバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_qt" href=" https://www.qtmobile.jp/" target="_blank"> QTモバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_libmo" href="https://www.libmo.jp/" target="_blank"> LIBMO </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_lequios" href="https://www.leqmobile.jp/" target="_blank"> レキオスモバイル </a></span>
                    <span><a v-if="selectedSmartphone1.acf.dealer_links" href="https://linksmate.jp/" target="_blank"> LinksMate </a></span>
                </td>
                <td><span><a v-if="selectedSmartphone2.acf.dealer_docomo" href="https://www.docomo.ne.jp/" target="_blank"> docomo </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_au" href="https://www.au.com/" target="_blank"> au </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_softbank" href="https://www.softbank.jp/" target="_blank"> SoftBank </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_rakuten" href="https://network.mobile.rakuten.co.jp/" target="_blank"> 楽天モバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_ahamo" href="https://ahamo.com/" target="_blank"> ahamo </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_line" href="https://www.linemo.jp/" target="_blank"> LINEMO </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_uq" href=" https://www.uqwimax.jp/" target="_blank"> UQモバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_yahoo" href="https://www.ymobile.jp/" target="_blank"> Y!モバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_iijmio" href=" https://www.iijmio.jp/" target="_blank"> IIjmio </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_mineo" href="https://mineo.jp/" target="_blank"> mineo </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_biglobe" href="https://join.biglobe.ne.jp/mobile/" target="_blank"> BIGLOBEモバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_aeon" href="https://aeonmobile.jp/" target="_blank"> イオンモバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_qt" href=" https://www.qtmobile.jp/" target="_blank"> QTモバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_libmo" href="https://www.libmo.jp/" target="_blank"> LIBMO </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_lequios" href="https://www.leqmobile.jp/" target="_blank"> レキオスモバイル </a></span>
                    <span><a v-if="selectedSmartphone2.acf.dealer_links" href="https://linksmate.jp/" target="_blank"> LinksMate </a></span>
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
export default {
props: {
    selectedSmartphone1: {
    type: Object,
    required: true,
    },
    selectedSmartphone2: {
    type: Object,
    required: true,
    },
},
data() {
    return {
      // ... (省略) ...
    tabs: [
        { id: 'super-wide', label: '超広角' },
        { id: 'wide', label: '広角' },
        { id: 'tele', label: '望遠' },
        { id: 'macro', label: 'マクロ' },
        ],
    activeTab: 'super-wide',
};
},
computed: {
    filteredKeys() {
        // Find common keys that meet the exclusion criteria
        return Object.keys(this.selectedSmartphone1.acf).filter(
            key =>
            (this.selectedSmartphone1.acf[key] === '-' && this.selectedSmartphone2.acf[key] === '-') ||
            (this.selectedSmartphone1.acf[key] === false && this.selectedSmartphone2.acf[key] === false)
        );
    },
},
methods: {
    convertValue(value) {
    // Convert true to "〇" and false to "ー"
    return value === true ? '〇' : value === false ? '-' : value;
    },
    convertMemory(value) {
      // Convert "-" to an empty string or add "/" and "GB" for non-"-" values
        return value === '-' || value === '' ? '' : ` / ${value}GB`;
    },
    showContent(tabId) {
      // 選択されたタブをアクティブにする
        this.activeTab = tabId;

        // 選択されたタブに対応するコンテンツを表示する
        const selectedContent = document.getElementById(`${tabId}-content`);
        if (selectedContent) {
            document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active-content');
            });
            selectedContent.classList.add('active-content');
        }
    },
    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const mobilePhoneHead = document.getElementById('mobile-phone-head');
            const offset = mobilePhoneHead.offsetHeight + 180;

            window.scrollTo({
            top: section.offsetTop - offset,
            behavior: 'smooth',
            });
        }
    },
    formatColor(color) {
    // 色の文字列内に<br>が含まれていれば改行として扱う
    return color ? color.replace(/<br>/g, '<br>') : '';
  },
    
},
};
</script>


<style scoped>
a{
    color:#2da4ff;
    text-decoration: underline;;
}

h2{
	font-size: 1.5rem;
    line-height: 2rem;
    --tw-text-opacity: 1;
    color: rgba(59, 130, 246, var(--tw-text-opacity));
    font-weight:500;
}

table{
    text-align: center;
    width:100%;
    margin-bottom:4rem;
}

tr{
    border-bottom:solid 1px rgba(59, 130, 246,1);
    line-height: 3rem;
}

tr:first-child{
    border-top:solid 1px rgba(59, 130, 246,1);
}

.core_clock{
    line-height:1.5rem;
}

th{
    width:25%;
    border-left:solid 1px #e5e7eb;
}

th, td{
    padding:8px 4px;
    border-right:solid 1px #e5e7eb;
}

td{
    width:calc((100% - 25%)/2);
    overflow-wrap:break-word;
}

#mobile-phone-head table th,
#mobile-phone-head table td
{
    border:none;
}

#mobile-phone-head>table>tr>th{
    border-left:solid 2px #e5e7eb;
}

#mobile-phone-head>table>tr>td{
    border-left:solid 2px #e5e7eb;
    border-right:solid 2px #e5e7eb;
}


/*画角別スペックのタブ切替*/
.toggle-button tr .tab-container {
    border:none;
}

.tab {
cursor: pointer;
padding: 10px;
margin-right: 10px;
border: 1px solid #ccc;
background-color:#fafafa;
}

.tab-content {
display: none;
}

.active-tab {
color:white;
background:#004582;
border-color: #000;
}

.toggle-button{
border-top:solid 2px #004582;
border-right:solid 1px #004582;
border-left:solid 1px #004582;
background-color: #d8edff;
}

.active-content {
display: table-row-group;
border-right:solid 1px #004582;
border-bottom:solid 2px #004582;
border-left:solid 1px #004582;
width:100%;
}
/*end 画角別スペックのタブ切替*/

@media(max-width:478px){
    *{
        line-height:1.2rem;
        font-size:14px;
    }
}
</style>
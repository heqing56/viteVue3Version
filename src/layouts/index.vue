<template>
    <div class="pages">
        <div class="container">
            <Nav></Nav>
            <div class="main" :class="{ 'is-collapse': collapse }">
                <div class="top fixed-header" :class="{ 'is-collapse': collapse }">
                    <Header></Header>
                    <Tabs></Tabs>
                </div>
                <div class="app-main-container">
                    <Main></Main>
                </div>
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import Nav from './Nav/index.vue'
import Tabs from './Tabs.vue'
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
const { collapse } = storeToRefs(settingStore)


</script>

<style scoped lang="scss">
@mixin fix-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: $base-z-index - 2;
    width: calc(100% - $base-left-menu-width);
}

.pages {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;

    .container {
        padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});

        .main {
            margin-left: $base-left-menu-width;
            transition: margin-left $base-transition-time;

            &.is-collapse {
                margin-left: $base-left-menu-width-min;
                border-right: 0;
            }

            .top {
                box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
                transition: width $base-transition-time;

                &.fixed-header {
                    @include fix-header;
                }

                &.is-collapse {
                    width: calc(100% - $base-left-menu-width-min);
                }
            }
        }
        .app-main-container{
            padding: 20px;
        }
    }
}
</style>
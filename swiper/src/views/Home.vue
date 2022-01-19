<template>
  <div class="pos-r home">

      <div class="pos-a pos-c" :class="{'p-l': swiperFlag, 'p-r': !swiperFlag}">
        <swiper class="mine-swiper" ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="lists in liLists" :key="`${lists.id}${Math.random()}`">
            <ul class="flex-ul">
              <li class="flex-li" v-for="item in lists.lists" :key="item.title" @click="changeRoute(item)">
                <div class="item-title">{{ item.title }}</div>
                <div class="item.content">{{ item.content }}</div>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
      <div class="pos-a pos-c" :class="{'p-l': !swiperFlag, 'p-r': swiperFlag}">
        <div class="mine-swiper" @click="back">back</div>
      </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'


import 'swiper/css/swiper.css'

interface ListItem {
  title: string;
  content: string;
  imgSource: any;
}

interface ListInter {
  id: string;
  lists: Array<ListItem>
}

@Component({
  name: 'Home',
  components: { Swiper, SwiperSlide },
})
export default class Home extends Vue {
  private swiperOptions: any = {}
  private liLists: Array<ListInter> = [
    {
      id: 'aaa',
      lists: [
        { title: 'a-t-1', content: 'a-c-1', imgSource: 'a-i-1' },
        { title: 'a-t-2', content: 'a-c-2', imgSource: 'a-i-2' },
        { title: 'a-t-3', content: 'a-c-3', imgSource: 'a-i-3' },
        { title: 'a-t-4', content: 'a-c-4', imgSource: 'a-i-4' },
        { title: 'a-t-5', content: 'a-c-5', imgSource: 'a-i-5' },
        { title: 'a-t-6', content: 'a-c-6', imgSource: 'a-i-6' }
      ]
    },
    {
      id: 'bbb',
      lists: [
        { title: 'b-t-1', content: 'b-c-1', imgSource: 'b-i-1' },
        { title: 'b-t-2', content: 'b-c-2', imgSource: 'b-i-2' },
        { title: 'b-t-3', content: 'b-c-3', imgSource: 'b-i-3' }
      ]
    },
    {
      id: 'ccc',
      lists: [
        { title: 'c-t-1', content: 'c-c-1', imgSource: 'c-i-1' },
        { title: 'c-t-2', content: 'c-c-2', imgSource: 'c-i-2' },
        { title: 'c-t-3', content: 'c-c-3', imgSource: 'c-i-3' }
      ]
    }
  ]
  private swiperFlag = true
  public changeRoute (item: ListItem): void {
    console.log(item)
    this.back()
    // this.$router.push('/about')
  }
  public back (): void {
    this.swiperFlag = !this.swiperFlag
  }
}
</script>
<style lang="scss">
  .pos-r {
    position: relative
  }
  .pos-a {
    position: absolute
  }
  .home {
    margin: 0 auto;
    width: 700px;
    height: 500px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .mine-swiper {
    width: 700px;
    height: 500px;
    box-sizing: border-box;
    border: 1px solid #aaa;
  }
  .flex-ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .flex-li {
    margin-top: 20px;
    margin-right: 20px;
    width: 160px;
    height: 120px;
  }
  .pos-c {
    top: 0;
    transition: all .5s
  }
  .p-l {
    opacity: 1;
    left: 0;
  }
  .p-r {
    opacity: 0;
    left: 100%;
  }
</style>

<template>
  <div v-if="link" class="link">
    <div class="link-header">
      <img class="favicon img-lazy" alt="icon" :src="link.icon" />
      <a class="url icon" @click.prevent="viewLink" rel="noopener">
        <span class="disable">{{ link.title }}</span>
      </a>
    </div>
    <div class="link-desc">
      <span class="link-desc-text">
        {{ parseDate(link.create_time) }}
        <span class="gap">｜</span>
        {{ link.desc }}
      </span>
    </div>
    <div class="link-tags">
      <a v-for="(tag, i) in link.tags" :key="i" class="tag-item icon" href="?tag=标签}">
        #{{ tag.name }}
      </a>
    </div>
    <div class="link-opts">
      <a>
        <svg
          t="1726443111970"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1157"
          width="200"
          height="200"
        >
          <path
            d="M448.2 185.5h110.1c14.5 0 27.3-12.9 27.3-27.3 0-14.5-12.9-27.3-27.3-27.3H448.2c-14.5 0-27.3 12.9-27.3 27.3s11.2 27.3 27.3 27.3z m0 0"
            fill="#1296db"
            p-id="1158"
          ></path>
          <path
            d="M558.4 189.5H448.2c-17.6 0-31.3-13.8-31.3-31.3 0-16.7 14.6-31.3 31.3-31.3h110.1c16.7 0 31.3 14.6 31.3 31.3 0.1 16.6-14.6 31.3-31.2 31.3z m-110.2-54.7c-12.2 0-23.3 11.1-23.3 23.3 0 11.5 8.7 23.3 23.3 23.3h110.1c12.2 0 23.3-11.1 23.3-23.3s-11.1-23.3-23.3-23.3H448.2zM464.9 677.1c8.2 0 16.4-3.1 22.7-9.4L729.3 426c12.5-12.5 12.5-32.8 0-45.4-12.5-12.5-32.9-12.5-45.4 0l-219 219-98.2-98.2c-12.5-12.5-32.8-12.5-45.4 0-12.5 12.5-12.5 32.8 0 45.4l120.8 120.8c6.4 6.4 14.6 9.5 22.8 9.5z m0 0"
            fill="#1296db"
            p-id="1159"
          ></path>
          <path
            d="M464.9 678.1c-8.8 0-17.1-3.4-23.4-9.7L320.7 547.6c-6.2-6.2-9.7-14.6-9.7-23.4s3.4-17.1 9.7-23.4c6.2-6.3 14.6-9.7 23.4-9.7 8.8 0 17.1 3.4 23.4 9.7l97.4 97.4L683.2 380c6.2-6.2 14.6-9.7 23.4-9.7 8.8 0 17.2 3.4 23.4 9.7 12.9 12.9 12.9 33.9 0 46.8L488.3 668.4c-6.2 6.3-14.6 9.7-23.4 9.7z m-120.8-185c-8.3 0-16.1 3.2-22 9.1-5.9 5.9-9.1 13.7-9.1 22s3.2 16.1 9.1 22L442.9 667c5.9 5.9 13.7 9.1 22 9.1s16.1-3.2 22-9.1l241.7-241.7c12.1-12.1 12.1-31.8 0-44-5.9-5.9-13.7-9.1-22-9.1s-16.1 3.2-22 9.1L464.9 601.1 366 502.2c-5.8-5.9-13.6-9.1-21.9-9.1z"
            fill="#1296db"
            p-id="1160"
          ></path>
          <path
            d="M797.6 895.7H219.7c-53.3 0-96.7-43.4-96.7-96.7V224.5c0-53.3 43.4-96.7 96.7-96.7h133.1v60H219.7c-20.2 0-36.7 16.5-36.7 36.7V799c0 20.2 16.5 36.7 36.7 36.7h577.9c20.2 0 36.7-16.5 36.7-36.7V224.5c0-20.2-16.5-36.7-36.7-36.7H652.9v-60h144.7c53.3 0 96.7 43.4 96.7 96.7V799c0 53.4-43.4 96.7-96.7 96.7z"
            fill="#1296db"
            p-id="1161"
          ></path>
          <path
            d="M354.6 187.8H217.5c-16.6 0-30-13.4-30-30s13.4-30 30-30h137.1c16.6 0 30 13.4 30 30s-13.5 30-30 30z"
            fill="#1296db"
            p-id="1162"
          ></path>
          <path
            d="M795.7 187.8H647.6c-16.6 0-30-13.4-30-30s13.4-30 30-30h148.2c16.6 0 30 13.4 30 30s-13.5 30-30.1 30z"
            fill="#1296db"
            p-id="1163"
          ></path>
        </svg>
        <span class="label">未读</span>
      </a>
      <span class="gap">｜</span>

      <a>
        <svg
          t="1726443086865"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="949"
          width="200"
          height="200"
        >
          <path
            d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z"
            fill="#1296db"
            p-id="950"
          ></path>
          <path
            d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z"
            fill="#1296db"
            p-id="951"
          ></path>
        </svg>
        <span class="label">编辑</span>
      </a>
      <span class="gap">｜</span>
      <a class="btn" @click.prevent="copyLink">
        <svg
          t="1726983705360"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1256"
          width="200"
          height="200"
        >
          <path
            d="M314.2144 401.9712a32 32 0 0 1 0 45.2608l-22.8608 22.912a181.504 181.504 0 0 0-4.736 251.776l4.736 4.8896a181.504 181.504 0 0 0 251.776 4.736l4.8896-4.736 22.8864-22.8864a32 32 0 0 1 45.2608 45.2608l-22.8864 22.8864c-94.1056 94.1056-245.5808 95.8464-341.8112 5.2224l-5.376-5.2224c-94.1056-94.1056-95.8464-245.5808-5.2224-341.8112l5.2224-5.376 22.8608-22.8864a32 32 0 0 1 45.2608 0z m120.5504-165.76a245.504 245.504 0 0 1 347.1872 0c94.1056 94.1056 95.8464 245.5808 5.2224 341.8112l-5.2224 5.376-22.8864 22.8864a32 32 0 0 1-45.2608-45.2608l22.8864-22.8864a181.504 181.504 0 0 0 4.736-251.776l-4.736-4.8896a181.504 181.504 0 0 0-251.776-4.736l-4.8896 4.736-22.912 22.8608a32 32 0 0 1-45.2608-45.2352l22.912-22.8864z"
            fill="#8a8a8a"
            p-id="1257"
          ></path>
          <path
            d="M604.5696 413.5936a32 32 0 0 1 2.2016 42.8032l-2.2016 2.432-135.8592 135.8848a32 32 0 0 1-47.4368-42.8288l2.2016-2.432 135.8592-135.8592a32 32 0 0 1 45.2352 0z"
            fill="#8a8a8a"
            p-id="1258"
          ></path>
        </svg>
        <span class="label">复制链接</span>
      </a>
      <span class="gap">｜</span>
      <a>
        <svg
          t="1726984790270"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2240"
          width="200"
          height="200"
        >
          <path
            d="M970.88 803.2V375.04a98.56 98.56 0 0 0-97.92-97.92h-152.32L696.32 192a64 64 0 0 0-64-43.52H393.6a64 64 0 0 0-64 43.52l-26.24 84.48H151.04A97.92 97.92 0 0 0 53.12 375.04v428.8a97.92 97.92 0 0 0 97.92 97.92h721.92a98.56 98.56 0 0 0 97.92-98.56z m-64 0a33.92 33.92 0 0 1-33.92 33.92H151.04a33.92 33.92 0 0 1-33.92-33.92V375.04a33.92 33.92 0 0 1 33.92-33.92h176.64A32 32 0 0 0 359.04 320L384 211.2a14.08 14.08 0 0 1 7.04 0h243.84L665.6 320a32 32 0 0 0 30.72 23.68h176.64a33.92 33.92 0 0 1 33.92 33.92z"
            fill="#bfbfbf"
            p-id="2241"
          ></path>
          <path
            d="M284.16 423.04H209.28a16 16 0 0 0 0 32h74.88a16 16 0 0 0 0-32zM512 384a188.16 188.16 0 1 0 188.16 192A188.8 188.8 0 0 0 512 384z m0 345.6A156.16 156.16 0 1 1 668.16 576 156.8 156.8 0 0 1 512 729.6z"
            fill="#bfbfbf"
            p-id="2242"
          ></path>
        </svg>
        <span class="label">快照</span>
      </a>
      <span class="gap">｜</span>
      <a>
        <svg
          t="1726443127562"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1369"
          width="200"
          height="200"
        >
          <path
            d="M684.56 158H339.44a32 32 0 0 1 0-64h345.12a32 32 0 0 1 0 64zM522.52 736.72a32 32 0 0 1-32-32v-240a32 32 0 1 1 64 0v240a32 32 0 0 1-32 32zM903.42 299H120.58a32 32 0 1 1 0-64h782.84a32 32 0 1 1 0 64z"
            p-id="1370"
            fill="#1296db"
          ></path>
          <path
            d="M669.02 964h-314a188.76 188.76 0 0 1-188.54-188.54V410.1a32 32 0 0 1 64 0v365.36A124.68 124.68 0 0 0 354.98 900h314a124.68 124.68 0 0 0 124.54-124.54V410.1a32 32 0 1 1 64 0v365.36A188.76 188.76 0 0 1 669.02 964z"
            p-id="1371"
            fill="#1296db"
          ></path>
        </svg>
        <span class="label">删除</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  link: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(['edit', 'delete', 'copy', 'archive', 'read', 'unread']);


function viewLink(evt){
    emit('read', props.link.id)
    window.open(props.link.url)
}

function copyLink(evt){
    console.log(evt)
    emit('copy', props.link.id)
    window.navigator.clipboard.writeText(props.link.url).then(()=>{
        evt.target.lastChild.innerText = '复制成功'
        setTimeout(() => {
        evt.target.lastChild.innerText = '复制链接'
            
        }, 3000);
    })
}
function parseDate(dt){
  let date = new Date(dt)
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

</script>

<style scoped lang="scss">
.link {
  display: flex;
  flex-direction: column;
  gap: 0em 0.5em;
  padding: 0.5em;
  margin: 0.5em 0em;
  border-radius: 0.2em;
  box-sizing: border-box;
  background-color: #f1f0f0;

  .link-header {
    display: flex;
    align-items: center;
    gap: 0.5em;

    img.favicon {
      width: 1.2em;
      height: 1.2em;
      border-radius: 0.1em;
    }

    a {
      width: 100%;
      word-break: break-all;
      color: $--base-color;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .link-desc {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .link-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0em 1em;

    .tag-item {
      color: $--base-color;
    }
  }

  .link-opts {
    display: flex;
    margin-top: .5em;
    a {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: $--base-color;
        color: #fff;
        path {
            fill: #fff !important;
        }
      }
      svg {
        width: 1em;
        height: 1em;
        path {
          fill: $--base-color !important;
        }
      }
    }
  }
}
</style>

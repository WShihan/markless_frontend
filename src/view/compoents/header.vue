<template>
  <div class="header">
    <div class="icon">
        <svg t="1727296045975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1132" width="200" height="200"><path d="M791.272727 89.041455C791.272727 0 698.181818 0 698.181818 0L325.818182 0c0 0-93.090909 0-93.090909 89.041455L232.727273 1024l279.272727-267.124364L791.272727 1024 791.272727 89.041455z" p-id="1133" fill="#1296db"></path></svg>
    </div>
    <div class="navs">
        <ul>
            <li>
                <button class="active">所有</button>
            </li>
            <li>
                <button>未读</button>
            </li>
            <li>
                <button>已读</button>
            </li>
            <li>
                <button>+书签</button>
            </li>
            <li>
                <button>标签</button>
            </li>
            <li>
                <button>设置</button>
            </li>
            <li>
                <button>登出</button>
            </li>
        </ul>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    gap:1em;
    border-bottom: 1px solid $--sep-color;
    padding-bottom: .2em;
    .navs {
        flex: 1;
        ul {
        display: flex;
        justify-content: flex-end;
        gap: 1em;
        width: 100%;
        ;
        li {
            list-style: none;
            button {
                padding: .2em;
                appearance: none;
                outline: none;
                border: none;
                border-radius: .2em;
                background: transparent;
                color: $--base-color;
                font-size: $--font-size;
                font-weight: bolder;
                cursor: pointer;
                &.active, &:hover {
                    color: #fff;
                    background-color: $--base-color;
                }

            }
        }
    }

    }

    .icon {
        display: flex;
        align-items: center;
        svg {
            width: 2em;
            height: 2em;
        }
    }
}
</style>

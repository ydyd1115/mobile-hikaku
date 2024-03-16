<template>
    <header class="h-32 text-white items-center bg-blue-400">
      <div class="md:ml-8 md:mt-6 mx-auto md:flex md:flex-row md:flex-around">
        <div class="ml-4 my-2 flex flex-col w-full" >
          <h1>
            <a href="https://hikaku-depot.com/" target="blank" class="title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <span class="text-white text-xl md:text-3xl">【比較デポ】</span>
            </a>
            <p class="text-lg">最新スマートフォンスペック徹底比較</p>
          </h1>
        </div>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="https://hikaku-depot.com/" target="blank" class="mr-5 hover:text-gray-900">比較デポTOP</a>
          <a href="https://hikaku-depot.com/blog" target="blank" class="mr-5 hover:text-gray-900">記事一覧</a>
          <a href="https://hikaku-depot.com/mobile-phone" target="blank" class="mr-5 hover:text-gray-900">個別スペック一覧</a>
        </nav>
      </div>
    </header>
  </template>
  <script>
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1.5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
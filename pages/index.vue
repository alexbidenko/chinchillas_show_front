<template>
  <div class="mainPage">
    <div class="mainPage__headerContainer">
      <section class="mainPage__header">
        <div class="mainPage__headerLeft">
          <h3 class="mainPage__question">Кто мы?</h3>
          <p class="mainPage__answer">Международный сервис для</p>
          <ul>
            <li class="mainPage__answerItem">
              регистрации шиншилл на выставках
            </li>
            <li class="mainPage__answerItem">ведения генетической базы</li>
            <li class="mainPage__answerItem">продажи/покупки шиншилл</li>
          </ul>
        </div>
        <div class="mainPage__headerRight">
          <WaterButton class="mainPage__auth" to="/profile"
            >Перейти в личный кабинет</WaterButton
          >
          <div class="mainPage__social">
            <nuxt-link
              v-for="item in socials"
              :key="item.icon"
              class="mainPage__socialLink"
              aria-label="social link"
              to=""
            >
              <svg class="mainPage__socialIcon">
                <use :xlink:href="item.icon" />
              </svg>
            </nuxt-link>
          </div>
        </div>
      </section>
      <h1 class="mainPage__siteName">CHINCHILLAS-SHOW</h1>
      <div
        class="mainPage__infoContainer"
        :class="{ 'mainPage__infoContainer--show': statistics }"
      >
        <div class="mainPage__infoGroup">
          <span class="mainPage__count">{{
            statistics ? statistics.totalChinchillas : ''
          }}</span>
          <p class="mainPage__label">
            Всего зарегистрированных<br />шиншилл на сайте
          </p>
        </div>
        <div class="mainPage__infoGroup">
          <span class="mainPage__count">{{
            statistics ? statistics.totalUsers : ''
          }}</span>
          <p class="mainPage__label">Активных пользователей<br />на сайте</p>
        </div>
        <div class="mainPage__infoGroup">
          <span class="mainPage__count">{{
            statistics ? statistics.activeSales : ''
          }}</span>
          <p class="mainPage__label">На продажу сейчас<br />шиншилл</p>
        </div>
        <div class="mainPage__infoGroup">
          <span class="mainPage__count">{{
            statistics ? statistics.totalSold : ''
          }}</span>
          <p class="mainPage__label">Успешных сделок<br />совершенных ранее</p>
        </div>
      </div>
    </div>

    <div class="mainPage__features">
      <FeatureSection
        v-for="(item, index) in features"
        :key="item.url"
        :title="item.title"
        :text="item.text"
        :url="item.url"
        :image="item.image"
        :action-text="item.action"
        :reverse="index % 2 === 1"
      />
    </div>
  </div>
</template>

<script>
import WaterButton from '~/components/WaterButton/WaterButton.vue'
import FeatureSection from '~/components/FeatureSection/FeatureSection.vue'
import sprite from '~/assets/sprites/common.svg'

export default {
  components: {
    WaterButton,
    FeatureSection,
  },

  data() {
    return {
      statistics: null,
      socials: [
        {
          icon: `${sprite}#icon-twitter`,
          href: '#',
        },
        {
          icon: `${sprite}#icon-vk`,
          href: '#',
        },
        {
          icon: `${sprite}#icon-fb`,
          href: '#',
        },
        {
          icon: `${sprite}#icon-instagram`,
          href: '#',
        },
        {
          icon: `${sprite}#icon-youtube`,
          href: '#',
        },
      ],
      features: [
        {
          title: 'Лучшая генетическая база шиншилл',
          text:
            'Заполняйте информацию о своих питомцах, отслеживайте родословные покупаемых шиншилл получите полный информационный контроль над своими и не только животными',
          action: 'Перейти в профиль',
          url: '/profile',
          image: 'https://br-chinchillas.ru/assets/head_image_babies.jpg',
        },
        {
          title: 'Экспертиза шиншилл онлайн',
          text:
            'Вся информация о проводимой в текущий момент выставке в режиме реального времени с вашего компьютреа или телефона в любой точке мира',
          action: 'Посетить РАЭШ',
          url: '/raech',
          image:
            'https://pp.userapi.com/c846524/v846524738/1e6669/6T9gXET5WnU.jpg',
        },
        {
          title: 'Аукцион лучших шиншилл',
          text:
            'Покупайте и продавайте лучших зверей со своего персонального компьютера с минимальными усилиями и по лучшим ценам',
          action: 'Зайти на аукцион',
          url: '/auction',
          image: 'https://br-chinchillas.ru/assets/head_image_purchases.jpg',
        },
      ],
    }
  },

  async fetch() {
    this.statistics = await this.$axios.$get('site/statistics')
  },
}
</script>

<style lang="scss">
.mainPage {
  background: #f6f7ff;
  width: 100%;
  overflow: hidden;

  &__headerContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-height: 100vh;
    padding: 60px 0;
  }

  &__header {
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85.5vw;
    margin: 0 auto 40px;

    @include mq('desktop') {
      width: 72.5vw;
    }

    @include mq('desktop-small') {
      width: 85.5vw;
    }

    @include mq('tablet') {
      width: 67.5vw;
      display: block;
    }

    @include mq('tablet-small') {
      width: 80vw;
    }

    @include mq('phone') {
      width: 94vw;
    }
  }

  &__headerLeft ul {
    @include mq('tablet-small') {
      padding-left: 8px;
    }
  }

  &__question {
    font-weight: 800;
    font-size: 36px;
    line-height: 45px;
    text-transform: uppercase;
    color: #262626;
    margin-bottom: 24px;
  }

  &__answer {
    font-weight: 500;
    font-size: 26px;
    line-height: 33px;
    text-transform: uppercase;
    color: #d79b00;
  }

  &__answerItem {
    padding-left: 32px;
    position: relative;
    font-weight: 500;
    font-size: 18px;
    line-height: 34px;
    color: #262626;

    @include mq('tablet-small') {
      font-size: 14px;
      line-height: 24px;
      padding-left: 24px;
    }

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: calc(50% - 3px);
      background-color: #d79b00;
    }
  }

  &__headerRight {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include mq('desktop-small') {
      padding-top: 24px;
    }

    @include mq('tablet') {
      align-items: center;
      padding-top: 40px;
    }
  }

  &__siteName {
    background-color: #cacaca;
    color: transparent;
    text-shadow: 0 2px 6px rgba(255, 255, 255, 0.5);
    background-clip: text;
    font-size: 132px;
    font-weight: 700;
    margin-bottom: 40px;
    display: flex;
    text-align: center;
    padding: 0 20px;

    @include mq('desktop') {
      font-size: 102px;
    }

    @include mq('desktop-small') {
      font-size: 86px;
    }

    @include mq('tablet') {
      font-size: 56px;
    }

    @include mq('tablet-small') {
      font-size: 36px;
    }

    @include mq('phone') {
      font-size: 24px;
    }
  }

  &__infoContainer {
    display: flex;
    align-items: center;
    width: 85.5vw;
    flex-wrap: wrap;
    margin: 40px 0;
    opacity: 0;

    @include mq('desktop') {
      top: 30.7%;
      width: 72.5vw;
    }

    @include mq('desktop-small') {
      top: 27%;
      width: 85.5vw;
    }

    @include mq('tablet') {
      top: 20.9%;
      width: 67.5vw;
    }

    @include mq('tablet-small') {
      justify-content: center;
      top: 24.2%;
      width: 80vw;
    }

    @include mq('phone') {
      width: 94vw;
    }

    &--show {
      animation: show-statistics 3s ease forwards;
    }
  }

  &__infoGroup {
    display: flex;
    align-items: center;
    width: 25%;
    padding: 0 15px;

    @include mq('desktop') {
      padding: 0;
    }

    @include mq('tablet') {
      padding: 12px 0;
      width: 50%;
    }

    @include mq('tablet-small') {
      padding: 7px 0;
      width: calc(100% / 2);
      flex-direction: column;
      height: 76px;

      &:nth-of-type(2) {
        order: 0;
      }

      &:nth-of-type(1) {
        order: 1;
      }

      &:nth-of-type(3) {
        order: 2;
      }

      &:nth-of-type(4) {
        order: 3;
      }
    }
  }

  &__count {
    font-weight: 500;
    font-size: 65px;
    line-height: 52px;
    letter-spacing: -0.01em;
    color: #d79b00;
    margin-right: 13px;

    @include mq('desktop') {
      font-size: 36px;
      line-height: 36px;
      margin-right: 12px;
    }

    @include mq('tablet-small') {
      font-size: 28px;
      line-height: 28px;
      margin-right: 0;
      margin-bottom: 6px;
    }
  }

  & &__label {
    white-space: nowrap;
    font-weight: 300;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: -0.01em;
    color: #d79b00;
    align-self: flex-end;
    margin-bottom: 0;

    @include mq('desktop') {
      font-size: 14px;
      line-height: 18px;
    }

    @include mq('tablet-small') {
      font-size: 10px;
      line-height: 14px;
      text-align: center;
      align-self: initial;
    }
  }

  &__social {
    display: flex;
    margin-top: 40px;

    @include mq('tablet-small') {
      margin-left: 0;
      margin-top: 14px;
    }
  }

  &__socialLink {
    display: block;
    flex-shrink: 0;
    height: 45px;
    position: relative;
    width: 46px;
    cursor: auto;

    @include mq('desktop', 'tablet') {
      height: 40px;
      width: 40px;
    }

    @include mq('tablet') {
      height: 35px;
      width: 35px;
    }

    & + & {
      margin-left: 9px;

      @include mq('desktop') {
        margin-left: 10px;
      }

      @include mq('desktop-small') {
        padding-bottom: 5px;
        margin-left: 4px;
      }
    }
  }

  &__socialIcon {
    height: 100%;
    fill: rgba(165, 173, 239, 0.3);
    left: 0;
    position: absolute;
    top: 0;
    transition: 0.3s fill ease;
    width: 100%;
    z-index: 1;
  }

  @keyframes show-statistics {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }

    30% {
      opacity: 0;
      transform: translateY(40px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__features {
    background-color: #c6c1c0;
    width: 100%;
  }
}
</style>

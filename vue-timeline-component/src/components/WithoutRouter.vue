<template>
  <div id="app" ref="app">
    <header class="header-app" ref="headerApp">
      <div class="avatar" :style="{background: 'url(https://pbs.twimg.com/profile_images/543855558348902402/8SNwBKWg_400x400.png)', backgroundSize: 'cover'}"></div>
      <h1>Click on a tile - Simple Version</h1>
    </header>

    <div class="menus">
      <SourcePointTimeline
        v-for="menu in menus"
        :show="menu.show" 
        :key="menu.id" 
        @enter="enterMenu(menu)"
        @leave="leaveMenu(menu)"
        @leaveComplete="leaveCompleteMenu(menu)"
        :setup="fullscreenSetup"
        class="menu-wrapper"
      >
        <div class="menu" :ref="`menu-${menu.id}`" @click="toggleMenu(menu)" :class="{'is-unfold': menu.unfold}">
          <div class="menu-content" >
            <div class="menu-case">{{ menu.id }}</div>
            <div class="menu-unfold">
              <p><strong>Click again to get back to the home screen</strong></p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend vel nisi in accumsan. Cras eu magna accumsan, ullamcorper elit eget, pretium ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut commodo ligula nulla, non euismod magna posuere eget. Maecenas non nisi lobortis, vestibulum dui in, faucibus lectus. Sed mauris mauris, dapibus vitae sagittis egestas, varius nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus blandit ut erat a commodo. Sed et est suscipit, condimentum ex eu, porta nisi.</p>
            </div>
          </div>
          <div class="menu-footer">
            <div class="menu-footer-body">Message {{ menu.id }}</div>
          </div>
        </div>
      </SourcePointTimeline>
    </div>
  </div>
</template>

<script>
import SourcePointTimeline from '../components/SourcePointTimeline'
import { TimelineMax, TweenMax, Power2, TweenLite } from 'gsap/all';

export default {
  name: 'app',
  data() {
    return {
      menus: Array(10).fill().map((v, k) => ({id: k, show: false, unfold: false}))
    }
  },
  components: {
    SourcePointTimeline,
  },
  methods: {
    toggleMenu(menu) {
      menu.show = !menu.show;
    },
    enterMenu(menu) {
      menu.unfold = true;
      TweenLite.to(window, 0.3, { scrollTo: "#app" });
    },
    leaveMenu(menu) {
      TweenLite.to(window, 1.5, { scrollTo: this.$refs[`menu-${menu.id}`][0] });
    },
    leaveCompleteMenu(menu) {
      if(!menu.show) {
        menu.unfold = false;
      }
    },
    fullscreenSetup(el, rect) {
      const context = this.$refs.app.getBoundingClientRect();
      const headerStyle = window.getComputedStyle(this.$refs.headerApp);
      // const headerPaddingLeft = headerStyle.getPropertyValue('padding-left');
      const headerHeight = headerStyle.getPropertyValue('height');

      TweenMax.set(el, {
        position: 'absolute',
        left:rect.left - context.left, 
        top:rect.top - context.top, 
      });

      TweenMax.set(el.querySelector('.menu-unfold'), { paddingTop: headerHeight, display: 'block', opacity: 0, y: 15 });
      // TweenMax.set(el.querySelectorAll('.menu-unfold p'), { opacity: 0, y: 15 });

      const tl = new TimelineMax();
      tl.to(el, 0.5, { top: 0, left: 0, width: '100%', height: '100%', ease: Power2.easeOut});
      tl.to(el.querySelector('.menu-case'), 0.2, { y: -20 }, 0);
      tl.to(el.querySelector('.menu-footer'), 0, { top: 0 }, 0);
      // tl.to(el.querySelector('.menu-footer'), 0.33, { fontSize: '2em', paddingLeft: headerPaddingLeft, lineHeight: headerHeight, height: headerHeight, ease: Power2.easeIn}, 0);
      // tl.staggerTo(el.querySelectorAll('.menu-unfold p'), 0.4, { opacity: 1, y: 0 }, 0.15);
      // tl.to(el.querySelectorAll('.menu-unfold p'), 0.2, { opacity: 1, y: 0 });
      tl.to(el.querySelectorAll('.menu-unfold'), 0.2, { opacity: 1, y: 0 });

      return tl;
    }
  }
}
</script>

<style lang="scss">

*, *:before, *:after { 
  box-sizing: border-box;
}

body {
  background-color: #ebdcbd;
  color:#878787;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

#app {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

$appHeaderHeight: 78px;

.header-app {
  & { 
    display: flex;
    background-color: #5cc5ce; 
    align-items: center;
    padding-left: 15px;
  }

  h1 {
    color: white;
    margin: 0;
    line-height: 2.8em;
  }

  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }  
}

.menus {
  border: 1px solid #4b4a4a;
  display: flex;
  flex-wrap: wrap;
}

$backgroundsPool: (#9becca, #f1efac, #d1a1ea, #ece7ef);
@each $backgroundColor in $backgroundsPool {
  $i: index($backgroundsPool, $backgroundColor);
  $darkerBackgroundColor: darken($backgroundColor, 20%);

  .menu-wrapper:nth-child(#{length($backgroundsPool)}n+#{$i}) .menu {
    & { background-color: $backgroundColor; }
    .menu-footer { background-color: $darkerBackgroundColor };
    .menu-footer-body {
      @if(lightness($darkerBackgroundColor) < 55) {
        color: white; 
      } 
    }
  }
  
}

.next-icon {
  width: 0;
  height: 0;

  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left:8px solid #4a4a4a;
}

.back-icon {
  @extend .next-icon;

  border-left: 0;
  border-right:8px solid #4a4a4a;
}

.menu-wrapper {
  border: 1px solid #4b4a4a;
  width: 50%;
}

.menu {
  $menuHeight: 180px;
  $menuFooterHeight: 40px;
  $menuCaseHeight: $menuHeight - $menuFooterHeight;

  & {
    position: relative;
    padding-bottom: $menuFooterHeight;
    height: $menuHeight;
  }

  .menu-content {
    color:white;
  }

  .menu-case {
    font-size: 2.1em;
    text-align: center;
    text-shadow: 0px 0px 3px #404040;
    position: absolute;
    height: $menuCaseHeight;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-unfold {
    display: none;
    font-size: 1.4em;
    padding: 0 15px;
    color: #4a4a4a;
    opacity: 0.75;
  }


  .menu-footer {
    position: absolute;
    bottom: 0;
    height: $menuFooterHeight;
    line-height: $menuFooterHeight;
    width: 100%;
  }
  

  .menu-footer-body {
    & {
      padding: 0 5px 0 10px;
      color:#4a4a4a;
    }
    
    &:after {
      @extend .next-icon;

      content: '';
      display: block;
      position: absolute;
      top:50%;
      right: 10px;
      margin-top: -8px;
    }

  }

  &.is-unfold {
    .menu-footer {
      font-size: 2em; 
      line-height: $appHeaderHeight;
      height: $appHeaderHeight;
    }

    .menu-footer-body {
      & { padding-left: 35px; }
      
      &:after {
        @extend .back-icon;
        left: 15px;
      }
    }
  }

}


</style>

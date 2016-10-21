# ko-router
simple router for korol
### api
* router.map
* router.start
* router.go
* router.stop
* router.beforeEach
* router.afterEach

### transition
html
```html
<div view-router transtion="fade"></div>
```
css
```css
.fade-transition {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: all .2s ease-out;
}
.fade-enter,
.fade-leave{
    top: 200px;
    opacity: 0
}
```

### updating...

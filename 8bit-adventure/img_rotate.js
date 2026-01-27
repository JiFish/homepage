(function(){!function(a,b){return"function"==typeof define&&define.amd?define(function(){return b()}):"object"==typeof exports?module.exports=b():a.ifvisible=b()}(this,function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;return i={},c=document,k=!1,l="active",g=6e4,f=!1,b=function(){var a,b,c,d,e,f,g;return a=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},e=function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},f={},c="__ceGUID",b=function(a,b,d){return a[c]=void 0,a[c]||(a[c]="ifvisible.object.event.identifier"),f[a[c]]||(f[a[c]]={}),f[a[c]][b]||(f[a[c]][b]=[]),f[a[c]][b].push(d)},d=function(a,b,d){var e,g,h,i,j;if(a[c]&&f[a[c]]&&f[a[c]][b]){for(i=f[a[c]][b],j=[],g=0,h=i.length;h>g;g++)e=i[g],j.push(e(d||{}));return j}},g=function(a,b,d){var e,g,h,i,j;if(d){if(a[c]&&f[a[c]]&&f[a[c]][b])for(j=f[a[c]][b],g=h=0,i=j.length;i>h;g=++h)if(e=j[g],e===d)return f[a[c]][b].splice(g,1),e}else if(a[c]&&f[a[c]]&&f[a[c]][b])return delete f[a[c]][b]},{add:b,remove:g,fire:d}}(),a=function(){var a;return a=!1,function(b,c,d){return a||(a=b.addEventListener?function(a,b,c){return a.addEventListener(b,c,!1)}:b.attachEvent?function(a,b,c){return a.attachEvent("on"+b,c,!1)}:function(a,b,c){return a["on"+b]=c}),a(b,c,d)}}(),d=function(a,b){var d;return c.createEventObject?a.fireEvent("on"+b,d):(d=c.createEvent("HTMLEvents"),d.initEvent(b,!0,!0),!a.dispatchEvent(d))},h=function(){var a,b,d,e,f;for(e=void 0,f=3,d=c.createElement("div"),a=d.getElementsByTagName("i"),b=function(){return d.innerHTML="<!--[if gt IE "+ ++f+"]><i></i><![endif]-->",a[0]};b(););return f>4?f:e}(),e=!1,n=void 0,"undefined"!=typeof c.hidden?(e="hidden",n="visibilitychange"):"undefined"!=typeof c.mozHidden?(e="mozHidden",n="mozvisibilitychange"):"undefined"!=typeof c.msHidden?(e="msHidden",n="msvisibilitychange"):"undefined"!=typeof c.webkitHidden&&(e="webkitHidden",n="webkitvisibilitychange"),m=function(){var b,d;return b=!1,d=function(){return clearTimeout(b),"active"!==l&&i.wakeup(),f=+new Date,b=setTimeout(function(){return"active"===l?i.idle():void 0},g)},d(),a(c,"mousemove",d),a(c,"keyup",d),a(window,"scroll",d),i.focus(d),i.wakeup(d)},j=function(){var b;return k?!0:(e===!1?(b="blur",9>h&&(b="focusout"),a(window,b,function(){return i.blur()}),a(window,"focus",function(){return i.focus()})):a(c,n,function(){return c[e]?i.blur():i.focus()},!1),k=!0,m())},i={setIdleDuration:function(a){return g=1e3*a},getIdleDuration:function(){return g},getIdleInfo:function(){var a,b;return a=+new Date,b={},"idle"===l?(b.isIdle=!0,b.idleFor=a-f,b.timeLeft=0,b.timeLeftPer=100):(b.isIdle=!1,b.idleFor=a-f,b.timeLeft=f+g-a,b.timeLeftPer=(100-100*b.timeLeft/g).toFixed(2)),b},focus:function(a){return"function"==typeof a?this.on("focus",a):(l="active",b.fire(this,"focus"),b.fire(this,"wakeup"),b.fire(this,"statusChanged",{status:l}))},blur:function(a){return"function"==typeof a?this.on("blur",a):(l="hidden",b.fire(this,"blur"),b.fire(this,"idle"),b.fire(this,"statusChanged",{status:l}))},idle:function(a){return"function"==typeof a?this.on("idle",a):(l="idle",b.fire(this,"idle"),b.fire(this,"statusChanged",{status:l}))},wakeup:function(a){return"function"==typeof a?this.on("wakeup",a):(l="active",b.fire(this,"wakeup"),b.fire(this,"statusChanged",{status:l}))},on:function(a,c){return j(),b.add(this,a,c)},off:function(a,c){return j(),b.remove(this,a,c)},onEvery:function(a,b){var c,d;return j(),c=!1,b&&(d=setInterval(function(){return"active"===l&&c===!1?b():void 0},1e3*a)),{stop:function(){return clearInterval(d)},pause:function(){return c=!0},resume:function(){return c=!1},code:d,callback:b}},now:function(a){return j(),l===(a||"active")}}})}).call(this);

function displayNextImage() {
  if( ifvisible.now() ){
    document.getElementById("cardimg").src = 'sample/'+images[imgpos]+'.jpg';
    imgpos = ((imgpos + 1) % images.length);
  }
}

function startTimer() {
  images = shuffleArray(images);
  displayNextImage();
  setInterval(displayNextImage, 5000);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//var images = ['crJQV1I', 'ENOhCNK', 'AsAv9ws', 'gKeCgtH', 'irfWbzX', 'UYmUb2W', 'Vn9Mohw', 'DtcOvur', 'Up3AkpJ', '6etSnc3', 'gwzj3B6', 'mOoG1Hp', 'kFtNtbg', 'Mv8O6YA', 'LYqAKlx', 'DlLdyFC', 'smHY4TU', 'Pnk9OSi', 'JoZxoOY', 'kDhkmvY', 'dWX5QMa', 'YufQBvC', '15SsVwM', 'iepAvOF', 'bag0BzD', 'dI3uTY5', 'J1Z7iEd', 'Hc4vlDk', 'ciLxUo7', 'MZOdW44', '6dsInV7', 'MWmNYcQ', 'qCmOWM9', 'tABODO0', 'ELE7Ieb', 'UnPfBnz', 'Ej49xi4', 'AVSIFSt', 'pqQ0aQ4', 'dSO0CTI', 'Nu523yk', 'fynUf2o', 'vd5WHGA', '75ncFLq', 'iYNwQPN', 'IK2PEUe', 'MhNpNeB', 'pqglxqS', 'PJKeGdv', 'Xh8y6Ah', '0rvzEWe', 'CA3KxYB', 'suVKhmn', 'vMSCino', '9AI5l89', '4ohFqPa', 'jzylcu5', 'U8p5DFC', 'araBNcW', 'lDDJjm0', 'yYL8ipm', 'IpkjgSM', 'XFixDUD', '9X7X8tg', 'JqRTgO9', 'CX4pqV1', 'swopX8R', '2o63a3i', '3wV6Oy9', 'Usp84Du', '6W74W76', 'Vi8BHLp', 'eYeglbA', 'zZSm3C6', 'salP6Xe', 'DXxqKl3', 'YqfBjDK', 'MZIuGOc', 'mp5Uh45', 'q6lm3Yh', 'yWbALj8', 'hv4Q8Ll', 'i9doRKP', 'lK4V7GJ', 'XakKm2A', '6lCLdwO', 'YxfDjcj', 'z1RYhh8', '3ajMEri', 'kuqziLs', 'dxoJrJi', 'BOgzoU6', '9hdeODM', 'daChtQl', 'BisJIj6', '5G6y9Ba', '7NajfRB', 'J46Kluc', 'cd8NGsk', 'lJVnPMl'];

var images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

var imgpos = 0;
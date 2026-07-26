from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(__file__).with_name("source.yaml")
OUTPUT = ROOT / "index.html"


HEAD = """<!DOCTYPE html>
<html>
<!--github-->
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/webp" href="avatar.webp">
    <link rel="canonical" href="https://jifish.co.uk/">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@JiFish">
    <meta name="twitter:title" content="JiFish (Joseph Fowler)">
    <meta name="twitter:description" content="Joseph Fowler's Stuff - games, code, and more.">
    <meta name="twitter:image" content="https://jifish.co.uk/avatar.webp">
    <meta name="twitter:url" content="https://jifish.co.uk/">
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://jifish.co.uk/">
    <meta property="og:title" content="JiFish (Joseph Fowler)">
    <meta property="og:description" content="Joseph Fowler's Stuff - games, code, and more.">
    <meta property="og:image" content="https://jifish.co.uk/avatar.webp">
    <meta property="og:site_name" content="JiFish.co.uk">
    <meta name="description" content="Joseph Fowler's Stuff - games, code, and more.">
    <meta name="robots" content="index, follow">
    <title>JiFish.co.uk</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tomorrow">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <style>
    body {
      text-align: center;
      color: white;
      background-image: url("https://i.jifish.co.uk/u/CocGGO.png");
      background-size: auto 100vh;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      background-attachment: fixed;
      cursor: grab;
    }

    .card-deck {
      margin-left: auto;
      margin-right: auto;
      width: max-content;
    }

    .card {
      color: black;
    }

    .main {
      max-width: 1024px;
      margin-left: auto;
      margin-right: auto;
      background-color: rgba(0, 0, 0, 0.8);
      image-rendering: auto;
      cursor: auto;
    }

    h1 {
      font-family: "Tomorrow", sans-serif;
      font-weight: bold;
    }

    h2 {
      padding-top: 0.5em;
      font-family: "Tomorrow", sans-serif;
      font-weight: bold;
    }

    h3 {
      padding-top: 0.5em;
      font-family: "Tomorrow", sans-serif;
      font-weight: bold;
    }

    .contact {
      font-family: "Tomorrow", sans-serif;
      font-size: larger;
      margin-bottom: 0;
      display: inline-block;
    }

    div.avatar {
      text-align: center;
      padding-top: 0.5em;
    }

    div.avatar img {
      height: 5em;
    }

    .main:last-child {
      padding-bottom: 1rem;
      margin-bottom: 0;
    }

    div.easteregg {
      position: fixed;
      bottom: 0;
      right: 1em;
      cursor: default;
      font-size: 10px;
      color: black;
    }

    ul {
      list-style: none;
    }
    </style>
\t\t<!-- Matomo -->
\t\t<script>
\t\t\tvar _paq = window._paq = window._paq || [];
\t\t\t/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
\t\t\t_paq.push(['trackPageView']);
\t\t\t_paq.push(['enableLinkTracking']);
\t\t\t(function() {
\t\t\t\tvar u="//a.jifish.co.uk/";
\t\t\t\t_paq.push(['setTrackerUrl', u+'matomo.php']);
\t\t\t\t_paq.push(['setSiteId', '1']);
\t\t\t\tvar d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
\t\t\t\tg.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
\t\t\t})();
\t\t</script>
\t\t<!-- End Matomo Code -->
  </head>

  <body>
    <div class="main" id="main">
      <div class="avatar"><img src="photo.svg" alt="Avatar" /></div>
      <h1>JiFish.co.uk</h1>
      <span class="contact">Mastodon: <a href="https://social.jifish.co.uk/@joe" rel="me">@joe@social.jifish.co.uk</a>&nbsp;</span><span class="d-none d-sm-inline">&bullet;&nbsp;</span><span class="contact">Discord: jifish</span>
\t  <h2><a href="https://blog.jifish.co.uk/">Game Development Blogs</a></h2>
"""


TAIL = """      <small>Joseph Fowler, all rights reserved.</small></p>
    </div>
    <div class="easteregg" onclick="if(event.ctrlKey){window.location='https://youtu.be/2KVJ2vm_fyw?t=131';}">&pi;</div>
    <script>
    let isDragging = false;
    let startPosition = {
      x: 0,
      y: 0
    };
    let currentPosition = {
      x: 0,
      y: 0
    };
    let velocity = {
      x: 0,
      y: 0
    };
    const friction = 0.99;

    const body = document.querySelector('body');
    const main = document.getElementById('main');

    main.addEventListener('mousedown', event => {
      event.stopPropagation();
    });

    body.addEventListener('mousedown', event => {
      isDragging = true;
      const computedStyle = getComputedStyle(body);
      startPosition.x = event.clientX - parseFloat(computedStyle.backgroundPositionX);
      startPosition.y = event.clientY - parseFloat(computedStyle.backgroundPositionY);
      body.style.cursor = 'grabbing';
      velocity.x = 0;
      velocity.y = 0;
      event.preventDefault();
    });

    body.addEventListener('mouseup', event => {
      isDragging = false;
      body.style.cursor = 'grab';
      momentumScroll();
    });

    body.addEventListener('mousemove', event => {
      if (isDragging) {
        currentPosition.x = event.clientX - startPosition.x;
        currentPosition.y = event.clientY - startPosition.y;
        currentPosition.x = (currentPosition.x % window.innerHeight + window.innerHeight) % window.innerHeight;
        currentPosition.y = (currentPosition.y % window.innerHeight + window.innerHeight) % window.innerHeight;
        body.style.backgroundPosition = `${currentPosition.x}px ${currentPosition.y}px`;
        velocity.x = event.movementX;
        velocity.y = event.movementY;
      }
      event.preventDefault();
    });

    function momentumScroll() {
      const intervalId = setInterval(() => {
        if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
          clearInterval(intervalId);
          return;
        }
        currentPosition.x += velocity.x;
        currentPosition.y += velocity.y;
        currentPosition.x = (currentPosition.x % window.innerHeight + window.innerHeight) % window.innerHeight;
        currentPosition.y = (currentPosition.y % window.innerHeight + window.innerHeight) % window.innerHeight;
        body.style.backgroundPosition = `${currentPosition.x}px ${currentPosition.y}px`;
        velocity.x *= friction;
        velocity.y *= friction;
      }, 16);
    }
    </script>
  </body>

</html>
"""


def render_card(card, commented=False):
    prefix = "        <!--" if commented else "        "
    suffix = "-->" if commented else ""
    return (
        f'{prefix}<div class="card" style="max-width: 215px; min-width: 215px">\n'
        f'          <img src="{card["image"]}" class="card-img-top" alt="" title="{card["image_title"]}">\n'
        f'          <span class="card-body">\n'
        f'            <h5 class="card-title">{card["title"]}</h5>\n'
        f'            <p class="card-text">{card["text"]}</p>\n'
        f'          </span>\n'
        f'          <a href="{card["href"]}" class="stretched-link"></a>\n'
        f'        </div>{suffix}\n'
    )


def render_section(section):
    heading_tag = section["heading_tag"]
    html = f'      <{heading_tag}>{section["heading"]}</{heading_tag}>\n'
    html += '      <div class="card-deck">\n'
    for card in section["cards"]:
        html += render_card(card, commented=card.get("commented", False))
    html += '      </div>\n'
    return html


def main():
    data = yaml.safe_load(SOURCE.read_text(encoding="utf-8"))
    html = HEAD
    for section in data["sections"]:
        html += render_section(section)
    html += TAIL
    OUTPUT.write_text(html, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()

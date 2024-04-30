# Survival Parchment Texture
Generate DUI Textures for Survival Parchment Prop

## Features
- Use the query string to customize the the texture.
- No initial params required!
- Two modes HTML divs and HTML Canvas render modes.
- The HTML Canvas implementation is rendered at 2x the pixel density and is scaled down to fit the desired texture width and height.

## Query Parmas
```
?font=&text=&font_color=&font_size=&width=&height=&offset_x=&offset_y=&anchor=
```
- Set the rendering mode with mode=canvas (Optional).
- Set the Font-Family with any Google font by setting font=FONT+NAME (Optional).
- Choose the text to be displayed on the texture with text=HELLO+WORLD (Optional).
- Set the font color by passing the the query param font_color=FFFFFF (Optional).
- Choose a starting font size with query param font_size=60. The long your input text the small the font will be scaled down (Optional).
- Set the texture width with query param width=512 (Optional).
- Set the texture height with query param height=512 (Optional).
- Place offset from the top left corner with offset_x and offset_y (Optional).
- Set the font box origin point with anchor="mm". Inspired by Pillow Text Anchors. See https://pillow.readthedocs.io/en/stable/handbook/text-anchors.html (Optional).


### Credits
[Tadjh](https://github.com/tadjh) & [Dingo](https://github.com/DingosGotMyBaby)

{
  "_$ver": 1,
  "_$id": "oufhqpla",
  "_$runtime": "res://b33edd45-b3d0-4823-b4f3-d9d1f05f0101",
  "_$preloads": [
    "resources/ui/level_01.png",
    "resources/ui/level_02.png",
    "internal//BlackTexture.png",
    "resources/ui/background.jpg",
    "resources/ui/level_background.jpg",
    "resources/ui/login_background.jpeg"
  ],
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "autoDestroyAtClosed": true,
  "_$child": [
    {
      "_$id": "qkuor7tf",
      "_$type": "Image",
      "name": "Image",
      "width": 1920,
      "height": 1080,
      "mouseEnabled": true,
      "centerX": 0,
      "centerY": 0,
      "skin": "resources/ui/level_background.jpg",
      "color": "#ffffff",
      "_$child": [
        {
          "_$id": "zjawvx99",
          "_$var": true,
          "_$type": "Image",
          "name": "Start_Button",
          "x": 611,
          "y": 329,
          "width": 298,
          "height": 422,
          "mouseEnabled": true,
          "centerX": -200,
          "centerY": 0,
          "skin": "resources/ui/level_01.png",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "v8wsh3qd",
              "_$type": "Label",
              "name": "Label",
              "x": 89,
              "y": 374,
              "width": 120,
              "height": 48,
              "bottom": 0,
              "centerX": 0,
              "text": "Start",
              "font": "resources/font/Cinzel-SemiBold.ttf",
              "fontSize": 48,
              "color": "#FFFFFF",
              "leading": 0,
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "jyt8zlcz",
          "_$var": true,
          "_$type": "Image",
          "name": "Rank_Button",
          "x": 1015,
          "y": 328,
          "width": 291,
          "height": 425,
          "mouseEnabled": true,
          "centerX": 200,
          "centerY": 0,
          "skin": "resources/ui/level_02.png",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "cgpbjchl",
              "_$type": "Label",
              "name": "Label",
              "x": 86,
              "y": 377,
              "width": 120,
              "height": 48,
              "bottom": 0,
              "centerX": 0,
              "text": "Rank",
              "font": "resources/font/Cinzel-SemiBold.ttf",
              "fontSize": 48,
              "color": "#FFFFFF",
              "leading": 0,
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "5evht7u3",
          "_$type": "Label",
          "name": "Label",
          "x": 960,
          "y": 130,
          "width": 800,
          "height": 100,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "top": 80,
          "centerX": 0,
          "text": "Pandora Maze",
          "font": "resources/font/Cinzel-SemiBold.ttf",
          "fontSize": 100,
          "color": "rgba(255, 255, 255, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 0,
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "neiz8r5m",
      "_$var": true,
      "_$type": "Image",
      "name": "Mask",
      "width": 1920,
      "height": 1080,
      "skin": "resources/ui/login_background.jpeg",
      "color": "#ffffff"
    }
  ]
}
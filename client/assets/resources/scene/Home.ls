{
  "_$ver": 1,
  "_$id": "oufhqpla",
  "_$runtime": "res://90911853-cb09-4706-88a8-c73f032363a7",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "7zvzj116",
      "_$type": "Image",
      "name": "Image",
      "x": -1088,
      "y": -1508,
      "width": 4096,
      "height": 4096,
      "centerX": 0,
      "centerY": 0,
      "skin": "res://8f5c26f8-8e85-48eb-a24f-1bcde6040222",
      "color": "#000000"
    },
    {
      "_$id": "qkuor7tf",
      "_$type": "Image",
      "name": "bg",
      "width": 1920,
      "height": 1080,
      "mouseEnabled": true,
      "centerX": 0,
      "centerY": 0,
      "skin": "res://ebef0a82-63a9-4ab4-ba35-9faec78fb44c",
      "color": "#ffffff",
      "_$child": [
        {
          "_$id": "renxz114",
          "_$type": "Image",
          "name": "desc_img",
          "x": 703,
          "y": 35,
          "width": 515,
          "height": 52,
          "top": 35,
          "centerX": 0,
          "skin": "res://1d7fc89e-d5e5-4da1-8ba1-49b862b9e2d1",
          "sizeGrid": "0,79,0,81,0",
          "color": "#ffffff"
        },
        {
          "_$id": "v14qd5qn",
          "_$type": "TextArea",
          "name": "desc_text",
          "x": 703,
          "y": 35,
          "width": 515,
          "height": 52,
          "mouseEnabled": true,
          "text": "Exploring the deep sea...",
          "font": "res://46808cbf-8f83-4ce6-80f1-cbb25a2e9c4b",
          "fontSize": 32,
          "color": "rgba(55, 255, 242, 1)",
          "overflow": "scroll",
          "leading": 2,
          "padding": "4,6,6,109",
          "skin": "res://1d7fc89e-d5e5-4da1-8ba1-49b862b9e2d1",
          "sizeGrid": "0,77,0,71,0",
          "type": "text",
          "maxChars": 0,
          "prompt": "",
          "promptColor": "#A9A9A9"
        },
        {
          "_$id": "0a40dblj",
          "_$type": "Button",
          "name": "wallet_button",
          "x": 1546,
          "y": 40,
          "width": 44,
          "height": 34,
          "mouseEnabled": true,
          "skin": "res://998a8b8e-7ee3-41d0-b975-c1c3872b02b4",
          "label": "Some Text About Name",
          "labelFont": "res://46808cbf-8f83-4ce6-80f1-cbb25a2e9c4b",
          "labelSize": 32,
          "labelColors": "#c48fff,#c48fff,#c48fff",
          "labelVAlign": "middle",
          "labelPadding": "0,-336,0,0"
        },
        {
          "_$id": "xn8195ih",
          "_$type": "HBox",
          "name": "page_box",
          "x": 50,
          "y": 116,
          "width": 1822,
          "height": 56,
          "mouseEnabled": true,
          "space": 8,
          "align": "middle",
          "_$child": [
            {
              "_$id": "2iqjppbq",
              "_$var": true,
              "_$type": "Button",
              "name": "info_button",
              "width": 396,
              "height": 56,
              "mouseEnabled": true,
              "selected": true,
              "skin": "res://4f735d5e-ef21-49da-9181-754e4ddf82c0",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            },
            {
              "_$id": "bq4wi7bl",
              "_$var": true,
              "_$type": "Button",
              "name": "map_button",
              "x": 404,
              "width": 264,
              "height": 56,
              "mouseEnabled": true,
              "skin": "res://c6f230f3-809c-40a9-82cb-59638e907e45",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            },
            {
              "_$id": "wd7r2sdz",
              "_$var": true,
              "_$type": "Button",
              "name": "evolution_button",
              "x": 676,
              "width": 368,
              "height": 56,
              "mouseEnabled": true,
              "skin": "res://8ce75c69-f48c-49a8-8e6a-5c261490e42b",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            },
            {
              "_$id": "46qwj49z",
              "_$var": true,
              "_$type": "Button",
              "name": "ranking_button",
              "x": 1052,
              "width": 396,
              "height": 56,
              "mouseEnabled": true,
              "skin": "res://28de68a5-3768-4c11-b05a-6e0559e5c768",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            },
            {
              "_$id": "sxx317es",
              "_$var": true,
              "_$type": "Button",
              "name": "market_button",
              "x": 1456,
              "width": 360,
              "height": 56,
              "mouseEnabled": true,
              "skin": "res://95c99dd5-a686-4c34-aeee-1c2f44001bd3",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            }
          ]
        },
        {
          "_$id": "xgmix6cu",
          "_$type": "Image",
          "name": "game_icon",
          "x": 50,
          "y": 26,
          "width": 504,
          "height": 80,
          "skin": "res://7b48a81f-277c-472d-a65e-1c1591fe7b81",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "ju768hzk",
          "_$var": true,
          "_$type": "ViewStack",
          "name": "page_stack",
          "y": 220,
          "width": 1920,
          "height": 860,
          "mouseEnabled": true,
          "bottom": 0,
          "selectedIndex": 0,
          "_$child": [
            {
              "_$id": "0migw92e",
              "_$prefab": "8a855b2a-57cf-4365-985a-1a695f503789",
              "name": "item0",
              "active": true,
              "x": 0,
              "y": 0,
              "visible": true,
              "_$child": [
                {
                  "_$override": [
                    "5jcpi0qv",
                    "9zzugmk0"
                  ],
                  "selectedIndex": -1
                }
              ]
            },
            {
              "_$id": "7s0es3js",
              "_$prefab": "9b252579-b714-4e5b-937f-4230ed01d035",
              "name": "item1",
              "active": true,
              "x": 0,
              "y": 0,
              "visible": false
            },
            {
              "_$id": "mx8z1637",
              "_$prefab": "992b89e8-7fc7-4720-a3b2-bf57eda96c95",
              "name": "item2",
              "active": true,
              "x": 0,
              "y": 0,
              "visible": false
            },
            {
              "_$id": "3zsg5xwn",
              "_$prefab": "0564dbf2-b41a-4e14-a2c9-585808185233",
              "name": "item3",
              "active": true,
              "x": 0,
              "y": 0,
              "visible": false
            },
            {
              "_$id": "181109mg",
              "_$prefab": "795cf9b9-75e9-4099-8af1-d43c719fe74f",
              "name": "item4",
              "active": true,
              "x": 0,
              "y": 0,
              "visible": false
            }
          ]
        },
        {
          "_$id": "8uxv0psc",
          "_$var": true,
          "_$type": "Label",
          "name": "address_text",
          "x": 1604,
          "y": 40,
          "width": 260,
          "height": 33,
          "text": "0x123",
          "font": "res://46808cbf-8f83-4ce6-80f1-cbb25a2e9c4b",
          "fontSize": 32,
          "color": "rgba(196, 143, 255, 1)",
          "fitContent": "height",
          "leading": 2,
          "padding": "0,0,0,0"
        }
      ]
    }
  ]
}
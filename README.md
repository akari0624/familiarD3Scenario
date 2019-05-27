# 似曾相識的D3應用場景 - familiarD3Scenario

### 使用
- 在`html`上以`<script>`載入本library
``` html
  <script type="text-javascript" src="https://familiard3scenaio.morris0987.now.sh/dist/familiard3scenario0.5.1.js" charset="utf-8"></script>
```
載入完後在`window`底下就會有一`familiarD3Scenario`的函式可使用，
``` javascript
 var fd3Module = familiarD3Scenario()

 var svgDom1 = document.getElementById('svg1')
 var barChart1 = new fD3Module.BarChart(svgDom1)
barChart1.initD3ishSVG()
barChart1.setOnRectClick( function(d){console.log(d)})
barChart1.draw(testData)
```

[詳細使用範例請先暫看](test/integration_test/index.ts)


### 參與開發

  - 安裝開發環境所需依賴
``` shell
git clone $this_repo_url  
cd ...  
npm install    # install all the 3rd-Party dependencies
```
  - 寫typescript

- 本repo一開始開發時使用我所熟悉的`webpack`來打包，但是有鑑於這是個要讓人使用的`library`,不是`application`， 所以後來改用`rollup`建立打包流程。因為這是我的`第一個`用`rollup`[@see](https://github.com/rollup/rollup)來打包的js repo...使用上還有許多地方須摸索，所以暫時保留`webpack`的設定與其`npm scripts`

#### scripts
  - dev
``` shell
  npm run rollup_dev
```
進入rollup的watch模式，啟動rollup dev server，會使用 port`10001`, 在瀏覽器上透過`localhost:10001`可以去到測試頁面  
**但** 
目前有解決不了的typescript設置錯誤，建議先用`webpack`的devWithBabel模式代替:
``` shell
  npm run devWithBabel
```

`localhost:9999`就能到hot reload開發頁面

  - build
``` shell
  npm run rollup_dist
```
打包出最後的library(含目前所有用到的d3 dependencies)，和對應的`source map`到`dist`資料夾裡

### 待實作功能
  - ~~bar chart~~, ~~grouped bar chart~~
  - ~~line chart~~
  - ~~pir chart~~
  - 事件綁定
  - ~~exit, update~~
  - legend區


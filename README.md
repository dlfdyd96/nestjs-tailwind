# NestJS TailWind
1. Project Init
```sh
$ npm i -g @nestjs/cli
$ nest new nestjs-tailwind
$ cd nestjs-tailwind
$ npm i pug
```

2. Create a Basic Server
- src/main.ts
```ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'view'));
  app.setViewEngine('pug');

  await app.listen(3000);
}
bootstrap();
```
- src/app.controller.ts
```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render(`index`)
  getHello(): string {
    return this.appService.getHello();
  }
}
```
- views/index.pug
```pug
doctype html
html(lang="en")
  head
    meta(charset="utf-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    title Node.js with TailwindCSS, Express and Pug
    link(href="./styles/style.css", rel="stylesheet")
  body
    h1 Hello world!
    p My starter template
```

2. Add Tailwind CSS
```sh
$ npm install tailwindcss postcss autoprefixer postcss-cli
$ npx tailwindcss init
```

3. PostCSS
- postcss.config.js
```js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
```

4. Create TailWindCSS
- public/styles/tailwind.css
```css
@tailwind base; 
@tailwind components; 
@tailwind utilities;
```

- public/styles/style.css
  그냥 빈파일로 만들어 놓습니다.

5. Pakage.json
```json
"tailwind:css": "postcss src/public/styles/tailwind.css -o src/public/styles/tailwind.css"
```

6. Run Script
```sh
$ npm run tailwind:css
```
> Reference
[How to Use Tailwind CSS With Node.js, Express, and Pug](https://medium.com/better-programming/how-to-use-tailwind-css-with-node-js-express-and-pug-8591c47dd54f)


---

##### 2021.04.23 배창현
- 변경사항

```
- handlebars view tamplate 으로 변경(기존 pug) : 기존 pug 모듈 삭제하고, npm i -S hbs 설치
- nest 개발 시, assets 들은 추적을 하지 않기 때문에 웹팩을 구성하여 커스텀
참조 : https://docs.nestjs.com/recipes/hot-reload
npm i -D webpack webpack-cli webpack-node-externals run-script-webpack-plugin clean-webpack-plugin copy-webpack-plugin
root 경로에 webpack.config.js 생성 후 작성

- 웹팩 빌드 시, run-script-webpack-plugin 실행이 되어 종료가 안되므로 webpack.config.js module.exports 를 함수 형식으로 작성 및 변경
- tailwind css 구성 : npm i -D tailwindcss postcss postcss-cli autoprefixer
- tailwind 구성 파일 작성(tailwind.config.js)
- postcss 구성 파일 작성(postcss.config.js)
- 2가지 실행 스크립트를 실행하기 위해서 concurrently 모듈 설치(npm i -D concurrently)

```


- 추가한 npm script

```
"dev": "concurrently \"webpack --watch\" \"npm run dev:tailwind\""
"dev:tailwind": "postcss -w ./src/public/tailwind/tailwind.css -o ./src/public/css/tailwind.output.css"
"build:webpack": "webpack --env NODE_ENV=production --config webpack.config.js --mode=production"
"build:tailwind": "postcss ./src/public/tailwind/tailwind.css -o ./src/public/css/tailwind.output.css"
"start:prod:webpack": "node dist/server"

```

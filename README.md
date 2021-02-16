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
"tailwind:css": "postcss src/public/styles/tailwind.css -o src/public/styles/style.css"
```

6. Run Script
```sh
$ npm run tailwind:css
```
> Reference
[How to Use Tailwind CSS With Node.js, Express, and Pug](https://medium.com/better-programming/how-to-use-tailwind-css-with-node-js-express-and-pug-8591c47dd54f)


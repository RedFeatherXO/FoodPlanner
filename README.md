# FoodWebsite
A Website to see the food you want to cook. Food gets randomly selected or you can choose food, food needs to be added before

# Stack
React
    dayjs -> For Date processing
    antd -> Templates
MongoDB
node.js

#Dev Start
node .\src\server.js
 npm start

# Start
1. After 3 new test branches back to main to implement what i learned
2. 
## Todo
- [x] Core functionalities implemented -> Site on Big Screen is usable 
- [ ] Store images in MongoDB or other
- [ ] Mobile website adjustments
- [ ] Account Usage. Currently the dev User is used so there is no functionality for Users Accounts
- [ ] Is a Recipe browser needed or is the browser when there is nothing chosen enough?
- [ ] Implement "View Details" (3 dots in the Recipe Browser)

![Site Image](/DevGithub/WebsiteExample_RecipeBrowser.png?raw=true "Recipe Browser")
![Site Image](/DevGithub/WebsiteExample_ChoosenRecipe.png?raw=true "Selected Recipe for Saturday")
 
```
FoodWebsite
├─ babel.config.json
├─ basicsetup.txt
├─ DevGithub
│  ├─ WebsiteExample_ChoosenRecipe.png
│  └─ WebsiteExample_RecipeBrowser.png
├─ dist
│  ├─ bundle.js
│  ├─ bundle.js.LICENSE.txt
│  ├─ images
│  │  ├─ Placeholder.webp
│  │  ├─ Placeholder2.webp
│  │  ├─ Preview_1724375329639.webp
│  │  ├─ Preview_1724643574655.jpg
│  │  ├─ Preview_1724645234712.jpg
│  │  ├─ Preview_1728141738252.jpg
│  │  ├─ README.md
│  │  └─ Spaghetti Bolognese.jpg
│  └─ index.html
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.js
│  ├─ components
│  │  ├─ DrawerFunc.js
│  │  ├─ FetchData.js
│  │  ├─ GerichtEdit.js
│  │  ├─ GerichtUpload.js
│  │  ├─ Mo.js
│  │  ├─ RetrieveData.js
│  │  ├─ SelectRecipeDay.js
│  │  └─ Test.html
│  ├─ context
│  │  └─ GlobalStateContext.js
│  ├─ index.css
│  ├─ index.js
│  ├─ server.js
│  └─ Structure
│     ├─ RecipeTemplate.json
│     └─ UserTemplate.json
└─ webpack.config.js

```
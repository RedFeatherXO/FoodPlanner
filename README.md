# FoodWebsite
A Website to see the food you want to cook. Food gets randomly selected or you can choose food, food needs to be added before

# Stack
React
Redux
MongoDB
node.js

# Color Palette
https://coolors.co/ecebe4-f7f6f3-ed6a5a-429ea6-50b0b9-153b50

# Start
1. node.js install (comes with npm)
2. create github repository
3. clone repository
4. check npm -v and node -v 
5. npm init -y in repository root Folder
6. npm install react react-dom react-redux redux
7. npm install @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli webpack-dev-server html-webpack-plugin
8. debug a fck error that no one knows how to resolve when running npm start "npm start
                        > react-redux-app@1.0.0 start
                        > webpack-dev-server --config ./webpack.config.js

                        [webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
                        - options has an unknown property '_assetEmittingPreviousFiles'. These properties are valid:
                        object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, ipc?, liveReload?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, setupMiddlewares?, static?, watchFiles?, webSocketServer? }
                        PS D:\_Projects\FoodWebsite\FoodWebsite>"
9. Throw everthing i had out the window and start from scratch and simpler
    1. Check branch your on with git branch
    2. git fetch origin To ensure you have the most recent version of the repository from GitHub
    3. git reset --hard origin/branch-name, discard all local changes
    4. git clean -fd, remove untracked files and directories
    5. git status, ensure everything is clean 
10. Delete everthing in a new branch
11. npx create-react-app my-app
12. Forgot to update it - Created a Branch NewStack
13. Ask chatgpt to create a layout in react antd for me based on a sketch
14. Styled it i a way that looks good
15. I got really no idea what i am doing
16. Got 3 Boxes that are next to each other with the middle one having a picture that displays the food of the day, ok thats not implemented it just has a picture with some food from google
17. Adjusted the header
18. Weekday menu as left and right buttons size and position needs to be fixed
19. is Fixed
20. Firefox scrollbar is weird
21. Added Checkbox
22. Use antd Pagnation for week change, Use antd Steps for Zubereitung but vertical
23. Scrapped Pagnation because its changing in size when going past a number to make room for 3 dots
24. Built a Custom Pagnation (ChatGPT) 
25. Added antd Steps
26. Day specific content is loaded for each day selected in menu
27. Color palette added subject to change
28. Put ingredients and Recipe steps jsx layout in seperat file so that it can be importat later from a Database
29. Improved styling
30. Installed dotenv
31. Added environment variables
32. wenn eine Variable in .env geändert wird muss npm neugestartet werden


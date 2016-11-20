
#iHeart Test

live at [jeff-iheart-test.github.io](https://jeff-iheart-test.github.io)

### Running Locally

Make sure you have [node](http://nodejs.org/) installed

- change line 5 in frontend.js from
      `nodeUrl = 'https://jeff-iheart-test.herokuapp.com',`
       to
      `nodeUrl = 'localhost:8000',`

- open up a terminal, cd into this folder, and run
   ```
   node server
   python -m SimpleHTTPServer 3000
   ```

- visit localhost:3000 in your favorite browser

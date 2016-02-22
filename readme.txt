Eke Wokocha

License MIT

To start app:
    run: npm install
    run:  npm test

To load test data into database:
    run: grunt load

Refer to config.js to configure database
Refer to config.js to configure all enumerations
Refer to config.js to configure location of excel file
Refer to config.js to configure server
Refer to config.js to configure the column names in the excel file, this
    is listed as "config.keys"

The bootstrap theme came with a lot of extra files. The docs did not make it clear not
to filter out plugins. Therefore, there are a lot of extra files that I did not write, but the client required us to use this theme. 

I wrote the following files
  any file in this root directory
  any file in the routes directory
  and file in the models directory
  public/js/main.js
    -- I decided to put all the angular files in one file (main.js) for the sakes of readability and easy review. 

I modified the following files
  any file in the views directory

The video can be found at:
tinyurl.com/wokochaEke0903
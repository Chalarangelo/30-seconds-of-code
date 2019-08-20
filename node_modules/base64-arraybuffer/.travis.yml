language: node_js
node_js:
- '0.12'
- iojs-1
- iojs-2
- iojs-3
- '4.1'
before_script:
- npm install
before_install: npm install -g npm@'>=2.13.5'
deploy:
  provider: npm
  email: niklasvh@gmail.com
  api_key:
    secure: oHV9ArprTj5WOk7MP1UF7QMJ70huXw+y7xXb5wF4+V2H8Hyfa5TfE0DiOmqrube1WXTeH1FLgq54shp/sJWi47Hkg/GyeoB5NnsPhYEaJkaON9UG5blML+ODiNVsEnq/1kNBQ8e0+0JItMPLGySKyFmuZ3yflulXKS8O88mfINo=
  on:
    tags: true
    branch: master
    repo: niklasvh/base64-arraybuffer

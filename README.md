# nodejs-api-with-auth-sample
## Install
Projeyi bilgisayarınıza clone ettikten sonra ilk olarak `npm install` ile paketlerin yüklenmesini sağlayın.
## Samples Folder Includes
### Basic authentication
`node app_basic.js` komutunu çalıştırarak ilgili kodu çalıştırın.
### JWT authentication 
`node app_jwt.js` komutunu çalıştırarak ilgili kodu çalıştırın.
### JWT authentication with role
`node app_jwt_role.js` komutunu çalıştırarak ilgili kodu çalıştırın.
### index.html
`index.html` için önce `node app_jwt.js` komutu ile api yi çalıştırın sonra index.html dosyasını çift tıklayarak tarayıcı da açın.

## Run
`node app.js` komutunu çalıştırarak ilgili kodu çalıştırın. MongoDB veritabanı bağlantısı yapar. `context` klasörü içindeki `database.js` dosyasında veri tabanı bağlantı cümlesi bulunur. `schemas.js` dosyasında ise veri tabanı tablo(collection) tanımlamaları bulunur.
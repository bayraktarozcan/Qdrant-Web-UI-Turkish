# Qdrant Web Arayüzü

Bu, [Qdrant](https://github.com/qdrant/qdrant) Vektör Arama Motoru için kendi sunucunuzda barındırabileceğiniz bir web arayüzüdür.

Bu arayüzün Qdrant tarafından sunulması amaçlanmıştır, ancak bağımsız bir uygulama olarak da kullanabilirsiniz.

Bu arayüzün temel amacı, koleksiyonlarınızı görüntülemek ve yönetmek için basit bir yol sağlamaktır.

Elasticsearch için [Kibana](https://www.elastic.co/kibana)'ya benzer, ancak ek hizmet gerektirmez.

## Kullanılabilir Betikler

Proje dizininde aşağıdakileri çalıştırabilirsiniz:

### `npm start`

Uygulamayı geliştirme modunda çalıştırır.\
Tarayıcınızda görüntülemek için [http://localhost:3000](http://localhost:3000) adresini açın.

Geliştirme modu, Qdrant'ın [http://localhost:6333](http://localhost:6333) adresinde çalıştığını varsayar.

### `npm test`

Test çalıştırıcısını etkileşimli izleme modunda başlatır.\
Daha fazla bilgi için [test çalıştırma](https://facebook.github.io/create-react-app/docs/running-tests) bölümüne bakın.

### `npm run build`

Uygulamayı üretim için `build` klasörüne derler.\
React'i üretim modunda doğru şekilde paketler ve en iyi performans için derlemeyi optimize eder.

Derleme küçültülür ve dosya adları hash içerir.\
Uygulamanız dağıtıma hazır!

Daha fazla bilgi için [dağıtım](https://facebook.github.io/create-react-app/docs/deployment) bölümüne bakın.

## Kullanılan Teknolojiler

- [React](https://reactjs.org/)
- [MUI](https://mui.com/core/)
- [Axios](https://axios-http.com/)

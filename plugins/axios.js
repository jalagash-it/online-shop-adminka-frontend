export default function({ $axios, redirect }) {
    $axios.onRequest((config) => {
        const obj = {
            baseUrl: location.origin.indexOf('localhost') > -1 ?
                'http://localhost:8000/' : 'http://adminka-server.html-css.kz/',
            browserBaseURL: location.origin.indexOf('localhost') > -1 ?
                'http://localhost:8000/' : 'http://adminka-server.html-css.kz/'
        }
        config.baseURL = obj.baseUrl;
        const token = localStorage.getItem('api-token');
        console.log(config);
        if (token)
            config.headers.common['X-API-TOKEN'] = token;
    })

    // $axios.onError((error) => {})
}
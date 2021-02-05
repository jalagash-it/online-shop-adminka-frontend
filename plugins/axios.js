export default function({ $axios, redirect }) {
    $axios.onRequest((config) => {
        const token = localStorage.getItem('api-token');
        console.log(config);
        if (token)
            config.headers.common['X-API-TOKEN'] = token;
    })

    // $axios.onError((error) => {})
}
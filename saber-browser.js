import 'prismjs/themes/prism-tomorrow.css'

export default ({
    setHead
}) => {
    setHead({
        script: [{
            src: "https://www.googletagmanager.com/gtag/js?id=UA-142130562-2",
            async: true
        }]
    })
}
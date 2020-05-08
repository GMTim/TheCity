const Downloader = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            $.get(url).done((data) => {
                resolve(data)
            }).fail((error) => {
                reject(error)
            })
        })
    }
}

export default Downloader
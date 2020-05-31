import axios from 'axios';

async function getRes(url) {
    const PREFIX = "//api2.bmob.cn";
    let res = await axios.get(PREFIX + url, {
        responseType: 'json',
        headers: {
            'X-Bmob-Application-Id': 'c800f60ebaa13eb86ebebc9d394a1835',
            'X-Bmob-REST-API-Key': '07254f5f6ce11d71d92a42f8524b2458'
        }
    });
    return res.data;
}

async function postData(url, mskey, data) {
    const PREFIX = "//api2.bmob.cn";
    let res = await axios.post(PREFIX + url, data, {
        responseType: 'json',
        headers: {
            'X-Bmob-Application-Id': 'c800f60ebaa13eb86ebebc9d394a1835',
            'X-Bmob-REST-API-Key': '07254f5f6ce11d71d92a42f8524b2458',
            'X-Bmob-Master-Key': mskey
        }
    });
    return res.data;
}

async function putData(url, mskey, data) {
    const PREFIX = "//api2.bmob.cn";
    let res = await axios.put(PREFIX + url, data, {
        responseType: 'json',
        headers: {
            'X-Bmob-Application-Id': 'c800f60ebaa13eb86ebebc9d394a1835',
            'X-Bmob-REST-API-Key': '07254f5f6ce11d71d92a42f8524b2458',
            'X-Bmob-Master-Key': mskey
        }
    });
    return res.data;
}

export default null;
export async function getArticleCount(split) {
    let res = await getRes(`/1/classes/articles?count=1`);
    return Math.ceil(res.count / split);
}

export async function getArticlesAt(index, split) {
    let res = await getRes(`/1/classes/articles?order=-time&limit=${split}&skip=${index * split}&keys=title,preview,id`);
    return res.results;
}

export async function getArticle(id) {
    let res = await getRes(`/1/classes/articles?limit=1&where={"id":"${id}"}&keys=title,content,id,time`);
    if (res.results.length != 1) {
        throw "404 Not Found";
    } else {
        return res.results[0];
    }
}

export async function login(uname, pwd) {
    let res = await getRes(`/1/login?username=${escape(uname)}&password=${escape(pwd)}`);
    return res;
}

export async function uploadImg(user, file) {
    console.log(user, file);
    
    // let fd = new FormData();
    // fd.append("smfile", file);
    // let res = await axios.post("https://sm.ms/api/v2/upload", fd, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     responseType: 'json'
    // });
    // let data = res.data;
    // if (!data.success) {
    //     throw data.message;
    // }
    // data = data.data;
    // postData('/1/classes/imgmaps', user.mskey, {
    //     img: data.url,
    //     delete: data.delete
    // });
    // return data.url;
}

export async function uploadArticle(user, id, title, content, preview, time) {
    return await postData('/1/classes/articles', user.mskey, {
        id,
        title,
        content,
        preview,
        time
    });
}

export async function updateArticle(user, objectId, id, title, content, preview, time){
    return await putData('/1/classes/articles/'+objectId, user.mskey, {
        id,
        title,
        content,
        preview,
        time
    });
}
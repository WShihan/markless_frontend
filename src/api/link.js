import request from "@/utils/request";

export function linkAll({page, keyword}){
    return request({
        url: '/api/link/all',
        method: 'get',
        params: {
            page,
            keyword
        }

    })
}
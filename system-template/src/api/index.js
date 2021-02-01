import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const fetchNameSpaceData = query => {
    return request({
        url: '/api/config/app/query',
        method: 'get',
        // params: query
    });
};

export const deleteNameSpaceData = query => {
    return request({
        url: '/api/config/app/delete',
        method: 'get',
        params: query
    });
};
export const addNameSpaceData = query => {
    return request({
        url: '/api/config/app/save',
        method: 'post',
        data: query
    });
};
export const updateNameSpaceData = query => {
    return request({
        url: '/api/config/app/update',
        method: 'get',
        params: query
    });
};
// 模块

export const getAppModuleData = query => {
    return request({
        url: '/api/config/appModule/query',
        method: 'get',
        params: query
    });
};

export const getAppConfigData = query => {
    return request({
        url: '/api/config/appConfig/query',
        method: 'get',
        params: query
    });
};

export const saveAppModule = query => {
    return request({
        url: '/api/config/appModule/save',
        method: 'post',
        data: query
    });
};
export const updateAppModule = query => {
    return request({
        url: '/api/config/appModule/update',
        method: 'post',
        data: query
    });
};

export const saveAppConfig = query => {
    return request({
        url: '/api/config/appConfig/save',
        method: 'post',
        data: query
    });
};

export const updateAppConfig = query => {
    return request({
        url: '/api/config/appConfig/update',
        method: 'post',
        data: query
    });
};
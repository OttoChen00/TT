package com.taotao.service;

import com.taotao.common.pojo.EasyUIDataGridResult;

/**
 * @Author
 * @Date 2017/10/29 17:40
 */
public interface TbItemService {
    EasyUIDataGridResult list(Integer page,Integer rows);
}

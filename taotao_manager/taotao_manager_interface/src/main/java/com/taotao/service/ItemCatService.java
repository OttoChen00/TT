package com.taotao.service;

import com.taotao.common.pojo.EasyUITreeNode;

import java.util.List;

/**
 * @Author
 * @Date 2017/10/31 15:35
 */
public interface ItemCatService {
    List<EasyUITreeNode> findListByParentId(Long parentId);
}

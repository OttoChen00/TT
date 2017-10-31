package com.taotao.service.impl;

import com.taotao.mapper.TbItemCatMapper;
import com.taotao.common.pojo.EasyUITreeNode;
import com.taotao.common.pojo.TbItemCat;
import com.taotao.common.pojo.TbItemCatExample;
import com.taotao.service.ItemCatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author
 * @Date 2017/10/31 15:39
 */
@Service
public class ItemCatServiceImpl implements ItemCatService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private TbItemCatMapper tbItemCatMapper;

    @Override
    public List<EasyUITreeNode> findListByParentId(Long parentId) {
        TbItemCatExample example = new TbItemCatExample();
        TbItemCatExample.Criteria criteria = example.createCriteria();
        criteria.andParentIdEqualTo(parentId);
        List<TbItemCat> itemCats = tbItemCatMapper.selectByExample(example);
        List<EasyUITreeNode> list = new ArrayList<>();
        for (TbItemCat itemCat : itemCats) {
            EasyUITreeNode treeNode = new EasyUITreeNode();
            treeNode.setId(itemCat.getId());
            treeNode.setState(itemCat.getIsParent() ? "closed":"open");
            treeNode.setText(itemCat.getName());
            list.add(treeNode);
        }
        return list;
    }
}

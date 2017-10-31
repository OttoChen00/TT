package com.taotao.controller;

import com.taotao.common.pojo.EasyUITreeNode;
import com.taotao.service.ItemCatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Author
 * @Date 2017/10/31 15:52
 */
@Controller
public class ItemCatController {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private ItemCatService itemCatService;

    @RequestMapping("/item/cat/list")
    @ResponseBody
    public List<EasyUITreeNode> findListByParentId(@RequestParam(value="id",defaultValue = "0") Long parentId){
        List<EasyUITreeNode> list = itemCatService.findListByParentId(parentId);
        return list;
    }
}

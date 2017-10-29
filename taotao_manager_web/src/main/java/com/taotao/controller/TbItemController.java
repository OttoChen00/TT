package com.taotao.controller;

import com.taotao.pojo.EasyUIDataGridResult;
import com.taotao.service.TbItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Author
 * @Date 2017/10/29 17:37
 */
@Controller
public class TbItemController {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private TbItemService tbItemService;

    @RequestMapping("/{page}")
    public String pageUI(@PathVariable String page){
        return page;
    }

    @RequestMapping(value = "/item/list",method = RequestMethod.GET)
    @ResponseBody
    public EasyUIDataGridResult list(Integer page,Integer rows){
        return tbItemService.list(page,rows);
    }
}

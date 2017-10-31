package com.taotao.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.taotao.mapper.TbItemMapper;
import com.taotao.common.pojo.EasyUIDataGridResult;
import com.taotao.common.pojo.TbItem;
import com.taotao.common.pojo.TbItemExample;
import com.taotao.service.TbItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author
 * @Date 2017/10/29 17:43
 */
@Service
public class TbItemServiceImpl implements TbItemService {

    @Autowired
    private TbItemMapper tbItemMapper;

    @Override
    public EasyUIDataGridResult list(Integer page, Integer rows) {
        PageHelper.startPage(page,rows);
        TbItemExample example = new TbItemExample();
        List<TbItem> list = tbItemMapper.selectByExample(example);
        PageInfo<TbItem> pageInfo = new PageInfo<>(list);
        EasyUIDataGridResult result = new EasyUIDataGridResult();
        result.setTotal(pageInfo.getTotal());
        result.setRows(list);
        return result;
    }
}

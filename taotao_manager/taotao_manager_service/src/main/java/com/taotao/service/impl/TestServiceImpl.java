package com.taotao.service.impl;

import com.taotao.mapper.TestMapper;
import com.taotao.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author
 * @Date 2017/10/29 16:16
 */
@Service
public class TestServiceImpl implements TestService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private TestMapper testMapper;

    @Override
    public String queryNow() {
        return testMapper.queryNow();
    }
}

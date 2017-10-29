package com.taotao.controller;

import com.taotao.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author
 * @Date 2017/10/29 16:21
 */
@Controller
public class TestController {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private TestService testService;

    @RequestMapping("/test")
    public String test(Model model){
        String now = testService.queryNow();
        model.addAttribute("now",now);
        return "index";
    }
}
